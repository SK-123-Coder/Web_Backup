// Import dependencies
import { useState } from "react";

// Import of ui component
import Popup from "../components/PopUp.jsx";

// Import of data for popup window
import FooterLinks from '../Data/Popup/Footer/FooterLink.js'

function Footer(){
    // For social meadia link
    const [open, setOpen] = useState(false);

    // Form
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [emailRes, setEmailRes] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
        setMessage("Please enter an email address");
        return;
        }

        setLoading(true);
        setMessage("");

        try {
        const res = await fetch("/api/user/footerEmail", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.success) {
            setMessage("Thanks for subscribing 🎉");
            setEmail("");
            setEmailRes(true);
        } else {
            setMessage(data.message || "Something went wrong");
        }
        } catch (error) {
        setMessage("Server error. Please try again later.");
        } finally {
        setLoading(false);
        }
    };

    return(
        <>
        <footer className="bg-[#0d1117] text-gray-300 py-14 border-t border-gray-800 shadow-inner relative overflow-hidden">

            {/* Decorative Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="max-w-7xl mx-auto px-6 text-center">
                
                {/* Brand Info */}
                <h2 className="text-3xl font-bold mb-3 bg-clip-text text-[#5FBFF9] hover:text-[#4fc3f7]">
                CraftDex
                </h2>

                <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
                Powerful online tools to convert, compress, and enhance your files.  
                Designed for creators & developers.
                </p>

                {/* Grid Section */}
                <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">

                    {/* Contact */}
                    <div className="hover:translate-y-[-4px] transition-all duration-300">
                        <h3 id="contact" className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-blue-500 after:rounded-full after:mt-2">
                        Contact Me
                        </h3>
                        <ul className="space-y-3">
                        <li className="flex items-center gap-3 group">
                            <i className="fa-solid fa-envelope text-blue-400 group-hover:scale-110 transition"></i>
                            <a href="sarangkhandateofficial.com" className="hover:text-blue-400 transition">sarangkhandateofficial@gmail.com</a>
                        </li>
                        <li className="flex items-center gap-3 group">
                            <i className="fa-solid fa-phone text-blue-400 group-hover:scale-110 transition"></i>
                            <span className="hover:text-blue-400 transition">+91 97676 35490</span>
                        </li>
                        <li className="flex items-center gap-3 group">
                            <i className="fa-solid fa-location-dot text-blue-400 group-hover:scale-110 transition"></i>
                            <span className="hover:text-blue-400 transition">Nagpur, Maharashtra, India</span>
                        </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="hover:translate-y-[-4px] transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-blue-500 after:rounded-full after:mt-2">
                        Quick Links
                        </h3>
                        <ul className="space-y-3">
                        <li><a href="/tools" className="hover:text-blue-400 hover:pl-1 transition-all duration-300">Tools</a></li>
                        <li><a href="/docs" className="hover:text-blue-400 hover:pl-1 transition-all duration-300">Docs</a></li>
                        <li><a href="/" className="hover:text-blue-400 hover:pl-1 transition-all duration-300">About Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="hover:translate-y-[-4px] transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-5 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-blue-500 after:rounded-full after:mt-2">
                        Stay Updated
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        Subscribe to our newsletter for updates on new tools and features.
                        </p>
                        <form
                        onSubmit={handleSubmit}
                        className="flex bg-gray-800 rounded-lg overflow-hidden
                                    border border-gray-700 focus-within:border-blue-500"
                        >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 w-full bg-gray-800 text-gray-200
                                    focus:outline-none placeholder-gray-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 to-blue-600
                                    px-5 py-2 font-medium text-white
                                    hover:from-blue-600 hover:to-blue-700
                                    transition disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Subscribe"}
                        </button>
                        </form>
                    </div>
                </div>

                {/* Social Media */}
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex justify-center gap-6 text-gray-400">
                    <button
                        onClick={() => setOpen(true)}
                        className="hover:text-blue-400 transform hover:scale-110 transition"
                    >
                        <i className="fa-brands fa-twitter text-2xl"></i>
                    </button>

                    <button
                        onClick={() => setOpen(true)}
                        className="hover:text-blue-400 transform hover:scale-110 transition"
                    >
                        <i className="fa-brands fa-github text-2xl"></i>
                    </button>

                    <button
                        onClick={() => setOpen(true)}
                        className="hover:text-blue-400 transform hover:scale-110 transition"
                    >
                        <i className="fa-brands fa-linkedin text-2xl"></i>
                    </button>

                    <button
                        onClick={() => setOpen(true)}
                        className="hover:text-blue-400 transform hover:scale-110 transition"
                    >
                        <i className="fa-solid fa-envelope text-2xl"></i>
                    </button>

                    <button
                        onClick={() => setOpen(true)}
                        className="hover:text-blue-400 transform hover:scale-110 transition"
                    >
                        <i className="fa-brands fa-youtube text-2xl"></i>
                    </button>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © 2025 CraftDex. All rights reserved.
                </div>
            </div>

            <Popup
            isOpen={open}
            title={FooterLinks[0].title}
            message={FooterLinks[0].message}
            btn={FooterLinks[0].btn}
            state={FooterLinks[0].state}
            onClose={() => setOpen(false)}
            />

            {/* Feedback message */}
            {message && (
                <Popup
                    isOpen={emailRes}
                    title={FooterLinks[1].title}
                    message={FooterLinks[1].message}
                    btn={FooterLinks[1].btn}
                    state={FooterLinks[1].state}
                    onClose={() => setEmailRes(false)}
                />
            )}
        </footer>
        </>
    )
}

export default Footer