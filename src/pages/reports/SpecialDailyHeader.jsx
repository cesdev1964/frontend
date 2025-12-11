import React from "react";
import { StyleSheet, View, Text, Font } from "@react-pdf/renderer";

Font.registerHyphenationCallback((word) => {
  return word.split("");
});

const styles = StyleSheet.create({
  // Row header
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#DCDCDC",
  },
  // Cell
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottom: "none",
    padding: 5,
  },
  tableColSpanborder: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  nomalCol: {
    width: "100px",
  },

  subHeaderCol: {
    width: "60px",
  },
  narrowCol: {
    width: "70px",
  },

  runningNoCol: {
    width: "50px",
  },
  wideCol: {
    width: "160px",
  },

  // Text ภายใน cell
  tableCell: {
    fontSize: 8,
    maxWidth: "100%",
    paddingLeft: "8px",
    // textAlign:"center"
  },
  tableCellForSub: {
    fontSize: 8,
    maxWidth: "100%",
    textAlign: "center",
  },
  colSpan2: {
    width: "180px",
  },
  rowSpan: { height: 60 }, // ยาว 2 แถว
  normalRow: { height: 30 },
  subNormalRow: { height: 60 },
});
export default function SpecialDailyHeader({ tableHeadData, subHeader }) {
  return (
    <>
      {/* header */}
      <View style={styles.tableRowHeader}>
        {/* {tableHeadData && tableHeadData.map((item, i) => (
          <View style={[styles.tableCol]} key={i}>
            <Text style={styles.tableCell}>{item.headerName}</Text>
          </View>
        ))} */}
        <View style={[styles.runningNoCol, styles.tableCol, styles.normalRow]}>
         
        </View>
        <View style={[styles.wideCol, styles.tableCol, styles.normalRow]}>
          
        </View>
        <View style={[styles.nomalCol, styles.tableCol, styles.normalRow]}>
        
        </View>
        <View style={[styles.nomalCol, styles.tableCol, styles.normalRow]}>
         
        </View>
        <View style={[styles.nomalCol, styles.tableCol, styles.normalRow]}>
         
        </View>
        <View style={[styles.narrowCol, styles.tableCol, styles.normalRow]}>
        
        </View>
        <View style={[styles.nomalCol, styles.tableCol, styles.normalRow]}>
      
        </View>
        <View style={[styles.narrowCol, styles.tableCol, styles.normalRow]}>
          
        </View>
        <View style={[styles.nomalCol, styles.tableCol, styles.normalRow]}>
         
        </View>
        <View style={[styles.narrowCol, styles.tableCol, styles.normalRow]}>
         
        </View>
        <View
          style={[styles.colSpan2, styles.tableColSpanborder, styles.normalRow]}
        >
          <Text style={styles.tableCellForSub}>ค่าดำเนินการ</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol, styles.normalRow]}>
      
        </View>
      </View>
      {/* subheader */}
      <View style={styles.tableRowHeader}>
        {/* {subHeader &&
          subHeader.map((item, i) => (
            <View style={[styles.tableCol]} key={i}>
              <Text style={styles.tableCell}>{item}</Text>
            </View>
          ))} */}

        {/* sub head table */}
        <View style={[styles.runningNoCol,styles.tableCol]}>
          <Text style={styles.tableCell}>no.</Text>
        </View>
        <View style={[styles.wideCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ชื่อ</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ตำแหน่ง</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>เวลาทำงาน</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ค่าใช้จ่าย</Text>{" "}
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>รวม</Text>{" "}
          <Text style={styles.tableCell}>(ชม.)</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>อัตราค่าจ้าง</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ค่าจ้าง</Text>
          <Text style={styles.tableCell}>(บาท)</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ประกันสังคม</Text>
          <Text style={styles.tableCell}>5%</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ค่าจ้าง</Text>
          <Text style={styles.tableCell}>(บาท)</Text>
        </View>
        <View
          style={[styles.subHeaderCol, styles.tableCol, styles.subNormalRow]}
        >
          <Text style={styles.tableCellForSub}>ประกันสังคม</Text>
          <Text style={styles.tableCellForSub}>10%</Text>
        </View>
        <View
          style={[styles.subHeaderCol, styles.tableCol, styles.subNormalRow]}
        >
          <Text style={styles.tableCellForSub}>กองทุนทดแทน</Text>
          <Text style={styles.tableCellForSub}>0.5%</Text>
        </View>
        <View
          style={[styles.subHeaderCol, styles.tableCol, styles.subNormalRow]}
        >
          <Text style={styles.tableCellForSub}>ดำเนินการ</Text>
           <Text style={styles.tableCellForSub}>12%</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>ค่าสุทธิ</Text>
          <Text style={styles.tableCell}>(บาท)</Text>
        </View>
      </View>
    </>
  );
}
