// Import of dependencies
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import of ui components
import UpdatesPanel from "../components/UpdatesPanel";
import MobileMenu from "./MobileMenu"

function NavBar() {

// Tailwind class constants
const navBase = "relative group transition duration-300";
const navInactive = "text-gray-300 hover:text-[#5FBFF9]";
const navActive = "text-[#5FBFF9] font-semibold";



// React Router
const navigate = useNavigate();


// Search
const [searchText, setSearchText] = useState("");
const [wait, setWait] = useState(false);
const [error, setError] = useState("");


// UI States
const [open, setOpen] = useState(false);     // Notification panel
const [Menu, setMenu] = useState(false);     // Mobile menu


const [profile, setProfile] = useState(false);
const profileRef = useRef(null);
const [isDesktop, setIsDesktop] = useState(false);


useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024); // Tailwind lg breakpoint
  };

  handleResize(); // run on mount
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);


// User Auth
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// New user direction
const [ state, setState ] = useState('/signup');


// Utility Functions
const getInitials = (name) =>
  name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();




// Handlers

// Search handler
const handleSearch = async () => {
  if (!searchText.trim() || wait) return;

  setError("");
  setWait(true);

  try {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: searchText }),
    });

    const data = await res.json();

    if (data.success) {
      navigate(data.route);
    } else {
      setError(data.message || "No result found");
    }
  } catch (err) {
    setError("Server error. Try again later.");
  } finally {
    setWait(false);
  }
};

// Admin authentication (double click)
const handleDoubleClick = async () => {
  const pass = prompt("Enter:");

  if (!pass) return;

  try {
    const response = await fetch("/api/auth/adminAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pass }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirectUrl;
    } else {
      alert("Wrong password");
    }
  } catch (error) {
    console.error("Auth error:", error);
  }
};

// =====================
// Effects
// =====================

    // Close mobile menu on scroll / touch
    useEffect(() => {
    const closeOnScroll = () => setMenu(false);
    const closeOnScrollProfile = () => setProfile(false);

    window.addEventListener("scroll", closeOnScroll);
    window.addEventListener("touchmove", closeOnScroll);


    window.addEventListener("scroll", closeOnScrollProfile);
    window.addEventListener("touchmove", closeOnScrollProfile);

    return () => {
        window.removeEventListener("scroll", closeOnScroll);
        window.removeEventListener("touchmove", closeOnScroll);

        window.removeEventListener("scroll", closeOnScrollProfile);
        window.removeEventListener("touchmove", closeOnScrollProfile);
    };
    }, []);

    // Fetch logged-in user
    useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
        try {
        const res = await fetch("/api/auth/user", {
            method: "GET",
            credentials: "include",
        });

        // User not logged in (expected case)
        if (res.status === 401) {
            if (isMounted) setUser(null);
            return;
        }

        // Other errors (real problems)
        if (!res.ok) {
            throw new Error(`Auth error: ${res.status}`);
        }

        const data = await res.json();
        if (isMounted) setUser(data);

        } catch (err) {
        console.error("Auth fetch failed:", err);
        if (isMounted) setUser(null);
        } finally {
        if (isMounted) setLoading(false);
        }
    };

    fetchUser();

    return () => {
        isMounted = false;
    };
    }, []);


  // It change state of get started button depending on user authorisation
  useEffect(() => {

    const checkButtonState = async () => {
      try {
        const res = await fetch("/api/user/userVerify", {
          method: "GET",
          credentials: "include"
        });

        if (res.ok) {
          const data = await res.json();
          if (data) {
            setState('/tools');
          }
        }
      } catch (error) {
        console.error("Auth check failed");
      }
    }

    checkButtonState();

  }, []);


