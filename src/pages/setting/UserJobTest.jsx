import { React, useState, useEffect, useCallback } from "react";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";
import LoadingSpin from "../../components/loadingSpin";
import { useUserJobs } from "../../hooks/userJobsStore";
import { useUser } from "../../hooks/userStore";
import SearchBox from "../../components/SearchBox";
import { useJob } from "../../hooks/jobStore";
import Swal from "sweetalert2";

export default function UserJobsTest({ title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchJobs, setSearchJobs] = useState("");
  const { getUserJobs, updateUserJobs, userJobsdata } = useUserJobs();
  const { getUserDropdown, userDropdown } = useUser();
  const { getJobDropdown, jobDropdown } = useJob();
  const [getUserId, setGetUserId] = useState("");
  const [selectJob, setSelectJob] = useState([]); //ส่งไปหลังบ้าน

  const fetchDataTable = useCallback(async () => {
    try {
      await getUserDropdown();
      await getJobDropdown();
    } catch (error) {
      return;
    }
  }, [getUserDropdown, getJobDropdown]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (!userJobsdata) return;
    const userJobsList = userJobsdata.jobs;

    if (!userJobsList) return;

    if (userJobsList.length > 0) {
      setSelectJob(userJobsList); // จากนั้นเอาไป map กับ checked box
    } else {
      setSelectJob([]);
    }

    console.log("select job", selectJob);
  }, [userJobsdata]);

  const filterUser = userDropdown.filter((item) => {
    if (item.label.toLocaleLowerCase().includes(searchUser)) {
      return item;
    }
  });

  const filterJobs = jobDropdown.filter((item) => {
    if (item.label.toLocaleLowerCase().includes(searchJobs)) {
      return item;
    }
  });

  const selectedRow = async (userId) => {
    setGetUserId(userId);
    // ทำการเรียกใช้ function getUserJob จากในนี้
    await getUserJobs(userId);
    //จากนั้นก็ดังเอาค่าจากในนี้มาใช้งาน โดยนำค่า job id array ไปใส่ใน state
  };

  //   เอาไว้ส่ง API
  const handleChangeSelect = async (e, Id, userId) => {
    // ช้าไป 1 ค่าเสมอ
    console.log("select jobId", Id);
    setIsLoading(true);
    if (e.target.checked) {
      setSelectJob((prev) => [...prev, Id]);
      var massage = "เพิ่มหน่วยงานแล้ว";
    } else {
      setSelectJob((prev) => prev.filter((id) => id !== Id));
      var massage = "ลบหน่วยงานแล้ว";
    }
    console.log("select job onChange", selectJob);

    const reqData = {
      jobIds: selectJob,
    };
    updateUserJobs(reqData, userId);
    setIsLoading(false);
    
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: massage,
    });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/settings">ตั้งค่า</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="row g-3">
          <div className="col-lg-4 col-sm-12">
            <div className="mt-4">
              {/* <SearchBox
                onChange={(e) => setSearchUser(e.target.value)}
                search={searchUser}
                placeholder="ค้นหาผู้ใช้งาน"
              /> */}
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
                      <th>ชื่อผู้ใช้งาน</th>
                    </tr>
                  </thead>
                  <tbody style={{ position: "relative" }}>
                    {isLoading ? (
                      <tr>
                        <td colSpan={10}>
                          <LoadingSpin />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filterUser.map((row) => {
                          return (
                            <tr
                              key={row.value}
                              style={{ cursor: "pointer" }}
                              onClick={() => selectedRow(row.value)}
                            >
                              <td className="p-2">
                                <div className="d-flex justify-content-between align-item-center">
                                  <p>{row.label}</p>
                                  {/* <p className="badge bg-info text-dark pt-2">
                                  {userJobsdata.find(
                                    (f) => f.userId === row.value
                                  )?.jobs.length ?? 0}
                                </p> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 ">
            <div className="mt-4">
             
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
                      <th>หน่วยงาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={10}>
                          <LoadingSpin />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {getUserId != "" && (
                          <>
                            {filterJobs.map((row) => (
                              <tr key={row.value} style={{ cursor: "pointer" }}>
                                <td className="p-2">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      id={`jobCheck_${row.value}`}
                                      type="checkbox"
                                      value={row.value}
                                      style={{ cursor: "pointer" }}
                                    //   checked
                                      onChange={(e) =>
                                        handleChangeSelect(
                                          e,
                                          row.value,
                                          getUserId
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="permissionCheck"
                                    >
                                      {row.label}
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            <div className="col-lg-4 col-sm-12 ">
            <div className="mt-4">
             
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
                      <th>หน่วยงานที่ดูแล</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={10}>
                          <LoadingSpin />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {getUserId != "" && (
                          <>
                            {filterJobs.map((row) => (
                              <tr key={row.value} style={{ cursor: "pointer" }}>
                                <td className="p-2">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      id={`jobCheck_${row.value}`}
                                      type="checkbox"
                                      value={row.value}
                                      style={{ cursor: "pointer" }}
                                      checked={selectJob.includes(row.value)}
                                      onChange={(e) =>
                                        handleChangeSelect(
                                          e,
                                          row.value,
                                          getUserId
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="permissionCheck"
                                    >
                                      {row.label}
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
