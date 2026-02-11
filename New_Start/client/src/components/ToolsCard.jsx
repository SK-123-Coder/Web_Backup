import { Link } from "react-router-dom";

function ToolsCard({ title, description, image, state, image_alt, link }) {
  const isComingSoon = link === "#";

  const buttonClass = isComingSoon
    ? "bg-blue-500/20 text-blue-300 cursor-not-allowed"
    : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500";

  const cardHoverClass = isComingSoon
    ? "hover:border-blue-400/30 hover:shadow-blue-500/10"
    : "hover:border-cyan-400 hover:shadow-cyan-500/30";

  return (
    <div
      className={`group bg-white/5 backdrop-blur-lg rounded-2xl shadow-md p-8 
      flex flex-col items-center text-center border border-white/10 
      transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
      ${cardHoverClass}`}
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

export default ToolsCard;