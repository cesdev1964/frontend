import { PDFViewer } from "@react-pdf/renderer";
import SpecialDailyWageReportPDF from "./SpecialDailyWageReportPDF";

export default function SpecialDailyWageReportPreview() {
  return (
    <>
      <PDFViewer
      showToolbar={true}
      width="100%"
      height="800px"
      >
        <SpecialDailyWageReportPDF/> 
      </PDFViewer>
    </>
  );
}
