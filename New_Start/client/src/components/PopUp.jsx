// Import dependencies
import { useNavigate } from "react-router-dom";

const Popup = ({ isOpen, title, message, btn, state, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/70 backdrop-blur-md"
      />

      {/* Popup Box */}
      <div
        className="
          relative z-10 w-full max-w-md
          rounded-2xl
          bg-gradient-to-b from-[#0B1220]/90 to-[#020617]/90
          border border-white/10
          shadow-[0_0_40px_rgba(79,156,255,0.15)]
          p-7
          animate-popup
        "
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-white text-center">
          {title}
        </h2>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content */}
        <p className="text-sm text-white/70 text-center leading-relaxed">
          {message}
        </p>

        {/* Footer */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              onClose();
              navigate(state);
            }}
            className="
              px-6 py-2.5 rounded-lg
              bg-gradient-to-r from-[#5FBFF9] to-[#8B5CF6]
              text-white font-medium
              shadow-md
              hover:scale-105 hover:shadow-lg
              active:scale-95
              transition-all duration-300
            "
          >
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;