import React from "react";
import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";
import SpecialDailyTable from "./SpecialDailyTable";
import { invoiceData, ReportTableMockData } from "../../Data";
import '../../util/fontRegister';

// ข้อมูลภายใน pdf ทำการจัดเรียนตรงนี้
export default function SpecialDailyWageReportPDF() {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      padding: 10,
      fontFamily:"NotoSansThaiRegular"
    },
    section: {
      marginBottom: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent:"flex-end"
    },
    header: {
      fontSize: 30,
      fontWeight: "bold"
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
    },
    document: {
      fontSize: 12,
      marginBottom: 10,
      display: "flex",
      flexDirection: "column",
    },
    lineSection: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginBottom: 10,
    },
  });
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>ใบสรุปค่าแรงรายวันพิเศษ</Text>
        </View>
        <View style={styles.lineSection}></View>
        <View
          style={{
            display: "flex",
            flexDirection:"row",
            justifyContent: "space-between",
            marginTop: "25px",
            paddingLeft: 20,
          }}
        >
          <Text style={styles.title}>
            ชื่อโครงการ: อาคารโรงงาน 5 บริษัท ไอ.พี.วัน จำกัด (IPONE66)
          </Text>
          <Text style={styles.title}>แผ่นที่ : 1/1</Text>
        </View>
        {/* table */}
          <SpecialDailyTable data ={invoiceData}/>
        <View style={{ display: "flex", justifyContent: "flex-start",flexDirection:"row" }}>
          <View style={{marginRight:"20%",paddingLeft:"10px"}}>
            <Text style={styles.document}>ผู้จัดทำ..................</Text>
            <Text style={styles.document}>วันที่..../..../....</Text>
          </View>
          <View style={{marginRight:"20%"}}>
            <Text style={styles.document}>ผู้ตรวจสอบ..................</Text>
            <Text style={styles.document}>วันที่..../..../....</Text>
          </View>
          <View>
            <Text style={styles.document}>ผู้อำนวยการฝ่าย..................</Text>
            <Text style={styles.document}>วันที่..../..../....</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
