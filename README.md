A full-stack eCommerce application featuring a **React (TypeScript)** frontend and a **FastAPI** backend, inspired by the live [Preetizen](https://www.preetizen.com/) site.

---

## 🧾 Project Structure

```
preetizen-ecommerce/
├── backend/                 # FastAPI Python backend
│   ├── main.py             # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Docker configuration
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global context/state providers
│   │   ├── pages/          # Page-level components
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static files and assets
│   ├── package.json        # Node.js dependencies and scripts
│   ├── vite.config.ts      # Vite configuration
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### 🔧 Backend (FastAPI)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:

   ```bash
   uvicorn main:app --reload --port 8000
   ```

The backend will be running at `http://localhost:8000`.

---

### 💻 Frontend (React + Vite + Tailwind CSS)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

---

## 📝 Features

* 🔐 User authentication
* 🛍️ Product listing and filtering
* 📦 Cart and order management
* 📄 Collection and product detail pages
* 🎨 Responsive UI with Tailwind CSS

---

## 📦 Deployment

Use Docker or your preferred cloud platform to deploy both frontend and backend components. The Dockerfile for backend is already included.

---

Let me know if you'd like this README to include API routes, environment setup, or sample data instructions as well.
