import s from "./Footer.module.css";
import mainS from "../../App.module.css";
import Tg from "../../res/img/tg.svg";
import Fb from "../../res/img/fb.svg";
import Inst from "../../res/img/inst.svg";
import Mail from "../../res/img/mailIcon.svg";
import { useState, useEffect } from "react";
import In from "../../res/img/in.svg";
import Tw from "../../res/img/tw.svg";
import i18n from "../../i18n";
import Visa from "../../res/img/visa.svg";
import MC from "../../res/img/mc.svg";
import { Link } from "react-router-dom";

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  // console.log(width);
  if (width <= 690) {
    return true;
  } else {
    return false;
  }
};

export default function Footer() {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className={s.footer}>
      <hr />
      <div className={mainS.container}>
        <div className={s.footerInfo}>
          <div className={s.textBlock}>
            <div className={s.text}>{i18n.t("footer.foundation")}</div>
            <div className={s.fundInfo}>
              <div>{i18n.t("footer.code")}: 44743470</div>
              <div className={s.city}>{i18n.t("footer.place")}</div>
            </div>
          </div>
          {size ? (
            <div className={s.linkBlock}>
              <div className={s.contactLine}>
                <a
                  className={s.imgLink}
                  href="https://instagram.com/saveartua?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  <img src={Inst} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://t.me/saveartua"
                  target="_blank"
                >
                  <img src={Tg} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://www.facebook.com/Save-Art-UA-107470058617201/"
                  target="_blank"
                >
                  <img src={Fb} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://www.linkedin.com/company/saveartua/"
                  target="_blank"
                >
                  <img src={In} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://twitter.com/SaveArtUA"
                  target="_blank"
                >
                  <img src={Tw} />
                </a>
                <a
                  className={s.imgLink}
                  href="mailto:contact@saveartua.com"
                  target="_blank"
                >
                  <img src={Mail} />
                </a>
              </div>
            </div>
          ) : (
            <div className={s.linkBlock}>
              <a href="mailto:contact@saveartua.com" className={s.text}>
                contact@saveartua.com
              </a>
              <div className={s.contactLine}>
                <a
                  className={s.imgLink}
                  href="https://instagram.com/saveartua?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  <img src={Inst} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://t.me/saveartua"
                  target="_blank"
                >
                  <img src={Tg} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://www.facebook.com/Save-Art-UA-107470058617201/"
                  target="_blank"
                >
                  <img src={Fb} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://www.linkedin.com/company/saveartua/"
                  target="_blank"
                >
                  <img src={In} />
                </a>
                <a
                  className={s.imgLink}
                  href="https://twitter.com/SaveArtUA"
                  target="_blank"
                >
                  <img src={Tw} />
                </a>
              </div>
            </div>
          )}
        </div>
        <div className={s.line}>
          <div className={s.logoBlock}>
            <img src={Visa} alt="visa" />
            <img src={MC} alt="mastercard" />
          </div>
          <div className={s.policyBlock}>
            <Link to={`/${i18n.language}/privacy-policy`}>{i18n.t('footer.privacy')}</Link>
            <Link to={`/${i18n.language}/public-offer`}>{i18n.t('footer.offer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
