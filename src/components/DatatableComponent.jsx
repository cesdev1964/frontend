import "../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import { useRef, useEffect } from "react";

export default function DataTableComponent({
  data,
  column,
  onAction,
  tableRef,
  tableHead,
}) {
//   const tableRef = useRef(null);
  useEffect(() => {
    if (data) {
      GetDataTable();
    }
  }, [data,column,onAction]);

  const GetDataTable = () => {
    $(tableRef.current).DataTable({
      data: data,
      destroy: true,
      responsive: true,
      paging: true,
      searching: true,
      autoWidth: true,
      language: {
        decimal: "",
        emptyTable: "ไม่มีข้อมูลในตาราง",
        info: "แสดง _START_ ถึง _END_ จาก _TOTAL_ รายการ",
        infoEmpty: "แสดง 0 ถึง 0 จาก 0 รายการ",
        infoFiltered: "(กรองจาก _MAX_ รายการทั้งหมด)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "แสดง _MENU_ รายการ",
        loadingRecords: "กำลังโหลด...",
        processing: "กำลังประมวลผล...",
        search: "ค้นหา:",
        zeroRecords: "ไม่พบข้อมูลที่ตรงกัน",
      },
      columns: column.map((col) => ({
        title: col.title,
        data: col.data,
        orderable: col.orderable ?? true,
        render: col.render,
      })),
      dom:
        window.innerWidth <= 570
          ? '<"top"lf>rt<"bottom"ip><"clear">'
          : '<"top"lf>rt<"bottom"ip><"clear">',
    });
    $(tableRef.current).on("click", "[data-action]", function () {
      const action = $(this).data("action");
      const rowId = $(this).data("id");
      if (onAction) onAction(action, rowId);
    });

    return () => {
      table.destroy(true);
    };
  };

  return (
    <>
      <div className="mt-4">
        <table
          ref={tableRef}
          className="table table-striped"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              {tableHead.map((row) => (
                <th
                  key={row.index}
                  style={{
                    background: "#ffe8da",
                    fontWeight: "600",
                    padding: "12px 8px",
                  }}
                >
                  {row.colName}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
