import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { enhanceText } from "../utils/aiApi/enhanceText";

const TextEditor = ({ item, section, inputChange, subsectionKey }) => {
  const editorRef = useRef(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const darkMode = useSelector((state) => state.theme);
  const currentForm = useSelector((state) => state.formData.currentForm);
  const [isBulletPoint, setIsBulletPoint] = useState(false);


  // Add validation in editor
  const validateEditorContent = (content) => {
    setError("");

    const text = content.replace(/<[^>]*>/g, "").trim();
    // CHECK FOR TEXT
    if (!item.canSkip && !text) {
      setError("This field is required");
      return false;
    }
    //CHECK FOR MINIMUM LENGTH
    if (item.minLength && text.length < item.minLength) {
      setError(`Minimum ${item.minLength} characters required`);
      return false;
    }
    //CHECK FOR MAXIMUM LENGTH
    if (item.maxLength && text.length > item.maxLength) {
      setError(`Maximum ${item.maxLength} characters allowed`);
      return false;
    }

    return true;
  };


  // On change of editor text this function checks wheather text meets the Max,Min rule
  const handleEditorChange = (content) => {
    // console.log(content,"CONTANT FROM TEXT EDITOR")
    validateEditorContent(content);
    inputChange(content, item, subsectionKey);
  };

  // Call ai to optimise the users text withing max & min charecters length
  const handleAIGenerate = async () => {
    setError("");
    try {
      setIsAILoading(true);

      if (!editorRef.current) {
        setError("Editor not ready.");
        return;
      }

      const rawText = editorRef.current.getContent({ format: "text" }) || "";
      console.log(rawText)

      // // Replaces users text to optimised text from AI
      // let aiSuggestionResult = "";

      // try {
      //   // enhanceText now throws on error and returns string on success
      //   aiSuggestionResult = await enhanceText(rawText, item.maxLength, item.minLength);

      // } catch (err) {
      //   // show a friendly message and also log the underlying error
      //   console.error("AI call failed:", err.message || err);
      //   return;
      // }
      // // setContent is synchronous-ish but returns nothing — still await in case plugin returns a promise
      // await editorRef.current.setContent(aiSuggestionResult);

      const aiSuggestionResult = await enhanceText(
        rawText,
        item.maxLength,
        item.minLength
      );

      if (!aiSuggestionResult || typeof aiSuggestionResult !== "string") {
        setError("AI could not generate text");
        return;
      }

      editorRef.current.setContent(aiSuggestionResult);


      // update Redux using the same inputChange function you already use.
      // Make sure your inputChange signature matches: (value, id, subsectionKey)
      inputChange(aiSuggestionResult, item.id, subsectionKey);

      // Optional: force validation/run the handler that your editor change normally uses:
      handleEditorChange(aiSuggestionResult);

    } finally {
      setIsAILoading(false);
    }
  };



  // Get charecters count present in editor
  const getCharCount = () => {
    return editorRef.current
      ? editorRef.current.getContent({ format: "text" }).trim().length
      : 0;
  };



  useEffect(() => {
    setIsBulletPoint(["projects", "experience"].includes(currentForm));
  }, [currentForm]);



  return (
    <div className="relative w-full col-span-2">
      {item.aiEnabled && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isAILoading}
            className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} px-3 py-1.5 text-sm text-white rounded-lg transition-colors`}
          >
            {isAILoading ? "Generating..." : "Optimise from AI"}
          </button>
        </div>
      )}

      <div className="relative w-full" style={{ height: 300 }}>

        {/* Skeleton Loader (Only Visible Before Load) */}
        {!isEditorReady && (
          <div className="absolute inset-0 rounded-lg bg-gray-200 animate-pulse z-10"></div>
        )}

        {/* Editor (Fades in)**/}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isEditorReady ? "opacity-100" : "opacity-0"
            }`}
        >
          <Editor
            key={isBulletPoint}
            apiKey="3e47lgecl1k3u0zpkwjj73r3dlu5janeact3c0wop41d4sfg"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              setIsEditorReady(true);
            }}
            value={item.answer || ""}
            onEditorChange={handleEditorChange}
            init={{
              width: "100%",
              height: 300,
              menubar: false,
              statusbar: false,
              plugins:
                "lists advlist autolink link image preview anchor searchreplace code fullscreen table wordcount",
              toolbar: isBulletPoint
                ? "undo redo | formatselect | bold underline | bullist"
                : "undo redo | formatselect | bold underline",
            }}
          />
        </div>

      </div>


      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {item.maxLength && (
        <p className="text-gray-500 text-xs mt-1">
          {getCharCount()}/{item.maxLength} characters
        </p>
      )}
    </div>
  );
};

export default TextEditor;
