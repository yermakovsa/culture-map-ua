import s from "./HeaderWhite.module.css";
import mainS from "../../App.module.css";
import Logo from "../../res/img/logoBlack.svg";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import enFlag from "../../res/img/en.svg";
import uaFlag from "../../res/img/ua.svg";
import { useEffect, useState, useRef, useCallback } from "react";
import Tg from "../../res/img/tg.svg";
import Fb from "../../res/img/fb.svg";
import Inst from "../../res/img/inst.svg";
import Mail from "../../res/img/mailIcon.svg";
import r from "../MapHeader/MapHeader.module.css";
import mainLogo from "../../res/img/mainLogoBlack.svg";
import In from "../../res/img/in.svg";
import Tw from "../../res/img/tw.svg";
import ReactGA from "react-ga";
import { useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  if (width <= 690) {
    return true;
  } else {
    return false;
  }
};

const eventTrack = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default function HeaderWhite() {
  const history = useNavigate();
  const changeLng = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("ua");
      let pathname = window.location.pathname;
      // console.log(pathname)
      // console.log(pathname.slice(1).indexOf('/'))
      // console.log(pathname.slice(pathname.slice(1).indexOf('/') + 1))
      history("/ua" + pathname.slice(pathname.slice(1).indexOf("/") + 1));
    } else {
      i18n.changeLanguage("en");
      let pathname = window.location.pathname;
      // console.log(pathname)
      // console.log(pathname.slice(1).indexOf('/'))
      // console.log(pathname.slice(pathname.slice(1).indexOf('/') + 1))
      history("/en" + pathname.slice(pathname.slice(1).indexOf("/") + 1));
    }
  };

  const [sizeStatus, setSizeStatus] = useState(getSize());

  const [opened, setOpened] = useState(false);

  // const [y, setY] = useState(0);
  // const [showHeader, setShowHeader] = useState(true);

  // const scrollFunc = useCallback(() => {
  //   if (
  //     window.scrollY > 0 &&
  //     window.scrollY + window.innerHeight <
  //       document.documentElement.scrollHeight
  //   ) {
  //     if (y > window.scrollY) {
  //       setShowHeader(true);
  //     } else {
  //       if (!opened) {
  //         setShowHeader(false);
  //       }
  //     }
  //     setY(window.scrollY);
  //   } else if (window.scrollY <= 0) {
  //     setShowHeader(true);
  //     setY(0);
  //   } else {
  //     if (!opened) {
  //       setShowHeader(false);
  //     }
  //     setY(window.scrollY - document.documentElement.scrollHeight);
  //   }
  // }, [y]);

  // useEffect(() => {
  //   if (!sizeStatus && !opened) {
  //     window.addEventListener("scroll", scrollFunc);
  //     return () => {
  //       window.removeEventListener("scroll", scrollFunc);
  //     };
  //   }
  // }, [sizeStatus, scrollFunc, opened]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleResize() {
      setSizeStatus(getSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (opened && sizeStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opened, sizeStatus]);

  return sizeStatus ? (
    <>
      {opened ? (
        <header
          className={opened === 2 ? r.mapHiding : r.mapOpened}
          onAnimationEnd={() => {
            if (opened === 2) {
              setOpened(false);
            }
          }}
        >
          <div className={r.line}>
            <div
              className={r.close}
              onClick={() => {
                setOpened(2);
              }}
            >
              <hr className={r.Hr1} />
              <hr className={r.Hr2} />
            </div>
            <img
              className={r.flag}
              src={i18n.language !== "en" ? enFlag : uaFlag}
              onClick={() => {
                changeLng();
              }}
            />
            {/* <img src={uaFlag} className={r.flag} /> */}
          </div>
          <div className={r.linkContainer}>
            <Link
              to={`/${i18n.language}/`}
              onClick={() => {
                setOpened(false);
              }}
              className={r.link}
            >
              {i18n.t("header.home")}
            </Link>
            <Link
              to={`/${i18n.language}/team`}
              onClick={() => {
                setOpened(false);
              }}
              className={r.link}
            >
              {i18n.t("header.team")}
            </Link>
            <Link
              to={`/${i18n.language}/map`}
              onClick={() => {
                setOpened(false);
              }}
              className={r.link}
            >
              {i18n.t("header.map")}
            </Link>
            <Link
              to={`/${i18n.language}/partners`}
              onClick={() => {
                setOpened(false);
              }}
              className={r.link}
            >
              {i18n.t("header.partners")}
            </Link>
            <Link
              to={`/${i18n.language}/help`}
              onClick={() => {
                setOpened(false);
              }}
              className={r.link}
            >
              {i18n.t("header.help")}
            </Link>
            <HashLink
              smooth
              to={`/${i18n.language}/goals#goals`}
              className={r.link}
              onClick={() => {
                setOpened(false);
              }}
            >
              {i18n.t("header.goals")}
            </HashLink>
            {/* <Link to="/" className={`${s.link}`}>
                  Донат
                </Link> */}
            <Link
              to={`/${i18n.language}/goals`}
              className={`${r.link} ${r.donateLink}`}
              onClick={() => {
                setOpened(false);
              }}
            >
              {i18n.t("donate")}
            </Link>
          </div>
          <div className={r.contacts}>
            <a
              href="https://instagram.com/saveartua?igshid=YmMyMTA2M2Y="
              target="_blank"
            >
              <img src={Inst} />
            </a>
            <a href="https://t.me/saveartua" target="_blank">
              <img src={Tg} />
            </a>
            <a
              href="https://www.facebook.com/Save-Art-UA-107470058617201/"
              target="_blank"
            >
              <img src={Fb} />
            </a>
            <a
              href="https://www.linkedin.com/company/saveartua/"
              target="_blank"
            >
              <img src={In} />
            </a>
            <a href="https://twitter.com/SaveArtUA" target="_blank">
              <img src={Tw} />
            </a>
            <a href="mailto:contact@saveartua.com">
              <img src={Mail} />
            </a>
          </div>
        </header>
      ) : null}
      <header className={s.headerContainer}>
        <div className={r.header}>
          <div
            className={r.menu}
            onClick={() => {
              setOpened(true);
            }}
          >
            <hr className={`${r.hr1} ${s.hr1}`} />
            <hr className={`${r.hr2} ${s.hr2}`} />
          </div>
          <div className={s.logo}>
            <img src={mainLogo} />
          </div>
          <Link className={r.donate} to={`/${i18n.language}/goals`}>
            {i18n.t("donate")}
          </Link>
        </div>
      </header>
    </>
  ) : (
    // </div>
    <div className={s.headerMain}>
      <div className={`${s.header} ${mainS.container}`}>
        <Link to={`/${i18n.language}/`} className={s.logo}>
          <img src={Logo} />
          <h1>
            save
            <br />
            art ua
          </h1>
        </Link>
        <div
          className={opened ? s.menuContainerActive : s.menuContainer}
          onMouseLeave={() => {
            if (opened) {
              setOpened(2);
            }
          }}
        >
          <div className={s.menu}>
            <img
              src={i18n.language !== "en" ? enFlag : uaFlag}
              onClick={() => {
                changeLng();
              }}
            />
            {/* <img src={uaFlag} /> */}

            <div
              className={opened ? s.menuBtnActive : s.menuBtn}
              onMouseOver={() => {
                setOpened(true);
              }}
            >
              {i18n.t("header.menu")}
            </div>

            <Link to={`/${i18n.language}/goals`} className={s.donate}>
              {i18n.t("donate")}
            </Link>
          </div>
          {opened ? (
            <div
              className={opened === 2 ? s.linkContainerHiding : s.linkContainer}
              onAnimationEnd={() => {
                if (opened === 2) {
                  setOpened(false);
                }
              }}
            >
              {/* <div className={s.blurContainer}></div> */}
              <Link to={`/${i18n.language}/`} className={s.link}>
                {i18n.t("header.home")}
              </Link>
              <Link to={`/${i18n.language}/team`} className={s.link}>
                {i18n.t("header.team")}
              </Link>
              <Link to={`/${i18n.language}/map`} className={s.link}>
                {i18n.t("header.map")}
              </Link>
              <HashLink
                smooth
                to={`/${i18n.language}/goals#goals`}
                className={s.link}
              >
                {i18n.t("header.goals")}
              </HashLink>
              <Link to={`/${i18n.language}/partners`} className={s.link}>
                {i18n.t("header.partners")}
              </Link>
              <Link to={`/${i18n.language}/help`} className={s.link}>
                {i18n.t("header.help")}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
