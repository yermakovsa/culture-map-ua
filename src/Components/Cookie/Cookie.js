import { useEffect, useState } from "react";
import mainS from "../../App.module.css";
import i18n from "../../i18n";
import s from "./Cookie.module.css";

const cookieApproved = "cookieApproved";

export default function Cookie() {
  const [cookie, setCookie] = useState(true);

  const approve = () => {
    // console.log("here");
    localStorage.setItem(cookieApproved, JSON.stringify({ approved: true }));
    setCookie(false);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(cookieApproved));
    if (data && data.approved) {
      setCookie(false);
    }
  }, []);

  return cookie ? (
    <div
      className={`${cookie === 2 ? s.containerHiding : s.container} ${
        mainS.container
      }`}
      onAnimationEnd={() => {
        if (cookie === 2) {
          approve();
        }
      }}
    >
      <div
        className={s.ok}
        onClick={() => {
          setCookie(2);
        }}
      >
        {i18n.t("cookie.ok")}
      </div>
      <div className={s.text}>{i18n.t("cookie.text")}</div>
    </div>
  ) : null;
}
