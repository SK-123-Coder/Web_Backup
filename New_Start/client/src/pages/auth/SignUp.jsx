// Import of dependencies
import { Link } from "react-router-dom";
import {useState} from "react"

// Import of ui components
import Popup from "../../components/PopUp";

// Import of data for ui component
import signupPopup from '../../Data/Popup/Signup_Popup/user.SignupPopup'

function Signup() {
  const [open, setOpen] = useState(false); // For Popup window
  const [activePopup, setActivePopup] = useState(null); // Activation of popup windows

  const inputStyle = "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition";

  // Store form data
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });

  // Handle multiple input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // When successfull

        const popup = signupPopup.find(p => p.id === 1);
        setActivePopup(popup);
        setOpen(true);

      } else if (response.status === 409) {
        // If already exist

        const popup = signupPopup.find(p => p.id === 2);
        setActivePopup(popup);
        setOpen(true);

      } else if (response.status === 400){
        // When empty feild

        const popup = signupPopup.find(p => p.id === 3);
        setActivePopup(popup);
        setOpen(true);

      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 font-sans px-4">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden border border-gray-700 bg-gray-900/40 backdrop-blur-xl">

        {/* Left Panel – Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 text-gray-200">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 text-center mb-4">
            Welcome to CraftDex
          </h2>

          <p className="text-gray-400 text-center text-sm mb-8">
            Join CraftDex and start using powerful online tools today!
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Create a strong password"
                className={inputStyle}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300 font-semibold text-white shadow-lg shadow-blue-500/30"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Panel – Illustration */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-10 bg-gradient-to-b from-blue-900/40 to-gray-900/20">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6331/6331264.png"
              alt="Illustration"
              className="w-56 lg:w-64 mx-auto animate-pulse drop-shadow-2xl"
            />
            <h3 className="text-white text-2xl font-semibold mt-6">
              Powerful Tools for Creators
            </h3>
            <p className="text-gray-400 text-sm mt-3 max-w-xs mx-auto">
              Convert, compress, and enhance your files effortlessly with CraftDex.
            </p>
          </div>
        </div>

      </div>

      {/* Popup window */}
      {open && activePopup && (
        <Popup
          isOpen={open}
          id={activePopup.id}
          title={activePopup.title}
          message={activePopup.message}
          btn={activePopup.btn}
          state={activePopup.state}
          onClose={() => {
            setOpen(false);
            setActivePopup(null);
          }}
        />
      )}
    </div>
  );
}

export default Signup;