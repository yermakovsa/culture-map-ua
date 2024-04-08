import { Link } from "react-router-dom";
import s from "./Error.module.css";
import i18n from "../../i18n";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

export default function Error() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);

  const history = useNavigate();

  useEffect(() => {
    let path = window.location.pathname;
    let lang;
    if (i18n.language === "en") {
      lang = "en";
    } else if (i18n.language.includes("en-")) {
      lang = "en";
      i18n.changeLanguage("en");
    } else {
      lang = "ua";
      if (i18n.language !== "ua") {
        i18n.changeLanguage("ua");
      }
    }

    if (
      path === "/" ||
      path === "/team" ||
      path === "/goals" ||
      path === "/map" ||
      path === "/help" ||
      path === "/form" ||
      path === "/privacy-policy" ||
      path === "/public-offer"
      // path === "/partners"
      // path === "/blog"
    ) {
      history(`/${lang}` + path + window.location.search);
    }
  }, []);

  return (
    <div className={s.container}>
      <Helmet><title>404</title></Helmet>
      <div className={s.err}>404</div>
      <div className={s.text1}>{i18n.t("error.text1")}</div>
      <div className={s.text2}>{i18n.t("error.text2")}</div>
      <Link to={`/${i18n.language}/`} className={s.main}>
        {i18n.t("error.back")}
      </Link>
    </div>
  );
}
