import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      <div className="relative text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-wider">
          STYLE FOR
          <br />
          <span className="font-light">EVERYONE</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Discover our inclusive Wildflower Collection - premium fashion pieces designed for every body, every style,
          every story. No labels, just authentic expression.
        </p>
        <div className="space-x-6">
          <Link
            to="/collections"
            className="inline-block bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
          >
            Shop Wildflower Collection
          </Link>
          <Link
            to="/our-story"
            className="inline-block border border-black text-black px-8 py-4 text-sm font-light hover:bg-black hover:text-white transition-colors uppercase tracking-widest"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
