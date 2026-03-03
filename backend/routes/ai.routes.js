import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/enhance-text", async (req, res) => {
  try {
    // const inputText = "I am a frontend dev, fresher";
    // const minLength = 100;
    // const maxLength = 250;

    const {inputText,maxLength,minLength} = req.body
    const asBulletPoints = false;

    if (!inputText || !inputText.trim()) {
      return res.status(400).json({ error: "Input cannot be empty." });
    }

    const bulletRules = asBulletPoints
      ? `
- Format the final output as clean professional bullet points.
- Each bullet must be a single line, no numbering.
- Keep bullets action-driven and resume-style.
`
      : "";

    const prompt = `
Rewrite and enhance the following text so that the final output is
professional, concise, resume-ready, and strictly between
${minLength} and ${maxLength} characters.

- If the text is too short, expand it meaningfully.
- If the text is too long, summarize it intelligently.
- Return ONLY the improved text with no additional commentary.
${bulletRules}

Text: "${inputText.trim()}"
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a professional resume writer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response?.data?.choices?.[0]?.message?.content;

    if (!aiText) {
      return res.status(500).json({ error: "AI returned empty response." });
    }

    const finalText = aiText.trim();

    if (finalText.length < minLength || finalText.length > maxLength) {
      return res.status(422).json({
        error: `AI output must be between ${minLength}-${maxLength} characters.`,
      });
    }

    return res.json({
      success: true,
      text: finalText,
      length: finalText.length,
    });
  } catch (err) {
    console.error("EnhanceText Error:", err?.response?.data || err.message);

    return res.status(500).json({
      error: "AI enhancement failed. Please try again.",
    });
  }
});

export default router;