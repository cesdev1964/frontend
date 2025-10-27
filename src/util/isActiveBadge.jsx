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
  console.log("value in badge",status);
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
