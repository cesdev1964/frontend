import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
const Employee = ({ title }) => {
  useTitle(title);
  const tableHead = [
    { index: 1, colName: "รหัสพนักงาน" },
    { index: 1, colName: "รหัสพนักงาน" },
    { index: 2, colName: "ชื่อพนักงาน" },
    { index: 3, colName: "เบอร์โทรศัพท์" },
    { index: 4, colName: "ระดับ" },
    { index: 5, colName: "ตำแหน่ง" },
    { index: 6, colName: "ประเภท" },
    { index: 7, colName: "สถานะ" },
    { index: 8, colName: "action" },
  ];
  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/settings">Setting</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Employee
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        {/* ปุ่มเพิ่ม */}
        <div className="d-flex justify-content-end align-items-center">
          <a className="power py-2" style={{ maxWidth: "200px" }}>
            <span>
              <i class="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">เพิ่มพนักงานใหม่</span>
          </a>
        </div>
        {/* ตารางข้อมูล */}
        <div className="mt-4">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                {tableHead.map((row) => (
                  <th key={row.index}>{row.colName}</th>
                ))}
              </tr>
            </thead>
          </table>
          <tbody className="table-group-divider"></tbody>
        </div>
      </div>
    </>
  );
};

export default Employee;
