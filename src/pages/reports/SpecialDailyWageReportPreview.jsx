import { PDFViewer } from "@react-pdf/renderer";
import SpecialDailyWageReportPDF from "./SpecialDailyWageReportPDF";

export default function SpecialDailyWageReportPreview() {
  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer
        style={{
          height: "100%",
          aspectRatio: "1/1",
          width: "100%",
        }}
      >
        <SpecialDailyWageReportPDF/> 
        {/* แปลง โค้ด treact -> pdf form */}
      </PDFViewer>
    </div>
  );
}
