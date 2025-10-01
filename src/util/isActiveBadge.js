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