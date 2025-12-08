import React from 'react'
import ImageComponent from '../Image'
import { telephoneFormat } from '../../util/inputFormat'
import IsEmployeeStatusBadgeReact from "../../util/isActiveBadge.jsx";

export default function ProfileInformation({avatarUrl,empData}) {
  return (
       <div className="d-flex align-items-start justify-content-center">
                    <div className="d-flex">
                      <div className="d-flex flex-column align-items-center">
                        <ImageComponent
                          imageSRC={avatarUrl}
                          height="140px"
                          width="140px"
                          borderRadius="10px"
                          alt="profile-avatar"
                          objectfit="cover"
                        />
                        <p className="mt-3 text-danger">
                          <strong>
                            รหัสพนักงาน :{" "}
                            {empData?.employee?.employeeCode ?? "ไม่ระบุ"}
                          </strong>
                        </p>
                        <h6
                          className="my-2 text-center"
                          style={{ fontSize: "1.3rem" }}
                        >
                          คุณ {empData?.employee?.firstname ?? "ไม่ระบุ"}{" "}
                          {empData?.employee?.lastname ?? "ไม่ระบุ"}
                        </h6>
                        <p className="position-content text-secondary mt-2">
                          <i className="bi bi-telephone-fill me-2"></i>
                          {telephoneFormat(empData?.employee?.telephoneNo)}
                        </p>
                      </div>
                    </div>
    
                    <IsEmployeeStatusBadgeReact
                      status={empData?.employee?.status}
                    />
                  </div>
  )
}