if (loading) return null;

    
    return (
        <>
        <nav className="w-full bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-800 fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">

                {/* Logo & Search */}
                <div className="flex items-center gap-4 sm:gap-6">

                    {/* Logo */}
                    <img
                    src="/ChatGPT Image Feb 5, 2026, 10_28_159 AM.png"
                    alt="CraftDex Logo"
                    className=" h-8 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onDoubleClick={handleDoubleClick}
                    />
                    
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center relative">
                        <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            if (error) setError("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                            e.target.blur();
                            }
                        }}
                        placeholder="Search tools, docs..."
                        className="bg-gray-800/40 backdrop-blur-md border border-gray-700 placeholder-gray-400 rounded-full 
                                    px-5 py-1.5 pl-10 w-44 sm:w-56 md:w-64 lg:w-72 
                                    focus:outline-none focus:ring-2 focus:ring-[#5FBFF9] focus:border-[#5FBFF9] 
                                    text-gray-200 shadow-inner transition-all duration-300 
                                    hover:shadow-[0_0_6px_#5FBFF9]"
                        />

                        <i className="fa-solid fa-magnifying-glass text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 text-sm"></i>

                        {/* Optional error message */}
                        {error && searchText.trim() && (
                        <p
                            className="absolute top-full w-50 left-1/2 -translate-x-1/2 mt-4 
                                    px-4 py-1.5 text-xs font-medium text-red-200
                                    bg-red-500/10 backdrop-blur-3xl
                                    border border-red-500/25 rounded-full
                                    shadow-[0_0_18px_rgba(239,68,68,0.35)]
                                    transition-all duration-300 ease-out
                                    animate-fade-in"
                        >
                            {error}
                        </p>
                        )}

                    </div>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex space-x-6 xl:space-x-10 font-medium">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                    `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    Home
                    <span
                    className={`
                        absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#5FBFF9]
                        transition-all duration-300
                        ${({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    />
                </NavLink>

                <NavLink
                    to={state}
                    className={({ isActive }) =>
                    `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    Tools
                    <span
                    className={`
                        absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#5FBFF9]
                        transition-all duration-300
                        ${({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    />
                </NavLink>

                <NavLink
                    to="/docs"
                    className={({ isActive }) =>
                    `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    Docs
                    <span
                    className={`
                        absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#5FBFF9]
                        transition-all duration-300
                        ${({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    />
                </NavLink>

                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 md:gap-9">

                    {/* Update button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="py-2 text-black rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-bell text-xl text-gray-300 hover:text-[#5FBFF9] transition"></i>
                    </button>

                    {/* Auth Button and profile */}
                    {user ? (
                    <div
                        className="relative"
                        ref={profileRef}
                        onMouseEnter={() => {
                        if (isDesktop) setProfile(true);
                        }}
                        onMouseLeave={() => {
                        if (isDesktop) setProfile(false);
                        }}
                    >
                        {/* Profile Button */}
                        <button
                        onClick={() => setProfile((prev) => !prev)}
                        className="w-10 h-10 flex items-center justify-center rounded-full
                        bg-gray-800 border-2 border-gray-700 cursor-pointer
                        hover:border-[#5FBFF9] transition-all duration-300
                        text-gray-100 font-bold text-sm focus:outline-none"
                        >
                        {getInitials(user.name)}
                        </button>

                        {/* Dropdown */}
                        <div
                        className={`absolute right-0 mt-2 min-w-[180px] max-w-[260px]
                        bg-gray-900/97 backdrop-blur-xl
                        border border-white/10 rounded-xl
                        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                        p-4 transition-all duration-200 origin-top-right z-50
                        ${profile
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
                        >
                        <div className="flex items-start gap-3">
                            <div
                            className="w-10 h-10 flex items-center justify-center rounded-full
                            bg-gray-800/70 backdrop-blur-md
                            border border-white/10 text-gray-100
                            font-semibold text-sm"
                            >
                            {getInitials(user.name)}
                            </div>

                            <div className="flex flex-col overflow-hidden">
                            <p className="text-gray-100 font-semibold text-sm truncate">
                                {user.name}
                            </p>
                            <p className="text-gray-300 text-xs truncate">
                                {user.email}
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    ) : (
                    <Link
                        to="/signup"
                        className="hidden sm:block px-5 py-2 rounded-full bg-[#5FBFF9] 
                        text-white font-semibold text-sm hover:bg-[#4aaee0] 
                        hover:shadow-[0_0_8px_#5FBFF9] transition-all duration-300"
                    >
                        Login / Sign up
                    </Link>
                    )}


                    {/* Hamburger Button */}
                    <button
                    className="lg:hidden text-2xl"
                    onClick={() => setMenu(prev => !prev)}
                    >
                    {Menu ? (
                        <i className="fa-solid fa-xmark text-xl text-gray-300"></i>
                    ) : (
                        <i className="fa-solid fa-bars text-xl text-gray-300"></i>
                    )}
                    </button>
                </div>
            </div>
        </nav>

        <UpdatesPanel isOpen={open} onClose={() => setOpen(false)}></UpdatesPanel>

        <MobileMenu
        Menu={Menu}
        setMenu={setMenu}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        error={error}
        setError={setError}
        />

        </>
    )
}

export default NavBar;
