import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaTimes } from "react-icons/fa";
import { templates, TEMPLATES_ID } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { clearStoreData, updateStoreData } from "../features/formDataSlice";
import templateOneInitialState from "../utils/templatesQuestions/template_1";
import templateTwoInitialState from "../utils/templatesQuestions/template_2";
// import { encryptData } from "../utils/Encryption"; 

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme)
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Update questions based on selected form
  function handleProceed() {
    if (!selectedTemplate) return;

    let selectedQuestions

    if (selectedTemplate.id === TEMPLATES_ID.TEMPLATE_1) {
      selectedQuestions = templateOneInitialState
    } else if (selectedTemplate.id === TEMPLATES_ID.TEMPLATE_2) {
      selectedQuestions = templateTwoInitialState
    }

    // Update intial state from users store
    dispatch(updateStoreData(selectedQuestions));
    // Add data in local storage so data is retrieved on refresh
   localStorage.setItem("userData",JSON.stringify(selectedQuestions));

      // Encrypt before saving to localStorage
    // const encryptedData = encryptData(JSON.stringify(selectedQuestions));
    // localStorage.setItem("userData", encryptedData);

    navigate("/userDetails");
  }



  // Remove data from local storage and store
  useEffect(() => {
    localStorage.removeItem("userData")
    localStorage.removeItem("submittedFormCount")
     localStorage.removeItem("isAllFormsFilled")  
    dispatch(clearStoreData())
  }, [])


  return (
    <div className={`h-screen w-full absolute top-0 -z-10 flex flex-col transition-all duration-300 overflow-hidden
      ${darkMode ? "bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50"}`}>

      {/* Small Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-6 left-3 w-16 h-16 rounded-full blur-lg opacity-15 animate-pulse 
          ${darkMode ? "bg-purple-600" : "bg-indigo-400"}`}></div>
        <div className={`absolute bottom-6 right-3 w-24 h-24 rounded-full blur-lg opacity-15 animate-pulse 
          ${darkMode ? "bg-indigo-600" : "bg-purple-400"}`} style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-3 md:px-4 py-3">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-4 lg:gap-6 items-start">

          {/* Left Content */}
          <div className="space-y-2 flex flex-col justify-center z-10 md:order-1 mt-8">
            <h1 className={`text-xl md:text-4xl lg:text-3xl font-bold leading-tight 
              ${darkMode ? "text-white" : "text-gray-900"}`}>
              Select Your <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Perfect Template</span>
            </h1>
            <p className={`text-xs md:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Choose the perfect template for your career stage and land your dream job effortlessly.
            </p>

            {/* Templates Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {templates.map((t) => (
                <div key={t.id} onClick={() => setSelectedTemplate(t)}
                  className={`group relative rounded-md overflow-hidden shadow-sm transition-all duration-200 transform
                    ${darkMode ? "bg-gray-800 hover:bg-gray-750 border-gray-700" : "bg-white hover:bg-gray-50 border-gray-200"} 
                    ${t.locked ? "opacity-60 cursor-not-allowed hover:translate-y-0" : "cursor-pointer hover:-translate-y-0.5"}`}>

                  <div className="p-1.5 space-y-1">
                    <div className="relative w-full aspect-[3/4] rounded overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                      <img src={t.src} alt={`Template ${t.id}`} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />

                      {t.locked && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
                          <FaLock size={14} className="text-white"/>
                        </div>
                      )}


                    </div>

                    <div className="text-center">
                      <h3 className={`text-xs font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Template {t.id}
                      </h3>
                      {!t.locked && <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Click to customize</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Preview */}
         <div className="relative hidden md:flex items-center justify-center h-full min-h-[200px] md:order-2 mt-8 md:ml-28">
            <div className={`absolute inset-0 rounded-lg backdrop-blur-lg shadow-sm border 
              ${darkMode ? "bg-linear-to-br from-gray-800/20 via-purple-900/20 to-indigo-900/20 border-gray-700/40"
                : "bg-linear-to-br from-white/20 via-purple-100/20 to-indigo-100/20 border-white/40"}`}></div>

            <div className="relative z-10 w-full max-w-xs">
              <div className={`rounded-lg overflow-hidden shadow-sm transform rotate-0 hover:rotate-0 transition-transform duration-300
                ${darkMode ? "border-gray-700" : "border-white"}`}>
                <img src="https://files.catbox.moe/84z7al.png" alt="Resume Preview" className="w-full h-auto object-cover"
                  onError={(e) => { e.target.src = templates[0].src; }} />
              </div>

              <div className="absolute -top-2 -left-2 w-6 h-6 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-linear-to-br from-pink-500 to-orange-500 rounded-full blur-md opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

          </div>
          
        </div>
      </section>

      {/* Modal */}
{selectedTemplate && (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center  bg-black/60 backdrop-blur-sm animate-fadeIn"
  >
    <div
      className={`relative w-85 max-w-sm rounded-xl shadow-xl overflow-hidden transform transition-all animate-scaleIn
      ${darkMode ? "bg-gray-800" : "bg-white"} mt-18`} 
      onClick={(e) => e.stopPropagation()} // prevent clicks inside modal from bubbling
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedTemplate(null)} // Only X closes modal
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200
        ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
      >
        <FaTimes size={14} />
      </button>

      {/* Modal Content */}
      <div className="p-4 flex flex-col items-center space-y-3">
        {/* Template Preview */}
        <div className="w-full max-w-xs">
          <div className={`rounded-md overflow-hidden shadow-lg border
            ${darkMode ? "border-indigo-500" : "border-indigo-400"}`}>
            <img
              src={selectedTemplate.src}
              alt={`Template ${selectedTemplate.id}`}
              className="object-cover rounded-md w-full h-auto"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleProceed}
          className="w-full max-w-xs py-2 px-4 rounded-md font-semibold text-sm text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          Continue to Form
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  )
}

export default Home