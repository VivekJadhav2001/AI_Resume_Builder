import { useDispatch, useSelector } from "react-redux";
import { updateData, updateFormRender, updateStoreData, updateBackRender, } from "../features/formDataSlice";
import { FORM_SECTIONS, getLabel, SECTION_TITLES, isRequiredFieldsFilled, validateField, } from "../constant";
import { useNavigate } from "react-router-dom";
import RenderingBasicForm from "./RenderBasicForm";
import NestedForm from "./NestedForm";
import { useCallback, useEffect, useMemo, useState } from "react";


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
    const [isNested, setIsNested] = useState(false)





    // On submit of form
    function getData(e) {
        e.preventDefault();

        // If already disabled stop multiple submits
        if (isDisabled) return;

        // Validate all fields filled
        if (!isRequiredFieldsFilled(renderingArray)) {
            return;
        }
        // Data update in store (MOVED BEFORE THE IF CHECK)
        dispatch(updateFormRender());

        // Check if current form is last form - USE isFinalSection instead!
        if (isFinalSection) {
            // Mark all forms as filled
            localStorage.setItem("isAllFormsFilled", "true");
            navigate("/preview");
        }
        // Update count of form submitted count in local storage
        localStorage.setItem("submittedFormCount", submittedFormCount + 1);

        // Increase form submit count
        setSubmittedFormCount((prev) => prev + 1);
    }



    // Update answer for each question in store
    function inputChange(text, item, subSectionKey = null) {
        // console.log(subSectionKey, item, text, 'input chage params')
        // UPDATE FIELD VALUE , VALIDATE
        const updatedItem = { ...item, answer: text };

        // Run validation for this specific field
        const result = validateField(updatedItem);

        setErrors((prev) => {
            const copy = { ...prev };

            if (!result.valid) {
                // If field has error → store message
                copy[item.id] = result.message;
                // console.log("Item ID:", item.id);
            } else {
                // If field is correct  remove error
                delete copy[item.id];
            }


            return copy;
        });

        dispatch(
            updateData({
                answer: text,
                questionId: item.id,
                section: currentForm,
                subSectionKey: subSectionKey || null, // Ensure it's null if undefined
            })
        );



    }


    // Previous Button Handler
    function goBack() {
        dispatch(updateBackRender());
        // when th eform count 0 then prev-1 = -1 it will get issue
        setSubmittedFormCount((prev) => Math.max(prev - 1, 0));
    }


    const updateSubmitButtonStatus = useCallback(() => {


        // Check if required fields are filled
        const filled = isRequiredFieldsFilled(renderingArray);
        const hasErrors = Object.keys(errors).length > 0;
        // Disable button if NOT filled
        setIsDisabled(!filled || hasErrors)

    }, [renderingArray])


    function isFormNested() {
        //Check if the renderingArray is null,undefinrd , empty  or  check its an array
        if (!renderingArray || Array.isArray(renderingArray)) {
            // set its an not a nested array -  false
            setIsNested(false);
            return;
        }

        // Check if the renderingArray is a object then it's a  nested Structure
        if (typeof renderingArray === "object") {
            // Get all values from the object  and store them in the array
            const values = Object.values(renderingArray);

            // Check if values array is not empty
            const hasValues = values.length > 0;

            //  Check if every value is an array
            const everyValueIsArray = values.every(value => Array.isArray(value));

            // Check Both must be true
            const allValuesAreArrays = hasValues && everyValueIsArray;

            // if all values are  arrays ,then its nested Structure
            setIsNested(allValuesAreArrays);
        } else {
            // then its an array (NOt Nested Structure)
            setIsNested(false);
        }
    }

    useEffect(() => {
        // Check if form is nested form
        isFormNested()

        // Disabled Submit/Next button based on filled forms
        updateSubmitButtonStatus()
    }, [renderingArray])


    // console.log(renderingArray,isNested,'questions detail')

    return (
        <div
            className={`${darkMode ? "bg-gray-600 text-white" : "bg-white text-gray-900"
                } py-8 px-4 rounded-lg shadow-lg w-full transition-colors`}
        >
            <div className="max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-2xl font-bold mb-6">{sectionTitle}</h2>
                {/* Form */}
                <form
                    className={`${darkMode ? "bg-gray-800 shadow-lg text-white" : "bg-white shadow-md"
                        } p-6 rounded-lg transition-colors`}
                    onSubmit={getData}
                >
                    {isNested === true ? (
                        <NestedForm
                            nestedData={renderingArray}
                            section={currentForm}
                            labelFormatter={(key) => getLabel(currentForm, key)}
                            inputChange={inputChange}
                        />
                    ) : (
                        <RenderingBasicForm
                            questions={
                                Array.isArray(renderingArray)
                                    ? renderingArray
                                    : Object.values(renderingArray || {})
                            }
                            inputChange={inputChange}
                            section={currentForm}
                            errors={errors} // error
                            labelFormatter={(key) => getLabel(currentForm, key)}
                        //  Ensure it's null if undefined
                        />
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6 relative">
                        {/* Previous Button */}
                        {submittedFormCount > 1 && (
                            <button
                                type="button"
                                onClick={goBack}
                                className={`${darkMode
                                    ? "bg-blue-500 hover:bg-blue-900 text-white"
                                    : "bg-red-600 hover:bg-rose-400 text-white"
                                    } absolute left-0 px-6 py-2.5 rounded-md font-medium cursor-pointer`}
                            >
                                Previous
                            </button>
                        )}
                        {/* Next / Submit */}
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={`  px-6 py-2.5 rounded-md font-medium transition-colors text-white cursor-pointer
                         ${isDisabled ? "bg-gray-400 cursor-not-allowed" : darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"}  
                          `}>
                            {isFinalSection ? "Submit" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default FormContainer;
