export function isActiveBadge (status) {
    switch (status) {
      case false:
        return `<span class="badge-style badge-leave">InActive</span>`;

      case true:
        return `<span class="badge-style badge-stillWork">Active</span>`;

      default:
        return `<span class="badge-style badge-unknown">ไม่ระบุ</span>`;
    }
  };

  export function isEmployeeStatusBadge (status) {
    switch (status) {
      case 0:
        return `<span class="badge-style badge-leave">ลาออก</span>`;

      case 1:
        return `<span class="badge-style badge-stillWork">ปกติ</span>`;

      default:
        return `<span class="badge-style badge-unknown">ไม่ระบุ</span>`;
    }
  };