// src/pages/Home.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useTitle } from "../../../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../../../components/HeaderPage";
import { Link } from "react-router-dom";
import DataTableComponent from "../../../components/DatatableComponent";
import { useRolePermission } from "../../../hooks/rolePermissionStore";
import { useParams } from "react-router-dom";
import { SubmitOrCancelButton } from "../../../components/SubmitOrCancelBtnForModal";
import { usePermission } from "../../../hooks/permissionStore";
import LoadingSpin from "../../../components/loadingSpin";
import SearchBox from "../../../components/SearchBox";
import {useRole} from "../../../hooks/roleStore";
import SessionExpiryModal from "../../../components/modal/SessionExpiryModal";

export const tableHead = [{ colName: "รหัสสิทธิ์เข้าใช้งาน" }];
export default function RolePermission({ title }) {
  const tableRef2 = useRef();
  const [selectPermission, setSelectPermission] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  useTitle(title);


  
  const {
    rolePermissionisLoading,
    rolePermissiondataById,
    getRolePermissionByRoleId,
    getRolePermission,
    updateRolePermission,
  } = useRolePermission();

  const { getPermission, permissionData } = usePermission();
  const {getRoleByIdData,dataById} = useRole();

  const { roleid } = useParams();

  const fetchDataTable = useCallback(async () => {
    try {
      await getRolePermissionByRoleId(roleid);
      await getRolePermission();
      await getPermission();
      await getRoleByIdData(roleid);
    } catch (error) {
      // alert("ดึงข้อมูลไม่สำเร็จ :", error.message);
      return;
    }
  }, [getRolePermissionByRoleId, getRolePermission,getRoleByIdData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  // การดึงค่าเก็บใน state
  useEffect(() => {
    if (rolePermissiondataById.length > 0) {
      setSelectPermission(
        rolePermissiondataById.map((item) => item.permissionId) ?? []
      );
      if (rolePermissiondataById.length === permissionData.length) {
        setIsSelectAll(true);
      } else {
        setIsSelectAll(false);
      }
    } else {
      setSelectPermission([]);
    }
   if(!dataById) return "";
  }, [rolePermissiondataById, permissionData.length,dataById]);

  //ทำการเก็บค่าเฉยๆ
  const columnData2 = [
    {
      title: "สิทธิ์เข้าใช้งานที่เลือกแล้ว",
      data: "permissionCode",
      orderable: true,
    },
  ];

  const columnDefs = [];

  const handleChangeSelect = (e, permissionId) => {
    if (e.target.checked) {
      setSelectPermission((prev) => {
        if (!prev.includes(permissionId)) {
          return [...prev, permissionId];
        }
        return prev;
      });
    } else {
      setSelectPermission((prev) => prev.filter((id) => id !== permissionId));
    }
    setIsSelectAll(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setIsSelectAll(true);
      setSelectPermission(permissionData.map((item) => item.permissionId));
    } else {
      setIsSelectAll(false);
      const { rolePermissiondataById } = getRolePermissionByRoleId(roleid);
      setSelectPermission(
        rolePermissiondataById.map((item) => item.permissionId) ?? []
      );
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const reqData = {
      permissionIds: selectPermission,
    };
    const { success, rolePermissionerrorMessage } = await updateRolePermission(
      reqData,
      roleid
    );
    if (success) {
      Swal.fire({
        title: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        draggable: true,
        buttonsStyling: "w-100",
      });
      await getRolePermissionByRoleId(roleid);
      setIsLoading(false);
    } else {
      Swal.fire({
        title: "บันทึกข้อมูลไม่สำเร็จ",
        text: rolePermissionerrorMessage,
        icon: "error",
      });
    }
  };

  const ClearInput = () => {
    setSelectPermission([]);
  };

  const filterPermissionSelect = permissionData.filter((item) => {
    if (item.permissionCode.toLocaleLowerCase().includes(search)) {
      return item;
    }
  });

  const filterPermissionTotal = rolePermissiondataById.filter((item) => {
    if (item.permissionCode.includes(search2)) {
      return item;
    }
  });

  return (
    <div>
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
      <HeaderPage pageName={`รายการสิทธ์การใช้งาน -  ${dataById.roleName ?? "..."}`} />

      <div className="container">
        <div className="row g-3">
          <div className="col-lg-6 col-sm-12">
            <div className="mt-4">
              <SearchBox
                onChange={(e) => setSearch(e.target.value)}
                search={search}
                placeholder="ค้นหาสิทธิ์เข้าใช้งาน"
              />
              <div className="table-container-horizontal-scorll table-responsive">
                <table
                  className="table table-striped table-hover text-nowrap"
                  style={{ width: "100%", tableLayout: "fixed" }}
                >
                  <thead className="sticky-top top-0">
                    <tr
                      style={{
                        background: "#ffe8da",
                        fontWeight: "600",
                      }}
                      className="text-center"
                    >
                      <th>สิทธิ์เข้าใช้งาน</th>
                    </tr>
                  </thead>
                  <tbody style={{ position: "relative" }}>
                    {isLoading && <LoadingSpin />}
                    <tr>
                      <td td className="p-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isSelectAll === true}
                          onChange={(e) => handleSelectAll(e)}
                          id="checkAll"
                          style={{ cursor: "pointer" }}
                        />
                        <label className="form-check-label ms-2" for="checkAll">
                          เลือกทั้งหมด
                        </label>
                      </td>
                    </tr>
                    {filterPermissionSelect.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              id="permissionCheck"
                              type="checkbox"
                              value={row.permissionId}
                              style={{ cursor: "pointer" }}
                              checked={selectPermission.includes(
                                row.permissionId
                              )}
                              onChange={(e) =>
                                handleChangeSelect(e, row.permissionId)
                              }
                            />
                            <label
                              className="form-check-label"
                              for="permissionCheck"
                            >
                              {row.permissionCode}
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 d-flex justify-content-end me-4">
                <div className="d-flex flex-column align-items-center mb-4">
                  <div className="d-flex gap-2 w-75">
                    <button
                      className="btn btn-outline-primary w-100"
                      data-bs-dismiss="modal"
                      onClick={ClearInput}
                    >
                      ล้างทั้งหมด
                    </button>
                    <button
                      className="btn btn-primary w-100"
                      onClick={handleSubmit}
                    >
                      {rolePermissionisLoading ? "กำลังบันทึก..." : "บันทึก"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 ">
            <div className="mt-4">
              <SearchBox
                onChange={(e) => setSearch2(e.target.value)}
                search={search2}
                placeholder="ค้นหาสิทธิ์เข้าใช้งาน"
              />
              <div className="table-container-horizontal-scorll table-responsive">
                <table
                  className="table table-striped table-hover text-nowrap"
                  style={{ width: "100%", tableLayout: "fixed" }}
                >
                  <thead className="sticky-top top-0">
                    <tr
                      style={{
                        background: "#ffe8da",
                        fontWeight: "600",
                      }}
                      className="text-center"
                    >
                      <th><i class="bi bi-check-circle me-2 text-primary"></i>สิทธิ์ที่สามารถเข้าใช้งานทั้งหมด</th>
                    </tr>
                  </thead>
                  {isLoading && <LoadingSpin />}
                  <tbody>
                    {filterPermissionTotal.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2"><i class="bi bi-check-circle me-2 text-primary"></i>{row.permissionCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <DataTableComponent
              column={columnData2}
              tableRef={tableRef2}
              tableHead={tableHead}
              data={rolePermissiondataById}
              isLoading={rolePermissionisLoading}
              columnDefs={columnDefs}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
