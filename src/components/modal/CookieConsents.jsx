import { useState, useEffect } from "react";
import CookieIcon from "../../assets/icon/CookieIcon";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Cookies from "js-cookie";

const config = {
  current_lang: "th",
  autorun: true,
  autoclear_cookies: true,
  languages: {
    th: {
      settings_modal: {
        title: "การตั้งค่าความเป็นส่วนตัว",
        save_settings_btn: "บันทึกการตั้งค่า",
        accept_all_btn: "ยอมรับทั้งหมด",
        reject_all_btn: "ปฏิเสษทั้งหมด",
        close_btn_label: "ปิด",
        cookie_table_headers: [
          { col1: "ชื่อ" },
          { col2: "โดเมน" },
          { col3: "วันหนดอายุ" },
          { col4: "รายละเอียด" },
        ],
        blocks: [
          {
            title: "คุกกี้พื้นฐานที่จำเป็น",
            description:
              'ประเภทของคุกกี้มีความจำเป็นสำหรับการทำงานของเว็บไซต์ เพื่อให้คุณสามารถใช้ได้อย่างเป็นปกติ และเข้าชมเว็บไซต์ คุณไม่สามารถปิดการทำงานของคุกกี้นี้ในระบบเว็บไซต์ของเราได้ <a href="#" class="cc-link">รายละเอียดคุกกี้</a>.',
          },
          {
            title: "คุกกี้ในส่วนวิเคราะห์",
            description:
              "These cookies allow the website to remember the choices you have made in the past",
            toggle: {
              value: "analytics", // your cookie category
              enabled: false,
              readonly: false,
            },
            cookie_table: [
              // list of all expected cookies
              {
                col1: "^_ga", // match all cookies starting with "_ga"
                col2: "google.com",
                col3: "2 years",
                col4: "description ...",
                is_regex: true,
              },
              {
                col1: "_gid",
                col2: "google.com",
                col3: "1 day",
                col4: "description ...",
              },
            ],
          },
          {
            title: "คุกกี้ในส่วนของการตลาด",
            description:
              "ประเภทของคุกกี้ที่มีความจำเป็นในการใช้งานเพื่อการวิเคราะห์ คุณสามารถเลือกปิดคุกกี้ประเภทนี้ได้โดยไม่ส่งผลต่อการทำงานหลัก",
            toggle: {
              value: "targeting",
              enabled: false,
              readonly: false,
            },
          },
          //   {
          //     title: "รายละเอียดคุกกี้",
          //     description:
          //       'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
          //   },
        ],
      },
    },
  },
};

const CookieConsents = () => {
  const [isAccept, setIsAccept] = useState(false);
  const [isShowSetting, setisShowSetting] = useState(false);

  const handleAcceptCookie = () => {
    setIsAccept(true);
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + 50);
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

  const settingCookie = config.languages.th.settings_modal;

  return (
    <>
      {/* {!isAccept && (
        <div className="min-vh-100 border border-1">
          <div className={`cookie-consent-card ${isAccept ? "hidden" : ""}`}>
            <div className="card card-hover card--soft p-3">
              <header className="d-flex my-2 align-items-center">
                <CookieIcon width="30px" colorFill="#687FE5 " />
                <h4 className="text-primary ms-2">เว็บไซต์นี้มีการใช้คุกกี้</h4>
              </header>
              <div className="cookie-concent-content">
                <p>
                  คุกกี้เหล่านี้มีความจำเป็นเพื่อให้ผู้ใช้งานสามารถท่องเว็บและใช้งานฟีเจอร์ต่างๆบนเว็บไซต์ต่างบนเว็บไซต์ของบริษัท
                  เช่น เข้าถึงพื้นที่ที่ปลอดภัยบนเว็บไซต์ของบริษัท
                  โดยทางบริษัทใช้คุกกี้ที่จำเป็นอย่างเคร่งครัดเพื่อให้แน่ใจว่าบริการทางเทคโนโลยีสารสนเทศของบริษัททำงานพื้นฐานได้อย่างถูกต้องและสมบูรณ์
                </p>
              </div>
              <div className="d-flex ">
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
      )} */}

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
              {/* <div className="modal-footer">
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={handleAcceptCookie}
                  >
                    {settingCookie.accept_all_btn}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setisShowSetting(false)}
                  >
                    {settingCookie.close_btn_label}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setisShowSetting(false)}
                  >
                    {settingCookie.save_settings_btn}
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsents;
