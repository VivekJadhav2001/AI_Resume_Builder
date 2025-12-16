import api from "../api/axios.js"; // ✅ USE YOUR INSTANCE

export async function enhanceText(inputText, maxLength = 800, minLength = 300) {
  try {
    const res = await api.post("/api/ai/enhance-text", {
      inputText,
      maxLength,
      minLength,
    });

    return res.data.text; // ✅ ALWAYS string
  } catch (err) {
    console.error("AI error:", err);
    return ""; // ✅ NEVER return object
  }
}