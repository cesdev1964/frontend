export default function IsActiveBadgeReact({ status }) {
  switch (status) {
    case false:
      return <span className="badge-style badge-leave">InActive</span>;

    case true:
      return <span className="badge-style badge-stillWork">Active</span>;

    default:
      return <span className="badge-style badge-unknown">ไม่ระบุ</span>;
  }
}

export function IsEmployeeStatusBadge({ status }) {
  console.log("value in badge", status);
  const isNumber = parseInt(status);
  switch (isNumber) {
    case 0:
      return <span className="badge-style badge-leave">ลาออก</span>;
    case 1:
      return <span className="badge-style badge-stillWork">ปกติ</span>;
    default:
      return <span className="badge-style badge-unknown">ไม่ระบุ</span>;
  }
}

export function OTapproveStatusBadge({ status }) {
  const isNumber = parseInt(status);
  switch (isNumber) {
    case 0:
      return (
        <span className="badge-style">
          <i class="bi bi-hourglass-split me-2 text-warning"></i>{" "}
          <strong className="text-primary">รออนุมัติ</strong>
        </span>
      );
    case 1:
      return (
        <span className="badge-style">
          <i class="bi bi-patch-check-fill me-2 text-success"></i>{" "}
          <strong className="text-primary">อนุมัติแล้ว</strong>
        </span>
      );
    case 2:
      return (
        <span className="badge-style">
          <i class="bi bi-x-circle-fill me-2 text-danger"></i>{" "}
          <strong className="text-primary">ไม่อนุมัติ</strong>
        </span>
      );
    default:
      return (
        <span className="badge-style">
          <i class="bi bi-x-circle-fill me-2 text-secondary"></i>{" "}
          <strong className="text-primary">ไม่ระบุ</strong>
        </span>
      );
  }
}
