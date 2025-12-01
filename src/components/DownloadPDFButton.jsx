import { useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import SpecialDailyWageReportPDF from "../pages/reports/SpecialDailyWageReportPDF";
import { invoiceData, ReportTableMockData } from "../Data";
import { useState } from "react";

export default function DownloadPDFButton() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //  const downloadPDF = async () => {...};
  const handleOpenPreview = () => {
    navigate("/reports/specialdailywagereport/downloadPDF");
  };

  const handleOpenPDFPreview = async () => {
    setIsLoading(true);
    if(!invoiceData){
      setIsLoading(false);
      console.log("Open pdf preview fail , data not found");
      return ;
    }
    try {
      const blob = await pdf(<SpecialDailyWageReportPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      setIsLoading(false)
      window.open(url, "specialdailywagereport_ipone66.pdf");
    } catch (error) {
      setIsLoading(false)
      console.log("Open pdf preview fail , please try again", error);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary downloadBtn"
        title="export PDF"
        onClick={handleOpenPDFPreview}
      >
        <i className="bi bi-file-earmark-pdf-fill"></i>export <span>PDF</span>
      </button>
    </div>
  );
}
