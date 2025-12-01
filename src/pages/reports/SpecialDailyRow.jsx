import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import "../../util/fontRegister";

export default function SpecialDailyRow({ items }) {
  const borderColor = "#3778C2";
  const styles = StyleSheet.create({
    tableRow: {
      flexDirection: "row",
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
  });

  return (
    <View>
      {items.map((item, i) => (
        <View style={styles.tableRow} key={i}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.desc}</Text>
          </View>

          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.qty}</Text>
          </View>

          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.rate}</Text>
          </View>

          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {(item.qty * item.rate).toFixed(2)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
