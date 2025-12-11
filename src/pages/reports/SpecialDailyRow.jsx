import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import "../../util/fontRegister";

export default function SpecialDailyRow({ items }) {
  Font.registerHyphenationCallback((word) => {
    return word.split("");
  });
  const styles = StyleSheet.create({
    // Row header
    tableRow: {
      flexDirection: "row",
      backgroundColor: "#fff",
    },
    // Cell
    tableCol: {
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderTop: "1px solid #000",
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

    subRowCol: {
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
    totalText: {
      fontWeight: "bold",
    },
    colSpan2: {
      width: "180px",
    },
  
    normalRow: { height: 30 },
  });

  return (
    <>
      <View style={styles.tableRow}>
        {/* {subHeader &&
              subHeader.map((item, i) => (
                <View style={[styles.tableCol]} key={i}>
                  <Text style={styles.tableCell}>{item}</Text>
                </View>
              ))} */}

        {/* sub head table */}
        <View style={[styles.runningNoCol, styles.tableCol]}>
          <Text style={styles.tableCell}>1</Text>
        </View>
        <View style={[styles.wideCol, styles.tableCol]}>
          <Text style={styles.tableCell}>นางมาลี โพธิ์นอก</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>แม่บ้าน</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>วันทำงาน (วัน)</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>-</Text>{" "}
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>12:00</Text>{" "}
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>400.00</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>4800.00</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>(240.00)</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>4560.00</Text>
        </View>
        <View style={[styles.subRowCol, styles.tableCol, styles.normalRow]}>
          <Text style={styles.tableCellForSub}>480.00</Text>
        </View>
        <View style={[styles.subRowCol, styles.tableCol, styles.normalRow]}>
          <Text style={styles.tableCellForSub}>24.00</Text>
        </View>
        <View style={[styles.subRowCol, styles.tableCol, styles.normalRow]}>
          <Text style={styles.tableCellForSub}>576.00</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={[styles.tableCell, styles.totalText]}>5640.00</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.runningNoCol, styles.tableCol]}>
          <Text style={styles.tableCell}>1</Text>
        </View>
        <View style={[styles.wideCol, styles.tableCol]}>
          <Text style={styles.tableCell}>นางมาลี โพธิ์นอก</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>แม่บ้าน</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>วันทำงาน (วัน)</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>-</Text>{" "}
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>12:00</Text>{" "}
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>400.00</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>4800.00</Text>
        </View>
        <View style={[styles.nomalCol, styles.tableCol]}>
          <Text style={styles.tableCell}>(240.00)</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>4560.00</Text>
        </View>
        <View style={[styles.subRowCol, styles.tableCol, styles.normalRow]}>
          <Text style={styles.tableCellForSub}>480.00</Text>
        </View>
        <View style={[styles.subRowCol, styles.tableCol, styles.normalRow]}>
          <Text style={styles.tableCellForSub}>24.00</Text>
        </View>
        <View style={[styles.subRowCol, styles.tableCol, styles.normalRow]}>
          <Text style={styles.tableCellForSub}>576.00</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={[styles.tableCell, styles.totalText]}>5640.00</Text>
        </View>
      </View>
    </>
  );
}
