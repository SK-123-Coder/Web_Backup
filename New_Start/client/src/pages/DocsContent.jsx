// Imports of dependencies
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Import of ui components
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"

// Import of data of componets
import Tools_Data from "../Data/For_Docs_Page/Tools_Data/ToolsDocsData"
import Products_Data from "../Data/For_Docs_Page/Product_Data/ProductsDocsData"

function DocsContent() {

  // Rendering this component based on condtion

  const { id, category } = useParams();

  let doc = null;

  
  if (category === "tools") { // If category === toole then rendering tools related content

    doc = Tools_Data.find(item => item.id === Number(id));

  } else if (category === "products") {  // If category === products then rendering products related content

    doc = Products_Data.find(item => item.id === Number(id));

  }

  if (!doc) {
    return <h2 className="text-white">Document not found</h2>;
  }

  return (
    <>
      <Navbar />

      {/* Documentation Rendering Section */}
      <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-20 sm:py-24 lg:py-28">

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,191,249,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-14 sm:mb-20">

            <Link
              to="/Docs"
              className="
                inline-flex items-center gap-2
                w-fit px-4 py-2
                rounded-xl bg-gray-800/70
                text-sm text-gray-300
                hover:text-white hover:bg-gray-700/70
                transition
              "
            >
              ← Back
            </Link>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {doc.name}
            </h2>
          </div>

          {/* Overview */}
          <div
            className="
              relative mb-16 sm:mb-20
              rounded-2xl sm:rounded-3xl
              p-6 sm:p-8 md:p-10
              bg-gray-900/70 backdrop-blur-xl
              border border-gray-800
              shadow-lg
            "
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#5FBFF9]" />
              Overview
            </h3>

            <p className="text-gray-400 max-w-none sm:max-w-3xl text-sm sm:text-base leading-relaxed">
              {doc.overview}
            </p>
          </div>

          {/* Features */}
          {doc.features && (
            <div className="mb-20 sm:mb-24">

              <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-10 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#5FBFF9]" />
                Features
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {doc.features.map((feature, i) => (
                  <li
                    key={i}
                    className="
                      bg-gray-900/70 backdrop-blur-xl
                      border border-gray-800
                      p-5 sm:p-6
                      rounded-xl sm:rounded-2xl
                      text-sm sm:text-base text-gray-300
                      hover:border-[#5FBFF9]/50
                      hover:shadow-[0_0_12px_rgba(95,191,249,0.15)]
                      transition-all duration-300
                    "
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 🛠 How To Use */}
          {doc.HTU && (
            <div
              className="
                rounded-2xl sm:rounded-3xl
                p-6 sm:p-8 md:p-10
                bg-gray-900/70 backdrop-blur-xl
                border border-gray-800
                shadow-lg
              "
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#5FBFF9]" />
                How to Use
              </h3>

              <ol className="space-y-3 sm:space-y-4">
                {doc.HTU.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3 sm:gap-4 text-gray-400 text-sm sm:text-base leading-relaxed"
                  >
                    <span className="text-[#5FBFF9] font-semibold shrink-0">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}


export default DocsContent;