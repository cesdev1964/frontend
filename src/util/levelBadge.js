export function LevelBadge (level) {
      switch (level) {
      case 1:
      case 2:
      case 3:
        return `<span class="badge-style badge-leave">PC ${level}</span>`;

      case 4:
      case 5:
      case 6:
        return `<span class="badge-style badge-middle">PC ${level}</span>`;

      case 7:
      case 8:
      case 9:
        return `<span class="badge-style badge-stillWork">PC ${level}</span>`;

      default:
        return `<span class="badge-style badge-unknown">ไม่ระบุ</span>`;
    }
  };