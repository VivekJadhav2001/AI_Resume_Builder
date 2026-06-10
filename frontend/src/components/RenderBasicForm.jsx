import { useSelector } from "react-redux";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import TextEditor from "./TextEditor";

const RenderingBasicForm = ({ questions, inputChange, section, subsectionKey, errors = {} }) => {
  const darkMode = useSelector((state) => state.theme);
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const dm = darkMode;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
      {safeQuestions.map((item, idx) => (
        <div key={item.id || idx} className={item.isEditorEnabled ? "col-span-2" : ""}>

          {/* Label row */}
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-xs font-semibold uppercase tracking-wide
              ${dm ? "text-violet-300" : "text-gray-500"}`}>
              {item.displayQuestion}
              {!item.canSkip && !item.isLastForm && (
                <span className="text-violet-500 ml-1">*</span>
              )}
            </label>

            {item.canSkip && (
              <span className={`text-[10px] px-2 py-0.5 rounded-md border
                ${dm
                  ? "bg-violet-900/30 text-violet-400 border-violet-700/50"
                  : "bg-violet-50 text-violet-500 border-violet-200"}`}>
                Optional
              </span>
            )}
          </div>

          {/* Field */}
          {item.isMultiSelect ? (
            <MultiSelect
              item={item}
              section={section}
              inputChange={inputChange}
              subsectionKey={subsectionKey}
              darkMode={dm}
            />
          ) : item.isEditorEnabled ? (
            <TextEditor
              key={item.id}
              item={item}
              section={section}
              inputChange={inputChange}
              subsectionKey={subsectionKey}
              darkMode={dm}
            />
          ) : (
            <Input
              item={item}
              inputChange={inputChange}
              darkMode={dm}
              subsectionKey={subsectionKey}
            />
          )}

          {/* Inline error */}
          {errors[item.id] && (
            <p className="flex items-center gap-1 mt-1 text-[11px] text-red-500">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1"/>
                <path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {errors[item.id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderingBasicForm;