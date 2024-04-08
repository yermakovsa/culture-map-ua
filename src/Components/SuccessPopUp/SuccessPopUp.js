import r from "../DonatePopUp/DonatePopUp.module.css";
import Close from "../../res/img/closeDonate.svg";
import { useState } from "react";
import i18n from "../../i18n";

export default function SuccessPopUp(props) {
  const [hide, setHide] = useState(false);

  return (
    <div
      className={hide ? r.blurDivHide : r.blurDiv}
      onAnimationEnd={() => {
        if (hide) {
          props.close();
        }
      }}
    >
      <div className={r.form}>
        <div className={r.close}>
          <img
            src={Close}
            onClick={() => {
              setHide(true);
            }}
          />
        </div>
        <div className={r.title}>{props.status === 1 ? i18n.t('popup.thanks') : "oops"}</div>
        {props.status === 1 ? (
          <>
            <div className={r.text}>{i18n.t("popup.text")}</div>
            <div
              className={r.send}
              style={{ background: "#9ABE57" }}
              onClick={() => {
                setHide(true);
              }}
            >
              {i18n.t("popup.good")}
            </div>
          </>
        ) : (
          <>
            <div className={r.text}>
              {i18n.t("popup.error.1")}
              <br />
              {i18n.t("popup.error.2")}
            </div>
            <div
              className={r.send}
              onClick={() => {
                setHide(true);
              }}
            >
              {i18n.t('popup.back')}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
