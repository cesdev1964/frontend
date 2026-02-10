import React, { useState, useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme

export default function QuillToolbar(value = "", placeholder = "", onChange) {
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = ["bold", "italic", "underline", "strike", "link"];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  useEffect(() => {
    //มี component quill
    if (quill) {
      if (value) {
        if (quill.root.innerHTML != value) {
          const handler = () => {
            if (typeof onChange === "function") {
              onChange(quill.root.innerHTML);
            }
          };
          quill.on("text-change", handler);
          return () => quill.off("text-change", handler);
        }
      }
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && value && quill.root.innerHTML !== value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill,value]);

  return <div className="answer-txt h-full" ref={quillRef} />;
}
