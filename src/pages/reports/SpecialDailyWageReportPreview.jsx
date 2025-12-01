import { PDFViewer } from "@react-pdf/renderer";
import SpecialDailyWageReportPDF from "./SpecialDailyWageReportPDF";

export default function SpecialDailyWageReportPreview() {
  return (
    <>
      <PDFViewer
      showToolbar={true}
      width="100%"
      height="800px"
        // style={{
        //   height: "100%",
        //   // aspectRatio: "1/1",
        //   width: "100%",
        // }}
      >
        <SpecialDailyWageReportPDF/> 
        {/* แปลง โค้ด treact -> pdf form */}
      </PDFViewer>
    </>
  );
}
