// Import of dependencies
import { Link } from "react-router-dom";

// Import of ui components
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"

// Imports of data of components
import ListsProduct from "../Data/For_Docs_Page/Lists_Tools&Product/ProductListData"
import ListsTools from "../Data/For_Docs_Page/Lists_Tools&Product/ToolsListData"

function Docs() {
  return(
    <>
    <Navbar />

    {/* Docs Hero Section */}
    <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Heading */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            CraftDex Vision & Documentation
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Understand our mission, long-term goals, and explore detailed documentation
            for CraftDex products and tools.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-28">

          {/* Card */}
          {[
            {
              title: "Our Aim",
              desc: "Simplify complex development workflows with intuitive, beginner-friendly tools that feel effortless to use.",
              accent: "hover:border-pink-500 hover:shadow-pink-500/20",
            },
            {
              title: "Our Goal",
              desc: "Build a trusted ecosystem of tools that help developers, students, and creators save time and stay focused.",
              accent: "hover:border-cyan-400 hover:shadow-cyan-500/20",
            },
            {
              title: "Future Vision",
              desc: "Grow CraftDex into a complete productivity platform with APIs, integrations, and world-class documentation.",
              accent: "hover:border-pink-500 hover:shadow-pink-500/20",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`
                group relative bg-white/5 backdrop-blur-xl
                rounded-2xl border border-white/10
                p-8 transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl
                ${card.accent}
              `}
            >
              <h3 className="text-xl font-semibold mb-3">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}

        </div>

        {/* Documentation Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Docs Card */}
          {[
            {
              title: "Product Documentation",
              list: ListsProduct,
              border: "hover:border-pink-400 hover:shadow-pink-500/20",
            },
            {
              title: "Tools Documentation",
              list: ListsTools,
              border: "hover:border-cyan-400 hover:shadow-cyan-500/20",
            },
          ].map((section, i) => (
            <div
              key={i}
              className={`
                group bg-white/5 backdrop-blur-xl
                rounded-2xl border border-white/10
                p-8 transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl
                ${section.border}
              `}
            >
              <h3 className="text-2xl font-semibold mb-6">
                {section.title}
              </h3>

              <ul className="space-y-3 text-sm">
                {section.list.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/docscontent/${item.category}/${item.id}`}
                      className="
                        group/link flex items-center gap-2
                        rounded-md px-3 py-2
                        text-gray-300
                        hover:bg-gray-800/60
                        hover:text-[#5FBFF9]
                        transition-all duration-200
                      "
                    >
                      <span className="opacity-40 group-hover/link:opacity-100 transition">
                        →
                      </span>
                      <span className="group-hover/link:translate-x-1 transition-transform">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </div>
    </section>

    <Footer />
    </>
  )
}

export default Docs;