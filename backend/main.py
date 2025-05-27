from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import jwt
import bcrypt
import os
from datetime import datetime, timedelta
import asyncpg
from dotenv import load_dotenv
import traceback

load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Preetizen eCommerce API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000","https://sharp-gently-serval.ngrok-free.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection URL
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")

# Connection pool variable (global)
pool: asyncpg.pool.Pool = None

@app.on_event("startup")
async def startup():
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL)

@app.on_event("shutdown")
async def shutdown():
    await pool.close()

# Async query executor using the pool
async def sql(query: str, args: Optional[List] = None, fetch: bool = True):
    async with pool.acquire() as conn:
        if fetch:
            result = await conn.fetch(query, *(args or []))
            return [dict(r) for r in result]
        else:
            return await conn.execute(query, *(args or []))

# JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# Pydantic models
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class CartItem(BaseModel):
    product_id: int
    quantity: int

class CartUpdate(BaseModel):
    product_id: int
    quantity: int

class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItem]
    total: float
    shipping_address: str

# Helper functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(user_id: int) -> str:
    expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    payload = {"user_id": user_id, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@app.get("/")
async def root():
    return {"message": "Preetizen eCommerce API"}

@app.post("/auth/register")
async def register(user: UserRegister):
    try:
        existing_user = await sql("SELECT id FROM users WHERE email = $1", [user.email])
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed_password = hash_password(user.password)
        result = await sql(
            "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
            [user.name, user.email, hashed_password],
            fetch=True
        )
        if not result:
            raise HTTPException(status_code=500, detail="Failed to create user")
        user_data = result[0]
        access_token = create_access_token(user_data["id"])
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_data["id"],
                "name": user_data["name"],
                "email": user_data["email"]
            }
        }
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/login")
async def login(user: UserLogin):
    try:
        result = await sql("SELECT id, name, email, password_hash FROM users WHERE email = $1", [user.email])
        if not result:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        user_data = result[0]
        if not verify_password(user.password, user_data["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        access_token = create_access_token(user_data["id"])
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_data["id"],
                "name": user_data["name"],
                "email": user_data["email"]
            }
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/auth/me")
async def get_current_user_info(user_id: int = Depends(get_current_user)):
    try:
        result = await sql("SELECT id, name, email FROM users WHERE id = $1", [user_id])
        if not result:
            raise HTTPException(status_code=404, detail="User not found")
        user_data = result[0]
        return {
            "user": {
                "id": user_data["id"],
                "name": user_data["name"],
                "email": user_data["email"]
            }
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/products")
async def get_products(category: Optional[str] = None):
    try:
        if category:
            result = await sql("SELECT * FROM products WHERE category = $1", [category])
        else:
            result = await sql("SELECT * FROM products")
        return {"products": result}
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/products/{product_id}")
async def get_product(product_id: int):
    try:
        result = await sql("SELECT * FROM products WHERE id = $1", [product_id])
        if not result:
            raise HTTPException(status_code=404, detail="Product not found")
        return result[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/cart")
async def get_cart(user_id: int = Depends(get_current_user)):
    try:
        result = await sql("""
            SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image_url
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = $1
        """, [user_id])
        return {"items": result}
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cart/add")
async def add_to_cart(item: CartItem, user_id: int = Depends(get_current_user)):
    try:
        existing = await sql(
            "SELECT id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2",
            [user_id, item.product_id]
        )
        if existing:
            new_quantity = existing[0]["quantity"] + item.quantity
            await sql(
                "UPDATE cart_items SET quantity = $1 WHERE id = $2",
                [new_quantity, existing[0]["id"]],
                fetch=False
            )
        else:
            await sql(
                "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)",
                [user_id, item.product_id, item.quantity],
                fetch=False
            )
        return {"message": "Item added to cart"}
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put("/cart/update")
async def update_cart_item(item: CartUpdate, user_id: int = Depends(get_current_user)):
    try:
        if item.quantity <= 0:
            await sql(
                "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
                [user_id, item.product_id]
            )
        else:
            await sql(
                "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3",
                [item.quantity, user_id, item.product_id]
            )
        
        return {"message": "Cart updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/cart/remove/{product_id}")
async def remove_from_cart(product_id: int, user_id: int = Depends(get_current_user)):
    try:
        result = await sql(
            "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
            [user_id, product_id]
        )
        return {"message": "Item removed from cart"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/cart/clear")
async def clear_cart(user_id: int = Depends(get_current_user)):
    try:
        await sql("DELETE FROM cart_items WHERE user_id = $1", [user_id])
        return {"message": "Cart cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/orders")
async def create_order(order: OrderCreate, user_id: int = Depends(get_current_user)):
    try:
        print(f"Creating order for user {user_id}")
        print(f"Order data: {order}")
        if not order.items or len(order.items) == 0:
            raise HTTPException(status_code=400, detail="Order must contain at least one item")
        for item in order.items:
            product_check = await sql("SELECT id FROM products WHERE id = $1", [item.product_id])
            if not product_check:
                raise HTTPException(status_code=404, detail=f"Product with id {item.product_id} not found")
        
        # Create order
        order_result = await sql(
            "INSERT INTO orders (user_id, total, shipping_address, status) VALUES ($1, $2, $3, $4) RETURNING id",
            [user_id, float(order.total), order.shipping_address, "pending"]
        )
        
        if not order_result:
            raise HTTPException(status_code=500, detail="Failed to create order")
        
        order_id = order_result[0]["id"]
        print(f"Created order with ID: {order_id}")
        
        # Add order items
        for item in order.items:
            await sql(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
                [order_id, item.product_id, item.quantity, float(item.price)]
            )
        
        # Clear cart after successful order
        await sql("DELETE FROM cart_items WHERE user_id = $1", [user_id])
        
        return {
            "message": "Order placed successfully", 
            "order_id": order_id,
            "status": "pending",
            "total": order.total
        }
    except Exception as e:
        print(f"Error creating order: {str(e)}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

@app.get("/orders")
async def get_orders(user_id: int = Depends(get_current_user)):
    try:
        result = await sql(
            "SELECT id, total, shipping_address, status, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
            [user_id]
        )
        return {"orders": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/orders/{order_id}")
async def get_order(order_id: int, user_id: int = Depends(get_current_user)):
    try:
        # Get order details
        order_result = await sql(
            "SELECT id, total, shipping_address, status, created_at FROM orders WHERE id = $1 AND user_id = $2",
            [order_id, user_id]
        )
        
        if not order_result:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order = order_result[0]
        
        # Get order items
        items_result = await sql("""
            SELECT oi.product_id, oi.quantity, oi.price, p.name, p.image_url as image
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = $1
        """, [order_id])
        
        order["items"] = items_result
        
        return order
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    import uvicorn # type: ignore
    uvicorn.run(app, host="0.0.0.0", port=8000)

