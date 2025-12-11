import React from "react";
import { StyleSheet, View, Text, Font } from "@react-pdf/renderer";
export default function SpecialDailyTotalRow() {
  Font.registerHyphenationCallback((word) => {
    return word.split("");
  });
  const styles = StyleSheet.create({
    // Row header
    tableRow: {
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
      padding: 5,
    },
    tableColSpanborder: {
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },

    narrowCol: {
      width: "57px",
    },

    // Text ภายใน cell
    tableCell: {
      fontSize: 8,
      maxWidth: "100%",
      paddingLeft: "8px",
    },
    textCenter: {
      fontSize: 8,
      maxWidth: "100%",
      textAlign: "center",
    },
    totalText: {
      fontWeight: "bold",
    },
    totalColSpan: {
      width: "690px",
    },
    spaceColSpan: {
      width: "146px",
    },
  });

  return (
    <>
      <View style={styles.tableRow}>
        <View style={[styles.totalColSpan, styles.tableCol]}>
          <Text style={styles.textCenter}>รวม</Text>
        </View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={styles.tableCell}>9120.00</Text>
        </View>
        <View style={[styles.spaceColSpan, styles.tableCol]}></View>
        <View style={[styles.narrowCol, styles.tableCol]}>
          <Text style={[styles.tableCell, styles.totalText]}>11280.00</Text>
        </View>
      </View>
    </>
  );
}
