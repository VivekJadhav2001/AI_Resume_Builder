import { useDispatch, useSelector } from "react-redux";
import { updateData, updateFormRender, updateStoreData, updateBackRender } from "../features/formDataSlice";
import { FORM_SECTIONS, getLabel, SECTION_TITLES, isRequiredFieldsFilled, validateField } from "../constant";
import { useNavigate } from "react-router-dom";
import RenderingBasicForm from "./RenderBasicForm";
import NestedForm from "./NestedForm";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

function FormContainer({ setSubmittedFormCount, submittedFormCount }) {
  const currentForm = useSelector((state) => state.formData.currentForm);
  const renderingArray = useSelector((state) => state.formData.renderingQuestions);
  const darkMode = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sectionTitle = SECTION_TITLES[currentForm];
  const isFinalSection = [FORM_SECTIONS.CERTIFICATIONS].includes(currentForm);
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [isNested, setIsNested] = useState(false);

  function getData(e) {
    e.preventDefault();
    if (isDisabled) return;
    if (!isRequiredFieldsFilled(renderingArray)) return;
    dispatch(updateFormRender());
    if (isFinalSection) {
      localStorage.setItem("isAllFormsFilled", "true");
      navigate("/preview");
    }
    localStorage.setItem("submittedFormCount", submittedFormCount + 1);
    setSubmittedFormCount((prev) => prev + 1);
  }

  function inputChange(text, item, subSectionKey = null) {
    const updatedItem = { ...item, answer: text };
    const result = validateField(updatedItem);
    setErrors((prev) => {
      const copy = { ...prev };
      if (!result.valid) copy[item.id] = result.message;
      else delete copy[item.id];
      return copy;
    });
    dispatch(updateData({
      answer: text,
      questionId: item.id,
      section: currentForm,
      subSectionKey: subSectionKey || null,
    }));
  }

  function goBack() {
    dispatch(updateBackRender());
    setSubmittedFormCount((prev) => Math.max(prev - 1, 0));
  }

  const updateSubmitButtonStatus = useCallback(() => {
    const filled = isRequiredFieldsFilled(renderingArray);
    const hasErrors = Object.keys(errors).length > 0;
    setIsDisabled(!filled || hasErrors);
  }, [renderingArray, errors]);

  function isFormNested() {
    if (!renderingArray || Array.isArray(renderingArray)) { setIsNested(false); return; }
    if (typeof renderingArray === "object") {
      const values = Object.values(renderingArray);
      setIsNested(values.length > 0 && values.every((v) => Array.isArray(v)));
    } else { setIsNested(false); }
  }

  useEffect(() => {
    isFormNested();
    updateSubmitButtonStatus();
  }, [renderingArray]);

  const dm = darkMode;

  return (
    <div className={`w-full rounded-2xl overflow-hidden border transition-colors duration-300
      ${dm ? "bg-[#1a1530] border-violet-900/40" : "bg-white border-violet-100"}`}>

      {/* Card header */}
      <div className={`flex items-center gap-2.5 px-5 py-3 border-b
        ${dm ? "bg-violet-900/20 border-violet-900/40" : "bg-violet-50 border-violet-100"}`}>
        <div className="w-2 h-2 rounded-full bg-violet-500" />
        <h2 className={`text-sm font-semibold ${dm ? "text-violet-200" : "text-violet-800"}`}>
          {sectionTitle}
        </h2>
      </div>

      {/* Form body */}
      <form onSubmit={getData} className="p-5">
        {isNested ? (
          <NestedForm
            nestedData={renderingArray}
            section={currentForm}
            labelFormatter={(key) => getLabel(currentForm, key)}
            inputChange={inputChange}
          />
        ) : (
          <RenderingBasicForm
            questions={Array.isArray(renderingArray) ? renderingArray : Object.values(renderingArray || {})}
            inputChange={inputChange}
            section={currentForm}
            errors={errors}
            labelFormatter={(key) => getLabel(currentForm, key)}
          />
        )}

        {/* Action buttons */}
        <div className={`flex items-center justify-between mt-6 pt-4 border-t
          ${dm ? "border-violet-900/40" : "border-violet-100"}`}>

          {/* Previous */}
          {submittedFormCount > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                ${dm
                  ? "bg-violet-900/30 border-violet-700/50 text-violet-300 hover:bg-violet-900/50"
                  : "bg-violet-50 border-violet-200 text-violet-600 hover:bg-violet-100"}`}>
              <FaArrowLeft size={11} />
              Previous
            </button>
          ) : (
            <div />
          )}

          {/* Next / Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all
              ${isDisabled
                ? dm
                  ? "bg-violet-900/20 text-violet-600 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"}`}>
            {isFinalSection ? (
              <><FaCheck size={11} /> Submit</>
            ) : (
              <>Next <FaArrowRight size={11} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormContainer;