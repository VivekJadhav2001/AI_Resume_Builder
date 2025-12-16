// import React, { useEffect, useState, useMemo } from "react";
// import { useSelector } from "react-redux";

// function ProgressBar({ submittedFormCount }) {
//   const allForms = useSelector((state) => state.formData);
//   const [allFormCount, setAllFormCount] = useState(0);

//   // Get total number of forms
//   useEffect(() => {
//     if (allForms) {
//       const allFormsInArray = Object.keys(allForms);
//       const formCount = allFormsInArray.length - 2;
//       setAllFormCount(formCount);
//     }
//   }, [allForms]);

//   // Create circle + line structure
//   const steps = useMemo(() => {
//     const elements = [];
//     for (let i = 1; i <= allFormCount; i++) {
//       elements.push(
//         <div
//           key={`circle-${i}`}
//           aria-label={`Step ${i}`}
//           className={`w-9 h-9 rounded-full flex justify-center items-center text-base font-semibold transition-all duration-300
//             ${i <= submittedFormCount ? "bg-green-500 text-white scale-110" : "bg-gray-300 text-gray-700"}
//           `}
//         >
//           {i}
//         </div>
//       );

//       if (i < allFormCount) {
//         elements.push(
//           <div
//             key={`line-${i}`}
//             className={`flex-1 h-1 transition-all duration-300
//               ${i < submittedFormCount ? "bg-green-500" : "bg-gray-300"}
//             `}
//           ></div>
//         );
//       }
//     }
//     return elements;
//   }, [allFormCount, submittedFormCount]);


//   return (
//     <div className="w-full flex items-center gap-3 mt-16">
//         {/* React will render the elements from the array if array is of ui elements */}
//       {steps}
//     </div>
//   );
// }

// export default ProgressBar;

import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

function ProgressBar({ submittedFormCount }) {
  const allForms = useSelector((state) => state.formData);
  const [allFormCount, setAllFormCount] = useState(0);

  // Get total number of forms
  useEffect(() => {
    if (allForms) {
      const allFormsInArray = Object.keys(allForms);
      const formCount = allFormsInArray.length - 2;
      setAllFormCount(formCount);
    }
  }, [allForms]);

  // Create circle + line structure
  const steps = useMemo(() => {
    const elements = [];
    for (let i = 1; i <= allFormCount; i++) {
      elements.push(
        <div key={`circle-${i}`} className="relative flex items-center justify-center">
          {/* Ripple circles that blink - only on current active step */}
          {i === submittedFormCount && (
            <>
              <div className="absolute w-9 h-9 rounded-full bg-blue-500 opacity-75 animate-ping"></div>
              <div className="absolute w-12 h-12 rounded-full bg-blue-400 opacity-50 animate-pulse"></div>
              <div className="absolute w-16 h-16 rounded-full bg-blue-300 opacity-25 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
          
          {/* Main circle */}
          <div
            aria-label={`Step ${i}`}
            className={`relative w-9 h-9 rounded-full flex justify-center items-center text-base font-semibold transition-all duration-300 z-10
              ${i < submittedFormCount ? "bg-green-500 text-white scale-110" : i === submittedFormCount ? "bg-blue-500 text-white scale-110" : "bg-gray-300 text-gray-700"}
            `}
          >
            {i}
          </div>
        </div>
      );

      if (i < allFormCount) {
        elements.push(
          <div
            key={`line-${i}`}
            className={`flex-1 h-1 transition-all duration-300
              ${i < submittedFormCount ?  "bg-green-500":"bg-gray-500" }
            `}
          ></div>
        );
      }
    }
    return elements;
  }, [allFormCount, submittedFormCount]);


  return (
    <div className="w-full flex items-center gap-3 mt-16">
        {/* React will render the elements from the array if array is of ui elements */}
      {steps}
    </div>
  );
}

export default ProgressBar;