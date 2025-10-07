// src/pages/Home.jsx
import { useState } from "react";
import { useTitle} from "../../../hooks/useTitle"
import Swal from "sweetalert2";
import HeaderPage from "../../../components/HeaderPage";
import { Link } from "react-router-dom";


export default function RolePermission({ title }) {
  useTitle(title);
  // href="/settings"
  // href="/settings/role
  return (
    <div className="container py-4 min-vh-90 d-flex flex-column">
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
       <HeaderPage pageName={title} />
    </div>
  );
}
