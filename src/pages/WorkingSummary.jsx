// src/pages/Home.jsx
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useTitle } from "../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../components/HeaderPage";

export default function WorkingSummary({ title }) {
  useTitle(title);

  return (
    <div>
       <HeaderPage pageName={title} />
    </div>
  );
}
