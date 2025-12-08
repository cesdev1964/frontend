import { OTApproveEnum } from "../enum/otApproveEnum";

export default function IsEmployeeStatusBadge({ status }) {
  console.log("value in badge", status);
  const isNumber = parseInt(status);
 
  switch (isNumber) {
    case 0:
      return <span className="badge-style badge-leave">ลาออก</span> ;
    case 1:
      return <span className="badge-style badge-stillWork">ปกติ</span>;
    default:
      return <span className="badge-style badge-unknown">ไม่ระบุ</span>;
  }

  
}

export function OTapproveStatusBadge({ status }) {
  switch (status) {
    case OTApproveEnum.PENDING:
      return (
        <span className="badge-style">
          <i class="bi bi-hourglass-split me-2 text-warning"></i>{" "}
          <strong className="text-primary" style={{ fontSize: "14px" }}>
            รออนุมัติ
          </strong>
        </span>
      );
    case OTApproveEnum.APPROVE:
      return (
        <span className="badge-style">
          <i class="bi bi-patch-check-fill me-2 text-success"></i>{" "}
          <strong className="text-primary" style={{ fontSize: "14px" }}>
            อนุมัติแล้ว
          </strong>
        </span>
      );
    case OTApproveEnum.REJECT:
      return (
        <span className="badge-style">
          <i class="bi bi-x-circle-fill me-2 text-danger"></i>{" "}
          <strong className="text-primary" style={{ fontSize: "14px" }}>
            ไม่อนุมัติ
          </strong>
        </span>
      );
    default:
      return (
        <span className="badge-style">
          <i class="bi bi-x-circle-fill me-2 text-secondary"></i>{" "}
          <strong className="text-primary" style={{ fontSize: "14px" }}>
            ไม่ระบุ
          </strong>
        </span>
      );
  }
}

export function AnnouncementStatusBadge({ status }) {
  switch (status) {
    case "Published":
      return <span class="badge-style badge-stillWork">Published</span>;

    case "Draft":
      return <span class="badge-style badge-unknown">Draft</span>;

    case "Archived":
      return <span class="badge-style badge-formal">Archived</span>;

    default:
      return <span class="badge-style badge-leave">Unknown</span>;
  }
}
