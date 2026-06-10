import FormContainer from "../components/FormContainer";
import { lazy, Suspense, useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { updateStoreData } from "../features/formDataSlice";
import { Bounce, ToastContainer } from "react-toastify";
import CircularLoader from "../components/CircularLoader";

function Form() {
  const [submittedFormCount, setSubmittedFormCount] = useState(1);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme);
  const LazyFormImageComponent = lazy(() => import("../components/FormImage"));

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try { dispatch(updateStoreData(JSON.parse(stored))); }
      catch { localStorage.removeItem("userData"); }
    }
    const count = Number(localStorage.getItem("submittedFormCount"));
    if (count) setSubmittedFormCount(count);
  }, []);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center pt-20 pb-10 px-4 transition-colors duration-300
      ${darkMode ? "bg-[#0f0c1a]" : "bg-violet-50/60"}`}>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <ProgressBar submittedFormCount={submittedFormCount} darkMode={darkMode} />
      </div>

      {/* Main layout */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-6">

        {/* Illustration */}
        <Suspense fallback={<CircularLoader />}>
          <div className={`hidden md:flex flex-col items-center justify-center rounded-2xl border p-6 w-56 flex-shrink-0
            ${darkMode
              ? "bg-[#1a1530] border-violet-900/40"
              : "bg-white border-violet-100"}`}>
            <LazyFormImageComponent />
            <p className={`mt-4 text-xs text-center leading-relaxed
              ${darkMode ? "text-violet-400" : "text-violet-500"}`}>
              Fill each section carefully — your resume reflects your best self ✨
            </p>
          </div>
        </Suspense>

        {/* Form card */}
        <div className={`flex-1 w-full rounded-2xl border overflow-hidden
          ${darkMode
            ? "bg-[#1a1530] border-violet-900/40"
            : "bg-white border-violet-100"}`}>

          {/* Card header strip */}
          <div className={`px-5 py-3 border-b flex items-center gap-2
            ${darkMode
              ? "bg-violet-900/20 border-violet-900/40"
              : "bg-violet-50 border-violet-100"}`}>
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <p className={`text-xs font-medium ${darkMode ? "text-violet-300" : "text-violet-700"}`}>
              Fill in your details
            </p>
          </div>

          {/* Scrollable form content */}
          <div className={`h-[65vh] overflow-y-auto px-5 py-4
            [scrollbar-width:thin]
            [scrollbar-color:theme(colors.violet.300)_transparent]
            ${darkMode ? "[scrollbar-color:theme(colors.violet.800)_transparent]" : ""}`}>
            <FormContainer
              setSubmittedFormCount={setSubmittedFormCount}
              submittedFormCount={submittedFormCount}
            />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "colored"}
        transition={Bounce}
      />
    </div>
  );
}

export default Form;