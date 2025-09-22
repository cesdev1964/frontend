import { useEffect } from "react";

export function useTitle(title, appName = "ระบบฝากเบิก") {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title}` : appName;
    return () => { document.title = prev; }; // คืนค่าเดิมเมื่อออกจากหน้า (ออปชัน)
  }, [title, appName]);
}
