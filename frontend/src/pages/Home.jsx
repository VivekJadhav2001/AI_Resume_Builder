import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaTimes, FaArrowRight } from "react-icons/fa";
import { templates, TEMPLATES_ID } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { clearStoreData, updateStoreData } from "../features/formDataSlice";
import templateOneInitialState from "../utils/templatesQuestions/template_1";
import templateTwoInitialState from "../utils/templatesQuestions/template_2";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function handleProceed() {
    if (!selectedTemplate) return;
    const selectedQuestions =
      selectedTemplate.id === TEMPLATES_ID.TEMPLATE_1
        ? templateOneInitialState
        : templateTwoInitialState;
    dispatch(updateStoreData(selectedQuestions));
    localStorage.setItem("userData", JSON.stringify(selectedQuestions));
    navigate("/userDetails");
  }

  useEffect(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("submittedFormCount");
    localStorage.removeItem("isAllFormsFilled");
    dispatch(clearStoreData());
  }, []);

  const tips = [
    "Recruiters spend just 6–7 seconds on a resume — make it count",
    "Clean formatting beats dense paragraphs every time",
    "ATS-friendly templates improve shortlisting chances",
  ];

  return (
    <div className={`min-h-screen w-full absolute top-0 -z-10 pt-16 transition-colors duration-300
      ${darkMode ? "bg-[#0f0c1a]" : "bg-violet-50/60"}`}>

      {/* Soft background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.07]
          ${darkMode ? "bg-violet-500" : "bg-violet-400"}`} />
        <div className={`absolute bottom-10 left-10 w-48 h-48 rounded-full blur-3xl opacity-[0.06]
          ${darkMode ? "bg-fuchsia-500" : "bg-fuchsia-400"}`} />
      </div>

      <section className="relative max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-start">

        {/* Left */}
        <div>
          {/* Badge */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border mb-4
            ${darkMode
              ? "bg-violet-900/40 text-violet-300 border-violet-700/50"
              : "bg-violet-50 text-violet-700 border-violet-200"}`}>
            🎓 Student resume builder
          </span>

          <h1 className={`text-2xl md:text-3xl font-semibold leading-snug mb-3
            ${darkMode ? "text-white" : "text-gray-900"}`}>
            Pick your template,<br />
            <span className="text-violet-600">land your dream job</span>
          </h1>

          <p className={`text-sm mb-6 leading-relaxed
            ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Designed for freshers & interns. Fill in your details — we handle the formatting.
          </p>

          {/* Template grid */}
          <div className="grid grid-cols-2 gap-3">
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => !t.locked && setSelectedTemplate(t)}
                className={`group relative rounded-xl overflow-hidden border transition-all duration-200
                  ${darkMode
                    ? "bg-[#1a1530] border-violet-900/50"
                    : "bg-white border-violet-100"}
                  ${t.locked
                    ? "opacity-50 cursor-not-allowed"
                    : `cursor-pointer hover:-translate-y-1 ${darkMode ? "hover:border-violet-500" : "hover:border-violet-400"}`}`}>

                {/* Image area */}
                <div className={`aspect-[3/4] overflow-hidden relative
                  ${darkMode ? "bg-violet-900/20" : "bg-violet-50"}`}>
                  <img
                    src={t.src}
                    alt={`Template ${t.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {t.locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <FaLock size={13} className="text-white/80" />
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className={`px-2 py-2 text-center border-t
                  ${darkMode ? "border-violet-900/40" : "border-violet-50"}`}>
                  <p className={`text-xs font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                    Template {t.id}
                  </p>
                  <p className="text-[10px] text-violet-400">
                    {t.locked ? "Coming soon" : "Tap to preview"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className={`hidden md:flex flex-col gap-4 rounded-2xl border p-5
          ${darkMode
            ? "bg-[#1a1530] border-violet-900/40"
            : "bg-white border-violet-100"}`}>

          <p className="text-[10px] font-medium uppercase tracking-widest text-violet-400">
            Why it matters
          </p>

          {/* Illustration placeholder */}
          <div className={`rounded-xl aspect-video flex items-center justify-center
            ${darkMode ? "bg-violet-900/20" : "bg-violet-50"}`}>
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80&auto=format&fit=crop"
              alt="Student working on resume"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <ul className="space-y-3 mt-1">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                <span className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA nudge */}
          <div className={`mt-2 rounded-xl p-3 border
            ${darkMode
              ? "bg-violet-900/20 border-violet-800/40"
              : "bg-violet-50 border-violet-100"}`}>
            <p className={`text-xs font-medium mb-0.5 ${darkMode ? "text-violet-300" : "text-violet-700"}`}>
              Ready in under 5 minutes
            </p>
            <p className={`text-[11px] ${darkMode ? "text-violet-400" : "text-violet-500"}`}>
              Pick a template on the left to get started →
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedTemplate(null)}>
          <div
            className={`relative w-72 rounded-2xl border overflow-hidden
              ${darkMode
                ? "bg-[#1a1530] border-violet-800/60"
                : "bg-white border-violet-100"}`}
            onClick={(e) => e.stopPropagation()}>

            {/* Close */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className={`absolute top-3 right-3 w-7 h-7 rounded-lg border flex items-center justify-center z-10 transition-colors
                ${darkMode
                  ? "bg-violet-900/40 border-violet-700/50 text-violet-300 hover:bg-violet-900/70"
                  : "bg-violet-50 border-violet-100 text-violet-500 hover:bg-violet-100"}`}>
              <FaTimes size={10} />
            </button>

            {/* Preview image */}
            <div className="overflow-hidden">
              <img
                src={selectedTemplate.src}
                alt={`Template ${selectedTemplate.id}`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Info + action */}
            <div className="p-4">
              <p className={`text-sm font-medium mb-0.5 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Template {selectedTemplate.id}
              </p>
              <p className="text-xs text-violet-400 mb-4">Clean & professional · Ready to fill</p>

              <button
                onClick={handleProceed}
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <FaArrowRight size={11} />
                Continue to form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;