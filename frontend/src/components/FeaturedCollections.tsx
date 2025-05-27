import { Link } from "react-router-dom"

const FeaturedCollections = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-6 tracking-[0.2em]">
            ROOTED IN INTENTION
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Every piece tells a story of sustainability, community, and authentic self-expression
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Handcrafted with Heart */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4 tracking-wide uppercase">Handcrafted with Heart</h3>
            <p className="text-gray-600 font-light leading-relaxed">Each piece is made mindfully with local artisans</p>
          </div>

          {/* Sustainably Styled */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4 tracking-wide uppercase">Sustainably Styled</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Eco-friendly fabrics & packaging — conscious in every step
            </p>
          </div>

          {/* Empowering Every Body */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4 tracking-wide uppercase">Empowering Every Body</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              No size, height, color, or label rules here — just style for all
            </p>
          </div>

          {/* Community Driven */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4 tracking-wide uppercase">Community Driven</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              From followers to models — we create with real people
            </p>
          </div>

          {/* Limited and Loved */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4 tracking-wide uppercase">Limited and Loved</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              We produce in small, purposeful batches so nothing is wasted
            </p>
          </div>

          {/* Made in India */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light mb-4 tracking-wide uppercase">Made in India</h3>
            <p className="text-gray-600 font-light leading-relaxed">Designed in Kolkata, Made with ♥ in India</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/collections"
            className="inline-block bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
          >
            Explore Wildflower Collection
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections
