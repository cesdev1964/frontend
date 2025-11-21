import { useState, useEffect } from "react";
import CookieIcon from "../../assets/icon/CookieIcon";

import Cookies from "js-cookie";



const CookieConsents = () => {
  const [isAccept, setIsAccept] = useState(false);
  const [isShowSetting, setisShowSetting] = useState(false);

  const handleAcceptCookie = () => {
    setIsAccept(true);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours()+1)
    // currentDate.setSeconds(currentDate.getSeconds() + 60);
    //ชื่อ cookie , ข้อมูลที่เก็บใน cookie , วันหมดอายุ
    Cookies.set("MyCookie", "true", { expires: currentDate });
    setisShowSetting(false);
  };

  useEffect(() => {
    const checkCookie = () => {
      const consent = Cookies.get("MyCookie");
      if (!consent) {
        setisShowSetting(true);
      } else {
        setisShowSetting(false);
      }
    };

    checkCookie();

    const interval = setInterval(checkCookie, 200);
    return () => clearInterval(interval);
  }, []);

  const handleRevoke = () => {
    Cookies.remove("MyCookie"); // ลบ cookie
    window.location.reload(); // รีโหลดเพื่อให้ popup แสดงใหม่
  };

  return (
    <>
    
      {/* <!-- Modal --> */}
      {isShowSetting && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-primary">
              <div className="modal-body">
                <header className="d-flex my-2 align-items-center">
                  <CookieIcon width="30px" colorFill="#f19999 " />
                  <h4 className="text-danger ms-2">
                    เว็บไซต์นี้มีการใช้คุกกี้
                  </h4>
                </header>
                <div className="cookie-concent-content">
                  <p>
                    คุกกี้เหล่านี้มีความจำเป็นเพื่อให้ผู้ใช้งานสามารถท่องเว็บและใช้งานฟีเจอร์ต่างๆบนเว็บไซต์ต่างบนเว็บไซต์ของบริษัท
                    เช่น เข้าถึงพื้นที่ที่ปลอดภัยบนเว็บไซต์ของบริษัท
                    โดยทางบริษัทใช้คุกกี้ที่จำเป็นอย่างเคร่งครัดเพื่อให้แน่ใจว่าบริการทางเทคโนโลยีสารสนเทศของบริษัททำงานพื้นฐานได้อย่างถูกต้องและสมบูรณ์
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleAcceptCookie}
                  >
                    ยอมรับทั้งหมด
                  </button>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsents;
