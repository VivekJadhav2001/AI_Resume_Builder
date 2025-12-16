import { configureStore } from "@reduxjs/toolkit";
import formData from '../features/formDataSlice'
import theme from '../features/themeSlice'


export const store = configureStore({reducer : {formData : formData, theme : theme}})