import { createSlice } from "@reduxjs/toolkit";
import { encryptData, decryptData } from "../utils/encryption/encryptAndDecrypt";


// Key we want to use in localStorage (will be encrypted)
const STORAGE_KEY = "darkMode";



function  encryptTheme(){
  // Encrypt the key
  const encryptedKey = encryptData(STORAGE_KEY);
  
  // Get value from localStorage
  const encryptValue = localStorage.getItem(encryptedKey);

  // if nothing  is saved yet  default false
  if(!encryptValue) return false;

  // Get value from localStorage
  const decryptValue = decryptData(encryptValue)

  // Convert string to boolean
  return decryptValue === "true";
}



// Initial state
const initialTheme = encryptTheme();

// Create slice
const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    toggleTheme(state) {
      const newTheme = !state;

      // Encrypt key and value
      const encryptedKey = encryptData(STORAGE_KEY);
      const encryptedValue = encryptData(newTheme.toString());

      // Save encrypted data to localStorage
      localStorage.setItem(encryptedKey, encryptedValue);


      return newTheme;
    }
  }
});



export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;



