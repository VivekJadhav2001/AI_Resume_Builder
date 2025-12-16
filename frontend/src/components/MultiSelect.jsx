
import { useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles, skillsOptions } from "../constant";

const MultiSelect = ({
  item,
  inputChange,
  subsectionKey,
  darkMode,
}) => {
  const skillType = subsectionKey || item.id;
  const options = skillsOptions[skillType] || [];

  console.log(subsectionKey,'sub section key in multiselect')

  const parseValue = () => {
    if (!item.answer) return [];

    let answer = item.answer;

    // Convert "React, JavaScript" → ["React", "JavaScript"]
    if (typeof answer === "string") {
      answer = answer.split(",").map((v) => v.trim());
    }

    // Convert ["React"] → [{label:"React", value:"React"}]
    if (Array.isArray(answer)) {
      return answer.map((val) => {
        if (typeof val === "object") return val; // already correct

        const match = options.find(
          (opt) => opt.label === val || opt.value === val
        );

        return match || { label: val, value: val };
      });
    }

    return [];
  };

  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value).join(", ")
      : "";

    inputChange(values, item,subsectionKey);
  };

  return (
    <div className="w-full">
      <Select
        isMulti
        name={item.id}
        options={options}
        // defaultValue={}
        value={parseValue()}
        onChange={handleChange}
        placeholder={`Select ${item.displayQuestion || "skills"}...`}
        classNamePrefix="select"
        styles={customStyles}
        isClearable
       className={darkMode ? "text-black bg-gray-200" : "text-gray-600 "}
      />

      {item.answer && (
        <div
          className={`mt-2 text-sm transition-colors duration-500 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <span className="font-medium">Selected: </span>
          {item.answer}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

