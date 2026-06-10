import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RenderingBasicForm from "./RenderBasicForm";

const NestedForm = ({ nestedData, section, labelFormatter, inputChange }) => {
  const darkMode = useSelector((state) => state.theme);
  const tabs = Object.keys(nestedData || {});
  const [activeTab, setActiveTab] = useState(tabs[0] || null);
  const [skippedTabs, setSkippedTabs] = useState([]);
  const dm = darkMode;

  const handleSkipTab = () => {
    setSkippedTabs((prev) => [...prev, activeTab]);
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };

  function hasSkippableFields() {
    const questions = nestedData[activeTab];
    if (!questions || !Array.isArray(questions)) return false;
    return questions.some((q) => q.canSkip === true);
  }

  useEffect(() => {
    setActiveTab(tabs[0] || null);
    setSkippedTabs([]);
  }, [section]);

  return (
    <div className="space-y-4">

      {/* Tab bar */}
      <div className={`flex flex-wrap gap-2 pb-3 border-b
        ${dm ? "border-violet-900/40" : "border-violet-100"}`}>
        {tabs.map((key) => {
          const isActive = activeTab === key;
          const isSkipped = skippedTabs.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
                ${isActive
                  ? "bg-violet-600 text-white border-violet-600"
                  : isSkipped
                    ? dm
                      ? "bg-orange-900/20 text-orange-400 border-orange-800/40"
                      : "bg-orange-50 text-orange-600 border-orange-200"
                    : dm
                      ? "bg-violet-900/20 text-violet-300 border-violet-800/40 hover:bg-violet-900/40"
                      : "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100"}`}>
              {isSkipped && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {labelFormatter ? labelFormatter(key) : key}
            </button>
          );
        })}
      </div>

      {/* Active tab content */}
      {tabs.map((key) => (
        <div key={key} className={activeTab === key ? "block" : "hidden"}>

          {/* Tab header row */}
          <div className="flex items-center justify-between mb-4">
            <p className={`text-xs font-semibold uppercase tracking-wide
              ${dm ? "text-violet-300" : "text-violet-600"}`}>
              {labelFormatter ? labelFormatter(key) : key}
            </p>

            <div className="flex items-center gap-2">
              {skippedTabs.includes(key) && (
                <span className={`text-[10px] px-2 py-0.5 rounded-md border
                  ${dm
                    ? "bg-orange-900/20 text-orange-400 border-orange-800/40"
                    : "bg-orange-50 text-orange-600 border-orange-100"}`}>
                  Skipped
                </span>
              )}
              {hasSkippableFields() && !skippedTabs.includes(key) && (
                <button
                  type="button"
                  onClick={handleSkipTab}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors
                    ${dm
                      ? "bg-violet-900/20 text-violet-400 border-violet-800/40 hover:bg-violet-900/40"
                      : "bg-violet-50 text-violet-500 border-violet-100 hover:bg-violet-100"}`}>
                  Skip this section →
                </button>
              )}
            </div>
          </div>

          <RenderingBasicForm
            questions={nestedData[key] || []}
            inputChange={inputChange}
            section={section}
            subsectionKey={key}
          />
        </div>
      ))}
    </div>
  );
};

export default NestedForm;