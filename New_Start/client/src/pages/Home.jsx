// Import od dependencies
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Import of ui components
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"

function Home() {

  // For navigation based on apis respons from backend
  const navigate = useNavigate();
  const [ state, setState ] = useState('/signup');

  // It redirect authorised user to tools page only 1 time use.
  useEffect(() => {
    const hasChecked = sessionStorage.getItem("auth_checked");
    if (hasChecked) return;

    sessionStorage.setItem("auth_checked", "true");

    const checkUser = async () => {
      try {
        const res = await fetch("/api/user/userVerify", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data) {
            navigate("/tools", { replace: true });
          }
        }
      } catch (error) {
        console.error("Auth check failed");
      }
    };

    checkUser();
  }, [navigate]);

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

  return (
    <>
    <Navbar />

    {/* Hero Section */}
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white h-screen lg:min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-18 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 w-full relative z-10">

        {/* Left Content */}
        <div className="flex-1 space-y-7 sm:space-y-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight tracking-tight">
            Powerful Online Tools
            <br className="hidden lg:block"/>
            for <span className="text-[#5FBFF9] drop-shadow-md">Creators & Developers</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-lg sm:max-w-xl mx-auto lg:mx-0 leading-relaxed">
            CraftDex helps you <span className="text-white font-semibold">convert, compress, and enhance</span> your files effortlessly.  
            Whether you’re a <span className="font-semibold text-[#5FBFF9]">designer, developer, or creator</span>, our tools save time and boost productivity.
          </p>

          {/* Image for Mobile */}
          <div className="block lg:hidden flex justify-center py-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="CraftDex Tools"
              className="w-44 sm:w-52 md:w-60 drop-shadow-[0_15px_30px_rgba(95,191,249,0.35)] transition-transform duration-300"/>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-3">
            <Link to={state} className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg bg-[#5FBFF9] hover:bg-[#4daee6]   font-semibold shadow-lg shadow-[#5FBFF9]/40 text-gray-900 hover:scale-105 transition duration-300 text-center">
              🚀 Get Started
            </Link>

            <Link to="/docs" className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg border border-gray-700 hover:border-[#5FBFF9] hover:text-[#5FBFF9] font-medium text-center hover:scale-105 transition duration-300">
              📘 Learn More
            </Link>
          </div>
        </div>

        {/* Desktop Image */}
        <div>
          <div className="w-full max-w-md relative group hidden lg:block">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="CraftDex Tools"
              className="w-full drop-shadow-[0_20px_40px_rgba(95,191,249,0.35)] group-hover:scale-105 transition-transform duration-500"/>
          </div>
        </div>
      </div>
    </section>

    {/* CraftDex Goal and Vision */}
    <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 overflow-hidden flex items-center justify-center">

      {/* Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20 px-6 md:px-10 lg:px-14 py-16">

        {/*  Right: Text Content */}
          <div className="flex-1 text-center md:text-left space-y-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              CraftDex 
              <span className="text-[#5FBFF9] drop-shadow-lg"> Goal & Vision</span>
            </h2>

            {/* Aim Paragraph */}
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto md:mx-0">
              Our aim at <span className="text-[#5FBFF9] font-semibold">CraftDex</span> is to create powerful, intuitive, and reliable online tools that simplify complex tasks for individuals and businesses. 
              We focus on delivering seamless digital solutions that help people save time, increase productivity, and concentrate on their creativity without being limited by technical barriers.
            </p>

            {/* Vision Paragraph */}
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto md:mx-0">
              Our vision is to build a future where <span className="text-[#5FBFF9] font-semibold">technology becomes effortless and accessible to everyone</span>. 
              We strive to empower creators, developers, and entrepreneurs by providing innovative tools that encourage growth, foster collaboration, and make technology a bridge — not a barrier — to achieving their dreams.
            </p>

            {/* Call-to-Action Button */}
            <div>
              <Link to={state}
                  className="inline-block px-6 py-3 text-lg font-semibold bg-[#5FBFF9] text-gray-900 rounded-lg shadow-md shadow-[#5FBFF9]/40 hover:bg-[#4ba8db] hover:shadow-lg hover:shadow-[#5FBFF9]/50 transition duration-300">
                Explore Our Tools
              </Link>
            </div>
          </div>
            
        {/*  Left: Creativity Image */}
          <div className="flex-shrink-0 group relative flex justify-center">
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#5FBFF9]/30 to-transparent rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition duration-500"></div>
            <img 
              src="https://cdn.pixabay.com/photo/2022/12/09/03/54/big-data-7644534_1280.jpg" 
              alt="Creativity"
              className="relative w-72 md:w-96 lg:w-[28rem] rounded-2xl shadow-2xl shadow-black/40 transform hover:scale-105 transition duration-500 ease-in-out"
                />
          </div>
      </div>
    </section>

    {/* Owner Section */}
    <section className="relative w-full bg-gradient-to-r from-gray-900 to-gray-950 text-gray-200 py-20 min-h-screen flex justify-center items-center overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8">
          
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Hi, I'm <span className="text-[#5FBFF9] drop-shadow-md">Sarang Khandate</span>
        </h2>

        <p className="text-lg leading-relaxed text-gray-300">
          I’m a <span className="text-[#5FBFF9] font-semibold">Data Science student and the creator of this website</span>, 
          with a strong passion for web development. I focus on building  
          <span className="text-[#5FBFF9] font-semibold"> practical tools, intelligent systems, and modern web applications </span>  
          that solve real-world problems. My mission is to design <strong>user-friendly</strong> and 
          <strong> accessible solutions</strong> that make technology simpler and more impactful for both individuals and businesses.
        </p>

          {/* Info List */}
          <ul className="space-y-4 sm:space-y-5 text-left w-full max-w-xl mx-auto">
            
            {/* Item */}
            <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 hover:text-[#5FBFF9] transition">
              <div className="flex items-center gap-3">
                {/* Location Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#5FBFF9] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-6.268 8-12a8 8 0 10-16 0c0 5.732 8 12 8 12z" />
                </svg>
                <span className="font-semibold text-white">Location:</span>
              </div>
              <span className="text-gray-300 text-sm sm:text-base">
                Nagpur, Maharashtra, India
              </span>
            </li>

            {/* Education */}
            <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 hover:text-[#5FBFF9] transition">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#5FBFF9] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" />
                </svg>
                <span className="font-semibold text-white">Education:</span>
              </div>
              <span className="text-gray-300 text-sm sm:text-base">
                Data Science Student
              </span>
            </li>

            {/* Skills */}
            <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 hover:text-[#5FBFF9] transition">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#5FBFF9] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
                <span className="font-semibold text-white">Skills:</span>
              </div>
              <span className="text-gray-300 text-sm sm:text-base leading-relaxed">
                MERN Stack, Python, MongoDB, Tailwind CSS, React, Nativewind
              </span>
            </li>

            {/* Email */}
            <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 hover:text-[#5FBFF9] transition">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-[#5FBFF9] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm16 0L12 13 4 4" />
                </svg>
                <span className="font-semibold text-white">Email:</span>
              </div>
              <span className="text-gray-300 text-sm sm:text-base break-all">
                sarangkhandateofficial@gmail.com
              </span>
            </li>

          </ul>

          {/* Buttons */}
          <div className="pt-6">
          <a href="#contact"
              className="px-6 py-3 rounded-full border border-[#5FBFF9] hover:bg-[#5FBFF9]/10 hover:text-white text-[#5FBFF9] font-medium transition hover:shadow-lg hover:shadow-[#5FBFF9]/30">
              📩 Contact Me
          </a>
          </div>
      </div>
    </section>
    
    <Footer />
    </>
  )
}

export default Home
