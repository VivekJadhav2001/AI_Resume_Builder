


import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "../constant";
import { useState } from "react";

const ProtectedRoute = ({ route, children }) => {
    // Check if user selected any templates and we have data in local storage
    const [userData] = useState(localStorage.getItem("userData"))

    // Check if all forms filled
    const [isAllFormsFilled] =useState(localStorage.getItem("isAllFormsFilled") === "true"); // STRICT CHECK

    //  Block direct access to FORM & PREVIEW if user didn't select any templates
    if ((route === ROUTES_PATH.FORM_SECTIONS || route === ROUTES_PATH.PREVIEW) && !userData) {
        return <Navigate to={ROUTES_PATH.HOME} replace />;
    }

    console.log(route === ROUTES_PATH.PREVIEW && !isAllFormsFilled,route,!isAllFormsFilled)
    //  Block preview if any form is NOT submitted
    if (route === ROUTES_PATH.PREVIEW && isAllFormsFilled) {
        return <Navigate to={ROUTES_PATH.FORM_SECTIONS} replace />;
    }

    // Allow render
    return children;
};

export default ProtectedRoute;
