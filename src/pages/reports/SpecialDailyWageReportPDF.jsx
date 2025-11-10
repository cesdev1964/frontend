import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";

export default function SpecialDailyWageReportPDF() {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>รายงานสรุปค่าแรงรายวันพิเศษ</Text>
          <Text>
            ชื่อโครงการ: อาคารโรงงาน 5 บริษัท ไอ.พี.วัน จำกัด (IPONE66)
          </Text>
        </View>

        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>

        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
