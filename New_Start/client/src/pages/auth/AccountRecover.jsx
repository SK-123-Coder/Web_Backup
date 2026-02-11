// Import of dependencies
import { Link } from "react-router-dom";
import {useState} from "react"

// Import of ui components
import Popup from "../../components/PopUp"

// Import of data for popup window
import AccountRecoverPopup from "../../Data/Popup/AccountReconvery_Popup/user.AccountRecoverPopup"

function AccountRecover(){
  const [open, setOpen] = useState(false); // For popup window
  const [activePopup, setActivePopup] = useState(null); // Activation of popup window

  // Handle form data
  const [formData, setFormData] = useState({
    name:"",
    email:""
  });

  // Handle multiple input feilds
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch('/api/auth/accountRecover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if(response.status === 200){
        // When successfull

        const popup = AccountRecoverPopup.find(p => p.id === 1);
        setActivePopup(popup);
        setOpen(true);

      } else if(response.status === 400){
        // When empty feild

        const popup = AccountRecoverPopup.find(p => p.id === 2);
        setActivePopup(popup);
        setOpen(true);

      } else if(response.status === 404){
        // If data not exist

        const popup = AccountRecoverPopup.find(p => p.id === 3);
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
            <div className="relative w-full max-w-xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-gray-700 bg-gray-900/40 backdrop-blur-2xl p-6 sm:p-10">
            
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center shadow-xl backdrop-blur-xl">
                        <i className="fa-solid fa-key text-blue-400 text-2xl"></i>
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Recover Account
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm mt-3 max-w-sm mx-auto">
                        Enter your username and registered email to retrieve your login details.
                    </p>
                </div>

                {/* Form Section */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label for="recover-username" className="block text-sm font-medium mb-2 text-white">Username</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 gap-3 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                        <i className="fa-solid fa-user text-gray-300"></i>

                        <input id="recover-username" name="name" type="text" placeholder="Enter your username"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div>
                        <label for="recover-email" className="block text-sm font-medium mb-2 text-white">Email</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 
                                    gap-3 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                        <i className="fa-solid fa-envelope text-gray-300"></i>

                        <input id="recover-email" name="email" type="email" placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                        </div>
                    </div>

                    <button type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                                bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                                transition-all duration-300 font-semibold text-white shadow-xl 
                                shadow-blue-600/40 hover:shadow-blue-500/60 hover:scale-[1.02]">

                        <i className="fa-solid fa-rotate-right text-white"></i>
                        <span>Recover Account</span>
                    </button>

                    <p className="text-center text-sm text-gray-300 mt-2">
                        Remember your password ?
                        <Link to="/login" className="text-blue-400 hover:underline"> Back to Login</Link>
                    </p>
                </form>
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

export default AccountRecover;