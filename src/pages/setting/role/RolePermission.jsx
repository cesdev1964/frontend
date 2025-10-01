// src/pages/Home.jsx
import { useState } from "react";
import { useTitle} from "../../../hooks/useTitle"
import Swal from "sweetalert2";
import HeaderPage from "../../../components/HeaderPage";


export default function RolePermission({ title }) {
  useTitle(title);
  // href="/settings"
  // href="/settings/role
  return (
    <div className="container py-4 min-vh-90 d-flex flex-column">
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/settings">ตั้งค่า</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/settings/role">จัดการข้อมูลบทบาท</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
       <HeaderPage pageName={title} />
    </div>
  );
}
