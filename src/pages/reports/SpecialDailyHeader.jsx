import React from "react";
import { StyleSheet, View, Text } from "@react-pdf/renderer";

const borderColor = "#000";
const styles = StyleSheet.create({
  // Row header
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
  },
  // Cell
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },

  // Text ภายใน cell
  tableCell: {
    fontSize: 12,
  },
  colSpan2: {
    width: "75%",
  },
  rowSpan: {
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    height: 48,
  },
});
export default function SpecialDailyHeader({ tableHeadData, subHeader }) {
  return (
    <>
      {/* header */}
      <View style={styles.tableRowHeader}>
        {/* <View style={[styles.tableCol, styles.colSpan2]}>
          <Text style={styles.tableCell}>Description</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={styles.tableCell}>Qty</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={styles.tableCell}>Rate</Text>
        </View>
        <View style={[styles.tableCol]}>
          <Text style={styles.tableCell}>Amount</Text>
        </View> */}
        
      </View>
      {/* subheader */}
      <View style={styles.tableRowHeader}>
        <View style={[styles.tableCol]}>
          <Text style={styles.tableCell}>ประกันสังคม</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>กองทุน</Text>
        </View>
      </View>
    </>
  );
}
