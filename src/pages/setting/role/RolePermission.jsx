// src/pages/Home.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useTitle } from "../../../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../../../components/HeaderPage";
import { Link } from "react-router-dom";
import DataTableComponent from "../../../components/DatatableComponent";
import { useRolePermission } from "../../../hooks/rolePermissionStore";
import { useParams } from "react-router-dom";

export const tableHead = [
  { colName: "ลำดับ" },
  { colName: "รหัสสิทธิ์เข้าใช้งาน" },
  { colName: "ชื่อสิทธิ์เข้าใช้งาน" },
  // { index: 4, colName: "การจัดการ" },
];
export default function RolePermission({ title }) {
  const tableRef = useRef();
  useTitle(title);
  const {
    rolePermissiondata,
    rolePermissionisLoading,
    rolePermissionerrorMessage,
    success,
    rolePermissionMessage,
    rolePermissiondataById,
    getRolePermissionByRoleId,
  } = useRolePermission();
  const { roleid } = useParams();
  console.log("roleId from params :", roleid);

  const fetchDataTable = useCallback(async () => {
    try {
      await getRolePermissionByRoleId(roleid);
    } catch (error) {
      alert("ดึงข้อมูลไม่สำเร็จ :", error.message);
    }
  }, [getRolePermissionByRoleId]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  const columnData = [
    {
      data: null,
      title: "ลำดับ",
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "รหัสสิทธิ์เข้าใช้งาน",
      data: "permissionCode",
      orderable: true,
    },

    {
      title: "ชื่อสิทธิ์เข้าใช้งาน",
      data: "permissionName",
      orderable: true,
    },
  ];

  return (
    <div className="container-fluid py-4 min-vh-90 d-flex flex-column">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/settings">ตั้งค่า</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/settings/role">จัดการข้อมูลบทบาท</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName="รายการสิทธ์การใช้งาน" />

      <DataTableComponent
        column={columnData}
        tableRef={tableRef}
        tableHead={tableHead}
        data={rolePermissiondata}
        isLoading={rolePermissionisLoading}
      />
    </div>
  );
}
