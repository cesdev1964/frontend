import "../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import { useRef, useEffect } from "react";
import LoadingSpin from "./loadingSpin";

export default function DataTableComponent({
  data,
  column,
  onAction,
  tableRef,
  tableHead,
  isLoading = false,
  columnDefs = [],
  // onCheck
}) {
//   const tableRef = useRef(null);
  useEffect(() => {
    if (data) {
      GetDataTable();
    }
  }, [data,column,onAction]);

  // useEffect(()=>{
  //   const table = $(tableRef.current)
  //   table.on("change", "[data-action]", function (e) {
  //     const action = $(this).data("action");
  //     const rowId = $(this).data("id");
  //     if (onCheck) onCheck(action, rowId,e);
  //   });
  //   return ()=>{
  //      table.off("change", "[data-action]");
  //   }
  // },[])

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
      columnDefs: columnDefs,
      columns: column.map((col) => ({
        title: col.title,
        data: col.data,
        orderable: col.orderable ?? true,
        render: col.render,
        className : col.className
      })),
      dom:
        window.innerWidth <= 570
          ? '<"top"lf>rt<"bottom"ip><"clear">'
          : '<"top d-flex justify-content-between"lf>rt<"bottom d-flex justify-content-between"ip><"clear">',
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
                  className="text-center"
                >
                  {row.colName}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        {isLoading&&(<LoadingSpin/>)}
      </div>
    </>
  );
}
