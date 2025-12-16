

import React from "react";
import { IoHome, IoMoon, IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const darkMode = useSelector((state)=>state.theme)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    function setDarkMode(){
        dispatch(toggleTheme())
    }
    
  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-8 py-2 border-b border-white/20 shadow-md transition-all duration-300
      ${darkMode ? "bg-gray-400 text-white" : "bg-white text-blue-900"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src="https://acciojob.com/src/Navbar/logo.svg"
          alt="AccioResume Logo"
          className="w-30 h-10 cursor-pointer rounded-full"
          onError={(e) => (e.target.style.display = 'none')}
          onClick={()=>navigate("/")}
        />
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-1.5 rounded-full cursor-pointer hover:scale-110 transition shadow-md
          ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-blue-900"}`}
      >
        {darkMode ? <IoSunnyOutline size={18} /> : <IoMoon size={18} />}
      </button>
    </nav>
  );
}

export default NavBar;