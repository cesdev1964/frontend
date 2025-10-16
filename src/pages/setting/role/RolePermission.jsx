// src/pages/Home.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useTitle } from "../../../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../../../components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import DataTableComponent from "../../../components/DatatableComponent";
import { useRolePermission } from "../../../hooks/rolePermissionStore";
import { useParams } from "react-router-dom";
import { SubmitOrCancelButton } from "../../../components/SubmitOrCancelBtnForModal";
import { usePermission } from "../../../hooks/permissionStore";
import LoadingSpin from "../../../components/loadingSpin";
import SearchBox from "../../../components/SearchBox";

export const tableHead = [{ colName: "รหัสสิทธิ์เข้าใช้งาน" }];
export default function RolePermission({ title }) {
  const tableRef2 = useRef();
  const [selectPermission, setSelectPermission] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  useTitle(title);

  const {
    rolePermissionisLoading,
    rolePermissionerrorMessage,
    success,
    rolePermissionMessage,
    rolePermissiondataById,
    getRolePermissionByRoleId,
    getRolePermission,
    updateRolePermission,
  } = useRolePermission();

  const { getPermission, permissionData } = usePermission();

  const { roleid } = useParams();

  const fetchDataTable = useCallback(async () => {
    try {
      await getRolePermissionByRoleId(roleid);
      await getRolePermission();
      await getPermission();
    } catch (error) {
      alert("ดึงข้อมูลไม่สำเร็จ :", error.message);
    }
  }, [getRolePermissionByRoleId, getRolePermission]);

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
  }, [rolePermissiondataById, permissionData.length]);

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
      setSelectPermission([]);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const reqData = {
      permissionIds: selectPermission,
    };
    const response = await updateRolePermission(reqData, roleid);
    if (response.success) {
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
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        icon: "error",
      });
    }
  };

  const ClearInput = () => {
    setSelectPermission([]);
  };

    const filterPermission = permissionData.filter((item) => {
    if (
      item.permissionCode.toLocaleLowerCase().includes(search)
    ) {
      return item;
    }
  });

  return (
    <div>
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

      <div className="container">
        <div className="row g-3">
          <div className="col-lg-6 col-sm-12">
            <div className="mt-4">
              <SearchBox
                onChange={(e) => setSearch(e.target.value)}
                search={search}
                placeholder="ค้นหาสิทธิ์เข้าใช้งาน"
              />
              <div
                className="table-container-horizontal-scorll table-responsive"
                // style={{ marginTop: "65px" }}
              >
                {isLoading && <LoadingSpin />}
                <table
                  className="table table-striped table-hover text-nowrap"
                  style={{ width: "100%", tableLayout: "fixed" }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#ffe8da",
                        fontWeight: "600",
                      }}
                      className="text-center"
                    >
                      <th>รหัสสิทธิ์เข้าใช้งาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td td className="p-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isSelectAll === true}
                          onChange={(e) => handleSelectAll(e)}
                        />
                        <label className="form-check-label ms-2">
                          เลือกทั้งหมด
                        </label>
                      </td>
                    </tr>
                    {filterPermission.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={row.permissionId}
                              checked={selectPermission.includes(
                                row.permissionId
                              )}
                              onChange={(e) =>
                                handleChangeSelect(e, row.permissionId)
                              }
                            />
                            <label className="form-check-label">
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
                <SubmitOrCancelButton
                  handleSubmit={handleSubmit}
                  handleCancel={ClearInput}
                  isLoading={rolePermissionisLoading}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 ">
            <DataTableComponent
              column={columnData2}
              tableRef={tableRef2}
              tableHead={tableHead}
              data={rolePermissiondataById}
              isLoading={rolePermissionisLoading}
              columnDefs={columnDefs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
