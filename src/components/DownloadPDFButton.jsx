import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function DownloadPDFButton() {
  const navigate = useNavigate();
  //  const downloadPDF = async () => {...};
 const handleOpenPreview = ()=>{
    navigate("/reports/specialdailywagereport/downloadPDF")
 }
  return ( 
    <div>
      <button
        className="btn btn-primary"
        title="export PDF"
        onClick={handleOpenPreview}
      >
        <i className="bi bi-file-earmark-pdf-fill"></i>export <span>PDF</span>
      </button>
    </div>
  );
}
