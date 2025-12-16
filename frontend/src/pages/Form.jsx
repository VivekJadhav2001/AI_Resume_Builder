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
    const darkMode = useSelector((state) => state.theme); // Get dark mode from Redux
    const LazyFormImageComponent = lazy(() => import("../components/FormImage"));



    // If page refreshes take stored data from local storage and update the store
    useEffect(() => {

        const locallyStoredUserData = localStorage.getItem("userData");

        if (locallyStoredUserData) {
            try {
            const localStorageData = JSON.parse(locallyStoredUserData);
            dispatch(updateStoreData(localStorageData));
            } catch (error) {
              console.error("Corrupted localStorage userData:", error);
              localStorage.removeItem("userData");
            }
        }

        const submittedFormCountStoredInLocal = Number(localStorage.getItem("submittedFormCount"));

        if (submittedFormCountStoredInLocal) {
            setSubmittedFormCount(submittedFormCountStoredInLocal);
        }

    }, []);


    return (

        <div
            className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                } w-full h-screen flex flex-col items-center pt-6 p-4 transition-colors`}
        >
            {/* Progress Bar on TOP */}
            <div className="w-full max-w-xl mb-4">
                <ProgressBar
                    submittedFormCount={submittedFormCount}
                    darkMode={darkMode}
                />
            </div>

            {/* Render Forms */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-center gap-8 mt-8">
                {/* Left Image */}
                <Suspense fallback={<CircularLoader />}>
                    <div className="w-60 h-60 md:w-84 md:h-84 flex-shrink-0">
                        <LazyFormImageComponent />
                    </div>
                </Suspense>

                {/* Right Form */}
                <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-2xl h-[70vh] overflow-y-auto px-2">
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
                theme="colored"
                transition={Bounce}
            />
        </div>

    );
}

export default Form;
