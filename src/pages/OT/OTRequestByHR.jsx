import React from "react";
import HeaderPage from "../../components/HeaderPage";
import { useTitle } from "../../hooks/useTitle";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import {useJob}  from "../../hooks/jobStore";
import { useOTrequest } from "../../hooks/otRequestStore";
export default function OTRequestByHR({ title }) {
  useTitle(title);
    const {
      createOTrequest,
      otIsLoading,
      getOTrequestByEmployeeID,
      deleteOTrequest,
    } = useOTrequest();
    
  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div className="announcement-box  mb-3">
              <div className="d-flex  justify-content-between">
                <h4>หน่วยงาน</h4>

              </div>
             
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="announcement-box border-bottom  mb-3">
              <h4>ขอโอทีตกค้าง</h4>
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
