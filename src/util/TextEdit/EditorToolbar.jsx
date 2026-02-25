import React, {useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme

export default function QuillToolbar({ value, placeholder, onChange }) {
  const theme = "snow";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{"align":[]}],
      ["image"]
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "font",
    "header",
    "color",
    "background",
    "list",
    "align",
    "image"
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  useEffect(() => {
    //มี component quill
    if (quill) {
      const handler = () => {
        if (typeof onChange === "function") {
          onChange(quill.root.innerHTML);
        }
      };
      quill.on("text-change", handler);
      return () => quill.off("text-change", handler);
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && value && quill.root.innerHTML !== value) {
      quill.clipboard.dangerouslyPasteHTML(value); //เปลี่ยนค่าที่ส่งมาเป็น html โดย เครื่องมือของ quill แบบพิมพ์และ render ใหม่ จึงต้องใช้ useEf
    }
  }, [quill, value]);

  return <div className="answer-txt h-full" ref={quillRef} />;
}
