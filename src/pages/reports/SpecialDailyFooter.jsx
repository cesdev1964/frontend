import React from "react";
import { StyleSheet, View, Text, Font } from "@react-pdf/renderer";

export default function SpecialDailyFooter() {
  Font.registerHyphenationCallback((word) => {
    return word.split("");
  });
  const styles = StyleSheet.create({
    // Row header
    tableRow: {
      flexDirection: "row",
      backgroundColor: "#fff",
    },
     tableRowTotal: {
      flexDirection: "row",
      backgroundColor: "#F5F5F5",
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


    narrowCol: {
      width: "57px",
    },
    wideCol: {
      width: "893px",
    },

    tableCell: {
      fontSize: 8,
      maxWidth: "100%",
      textAlign:"center"
    },
    headText: {
      textAlign:"left",
      fontSize: 10,
      maxWidth: "100%",
      marginLeft:"93%",
    },
    totalText: {
      fontSize: 12,
      fontWeight:"bold"
    },
    totalNumber: {
      fontSize: 10,
      fontWeight:"bold"
    },
  });

  return (
    <>
      <View style={styles.tableRow}>
        <View style={[styles.wideCol, styles.tableCol]}>
          <Text style={styles.headText}>ค่าแรง</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>9120.00</Text>
        </View>
      </View>
       <View style={styles.tableRow}>
        <View style={[styles.wideCol, styles.tableCol]}>
          <Text style={styles.headText}>โอที</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>9120.00</Text>
        </View>
      </View>
       <View style={styles.tableRowTotal}>
        <View style={[styles.wideCol, styles.tableCol]}>
          <Text style={[styles.headText,styles.totalText]}>รวมทั้งสิ้น</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={[styles.tableCell,styles.totalNumber]}>9120.00</Text>
        </View>
      </View>
    </>
  );
}
