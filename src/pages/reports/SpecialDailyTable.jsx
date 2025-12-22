import React from "react";
import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";
import SpecialDailyHeader from "./SpecialDailyHeader";
import SpecialDailyRow from "./SpecialDailyRow";
import "../../util/fontRegister";
import SpecialDailyFooter from "./SpecialDailyFooter";
import SpecialDailyTotalRow from "./SpecialDailyTotalRow";

export default function SpecialDailyTable({ data }) {
  const items = [
    { desc: "งานก่ออิฐ", qty: 10, rate: 200 },
    { desc: "งานปูนฉาบ", qty: 5, rate: 350 },
    { desc: "งานสี", qty: 3, rate: 500 },
    { desc: "งานเชื่อม", qty: 3, rate: 500 },
    { desc: "งานหล่อ", qty: 3, rate: 400 },
  ];
  const styles = StyleSheet.create({
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 24,
      marginBottom: 20,
      borderWidth: 1,
      fontFamily: "NotoSansThaiRegular",
      color: "#000",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
  });
  if (!data || !data.items) {
  }

  console.log("data to render in pdf :", data);
  const tableHeadData = data.headers;
  const subHeader = data.subHeaders;
  return (
    <View style={styles.tableContainer}>
      {/* Header ตาราง */}
      <View style={styles.table}>
        <SpecialDailyHeader tableHeadData={tableHeadData} subHeader={subHeader}/>
        <SpecialDailyRow items={items} />
        <SpecialDailyTotalRow/>
        <SpecialDailyFooter/>
      </View>
    </View>
  );
}
