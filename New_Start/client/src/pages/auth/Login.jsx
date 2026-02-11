// Import of dependencies
import { Link } from "react-router-dom";
import {useState} from "react"

// Import of ui component
import Popup from "../../components/PopUp"

// Import of data for popup window
import loginPopup from "../../Data/Popup/Login_Popup/user.LoginPopup"

function Login(){
  const [open, setOpen] = useState(false);  // For popup window
  const [activePopup, setActivePopup] = useState(null);  // For activation of popup window

  // Handle data of form
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  // Handle multiple input feilds
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle form and send o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        // When successful

        const popup = loginPopup.find(p => p.id === 1);
        setActivePopup(popup);
        setOpen(true);

      } else if (response.status === 400){
        // When empty feild

        const popup = loginPopup.find(p => p.id === 3);
        setActivePopup(popup);
        setOpen(true);

      } else if (response.status === 404){
        // If data not found

        const popup = loginPopup.find(p => p.id === 2);
        setActivePopup(popup);
        setOpen(true);

      } else if (response.status === 401){
        // If data incorrect

        const popup = loginPopup.find(p => p.id === 4);
        setActivePopup(popup);
        setOpen(true);
      }

    } catch(error){
      console.error(error);
    }
  }
    return(
        <>
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center font-sans px-3 md:px-10">
            <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden border border-gray-700 bg-gray-900/40 backdrop-blur-xl">

                {/* Left Panel Login from */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-white">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 text-center mb-4 sm:mb-6">
                       Welcome back to CraftDex 
                    </h2>

                    <p className="text-gray-400 text-center text-xs sm:text-sm mb-6 sm:mb-8">
                       Access your CraftDex tools and streamline your workflow effortlessly! 
                    </p>

                    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label for="login-email" className="block text-sm font-medium mb-2">Email</label>
                            <input id="login-email" name="email" type="email" placeholder="you@example.com"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label for="login-password" className="block text-sm font-medium mb-2">Password</label>
                            <input id="login-password" name="password" type="password" placeholder="Enter password"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit"
                        className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300 font-semibold text-white shadow-lg shadow-blue-500/30">
                            Login
                        </button>

                        <p className="text-center text-sm text-gray-400 mt-3">
                            <Link to="/accountRecover" className="text-blue-400 hover:underline">
                                I forgot my password...
                            </Link>
                        </p>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don’t have an account ?
                        <Link to="/signup" className="text-blue-400 hover:underline"> Sign Up</Link>
                    </p>
                </div>

                {/* Right Panel Illustration */}
                <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-b from-blue-900/40 to-gray-900/20 items-center justify-center p-8 lg:p-12 relative">
                    <div className="text-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/6331/6331264.png" 
                            alt="Illustration" className="w-48 sm:w-56 lg:w-64 mx-auto drop-shadow-2xl"/>
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mt-4 sm:mt-6">Welcome Back!</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-3">
                        Log in to continue using CraftDex’s smart tools!
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
        </>
    )
}
export default Login;