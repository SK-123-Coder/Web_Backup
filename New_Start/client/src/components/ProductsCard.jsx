import { Link } from "react-router-dom";

function ProductsCard({ title, description, image, state, image_alt, link }) {
  const isComingSoon = link === "#";

  const buttonClass = isComingSoon
    ? "bg-pink-500/20 text-pink-300 cursor-not-allowed"
    : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500";

  return (
    <div
      className="group bg-white/5 backdrop-blur-lg rounded-2xl shadow-md p-8 
      flex flex-col items-center text-center border border-white/10 
      transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
      hover:border-pink-500/50 hover:shadow-pink-500/30 w-94"
    >
      <img
        src={image}
        alt={image_alt}
        className="w-16 h-16 mb-5 drop-shadow-lg brightness-0 invert 
        group-hover:scale-110 transition-transform duration-300"
      />

      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

      <Link
        to={isComingSoon ? "#" : link}
        className={`mt-6 px-5 py-2 text-sm font-semibold rounded-lg 
        transition-all duration-300 shadow-md hover:shadow-lg
        ${buttonClass}`}
      >
        {state}
      </Link>
    </div>
  );
}

export default ProductsCard;