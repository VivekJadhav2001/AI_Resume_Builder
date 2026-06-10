import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const darkMode = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-2.5 border-b transition-all duration-300
      ${darkMode
        ? "bg-[#0f0c1a] border-violet-900/40 text-white"
        : "bg-white border-violet-100 text-gray-900"}`}>

      {/* Logo */}
      <div
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => navigate("/")}>
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 2h7l3 3v9H3V2z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M10 2v3h3" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M5 7h6M5 9.5h4" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p className={`text-sm font-semibold leading-none mb-0.5 ${darkMode ? "text-white" : "text-gray-900"}`}>
            AccioResume
          </p>
          <p className="text-[10px] text-violet-500 leading-none">Build · Apply · Succeed</p>
        </div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => dispatch(toggleTheme())}
        aria-label="Toggle theme"
        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 hover:scale-105
          ${darkMode
            ? "bg-violet-900/30 border-violet-700/50 text-violet-300 hover:bg-violet-900/50"
            : "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100"}`}>
        {darkMode ? <IoSunnyOutline size={15} /> : <IoMoon size={15} />}
      </button>
    </nav>
  );
}

export default NavBar;