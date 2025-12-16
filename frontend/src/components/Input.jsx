import { useState } from "react";
import { getInputType } from "../utils/commonFunctions/forms";

const urlValidators = {
  gitHub: (value) =>
    /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(value),

  linkedIn: (value) =>
    /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/.test(value),
};

const Input = ({ item, inputChange, subsectionKey }) => {
  const [error, setError] = useState("");
  const inputType = getInputType(item);

  const handleChange = (value) => {
    setError("");

    inputChange(value, item, subsectionKey);
  };

  const handleBlur = (value) => {
    if (item.type === "url" && item.icon) {
      const validator = urlValidators[item.icon];

      if (validator && value && !validator(value)) {
        const errorMsg =
          item.icon === "gitHub"
            ? "Enter a valid GitHub profile URL"
            : "Enter a valid LinkedIn profile URL";

        setError(errorMsg);

        inputChange(value, { ...item, hasError: true }, subsectionKey);
        return;
      }
    }

    inputChange(value, { ...item, hasError: false }, subsectionKey);
  };


  // DROPDOWN SUPPORT (select)
  if (item.element === "select") {
    return (
      <div>
        <select
          value={item.answer || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg text-black
                     hover:border-purple-600 focus:border-purple-600 
                     border-gray-300"
        >
          <option value="" disabled>
            -- Select --
          </option>
          {item.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  // TEXTAREA
  if (inputType === "textarea") {
    return (
      <div>
        <textarea
          value={item.answer || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg 
                     focus:ring-2 focus:ring-green-500 
                     border-gray-300"
          rows="4"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  // NORMAL INPUT
  return (
    <div>
      <input
        type={inputType}
        value={item.answer || ""}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={(e) => handleBlur(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50 border-2 rounded-lg text-black
             hover:border-purple-600 focus:border-purple-600 
             border-gray-300"
        maxLength={item.maxLength}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
