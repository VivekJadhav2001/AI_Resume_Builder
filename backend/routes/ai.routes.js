import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/enhance-text", async (req, res) => {
  try {
    const { inputText, maxLength = 800, minLength = 300 } = req.body;

    if (!inputText || !inputText.trim()) {
      return res.status(400).json({ error: "Input cannot be empty" });
    }

    const prompt = `
Rewrite and enhance the following text so that the final output is 
professional, concise, resume-ready, and strictly between 
${minLength} and ${maxLength} characters.

- If the text is too short, expand it meaningfully.
- If the text is too long, summarize it intelligently.
- Return ONLY the improved final text.

Text: "${inputText.trim()}"
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: "You are a professional resume writer." }],
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const aiText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return res.status(500).json({ error: "AI returned empty response" });
    }

    const finalText = aiText.trim();

    if (finalText.length < minLength || finalText.length > maxLength) {
      return res
        .status(422)
        .json({ error: "Text length constraint failed" });
    }

    res.json({ text: finalText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI enhancement failed" });
  }
});

export default router;
