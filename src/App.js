import { Route, Routes, Navigate, useSearchParams } from "react-router-dom";
import Main from "./Screens/Main/Main";
import mainS from "./App.module.css";
import MapBox from "./Screens/Map/Map";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Team from "./Screens/Team/Team";
import ReactGA from "react-ga";
import DonatePopUp from "./Components/DonatePopUp/DonatePopUp";
import { useEffect, useState } from "react";
import Form from "./Screens/Form/Form";
import HelpForm from "./Screens/HelpForm/HelpForm";
import Goals from "./Screens/Goals/Goals";
import i18n from "./i18n";
import { useNavigate } from "react-router";
import PrivacyPolicy from "./Screens/PrivacyPolicy/PrivacyPolicy";
import PublicOffer from "./Screens/PrivacyPolicy/PublicOffer";
import Cookie from "./Components/Cookie/Cookie";
import ErrorPage from "./Screens/Error/Error";
import Info from "./Screens/Info/Info";
import Partners from "./Screens/Partners/Partners";
import ApplePayDownloader from "./applepay/ApplePayDownloader";
import SuccessPopUp from "./Components/SuccessPopUp/SuccessPopUp";
import TimerPopUp from "./Components/TimerPopUp/TimerPopUp";
import Blog from "./Screens/Blog/Blog";
import axios from "axios";
import Article from "./Screens/Article/Article";

function App() {
  ReactGA.initialize(window._env_.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
  const history = useNavigate();

  const [donated, setDonated] = useState(0);
  const [popup, setPopup] = useState(false);
  const [currency, setCurrency] = useState("UAH");

  useEffect(() => {
    const path = window.location.pathname;
    const part = path.slice(1, path.slice(1).indexOf("/") + 1);
    let lang;
    const search = window.location.search;
    // console.log(search)
    if (path !== "/.well-known/apple-developer-merchantid-domain-association") {
      if (part.includes("en")) {
        lang = "en";
        i18n.changeLanguage("en");
      } else {
        lang = "ua";
        i18n.changeLanguage("ua");
      }
      history(
        "/" +
          lang +
          path.slice(path.slice(1).indexOf("/") + 1) +
          (search ? search : "")
      );
    }
  }, []);

  useEffect(() => {
    if (i18n.language !== "ua") {
      axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          let data = response.data;
          console.log(data.currency)
          if(data.currency === 'USD' || data.currency === 'EUR' || data.currency === 'UAH'){
            setCurrency(data.currency)
          }else{
            setCurrency('USD')
          }
        })
        .catch((error) => {
          setCurrency('USD')
          console.log(error);
        });
    }else{
      setCurrency('UAH')
    }
  }, [i18n.language]);

  // console.log(currency)

  // useEffect(() => {
  //   console.log(
  //     document.head.querySelector("[name~=description][content]").content
  //   );
  //   if (i18n.language === "ua") {
  //     document.head.querySelector("[name~=description][content]").content =
  //       "тест ua";
  //   } else {
  //     document.head.querySelector("[name~=description][content]").content =
  //       "test en";
  //   }
  // }, [i18n.language]);

  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     setPopup(true);
  //   }, 60000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);

  return (
    <div className={mainS.App}>
      <Cookie />
      <Helmet>
        <title>{i18n.t("titles.main")}</title>
        {/* <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SaveArtUA" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" /> */}
        <meta property="og:title" content="СЛАВА УКРАЇНІ" />
        <meta
          property="og:description"
          content="Показуємо, як росія нищить українську культуру."
        />
      </Helmet>
      {donated === 1 ? (
        <SuccessPopUp
          status={1}
          close={() => {
            setDonated(2);
          }}
        />
      ) : null}
      {popup && donated === 0 ? (
        <TimerPopUp
          close={() => {
            setPopup(false);
          }}
          currency = {currency}
        />
      ) : null}
      <Routes>
        <Route path={`/${i18n.language}/`} element={<Main />} />
        <Route path={`/${i18n.language}/map`} element={<MapBox />} />
        <Route path={`/${i18n.language}/team`} element={<Team />} />
        <Route path={`/${i18n.language}/form`} element={<Form />} />
        <Route path={`/${i18n.language}/help`} element={<HelpForm />} />
        <Route
          path={`/${i18n.language}/goals`}
          element={<Goals open={() => setDonated(1)} shouldOpen={donated} />}
        />
        {/* <Route path={`/${i18n.language}/partners`} element={<Partners />} /> */}
        {/* <Route path={`/${i18n.language}/blog`} element={<Blog />} />
        <Route path={`/${i18n.language}/blog/:id/`} element={<Article />} /> */}
        <Route
          path={`/${i18n.language}/privacy-policy`}
          element={<PrivacyPolicy />}
        />
        <Route
          path={`/${i18n.language}/public-offer`}
          element={<PublicOffer />}
        />
        <Route path={`/ua/info`} element={<Info />} />
        <Route
          path={`/.well-known/apple-developer-merchantid-domain-association`}
          element={<ApplePayDownloader />}
        />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      {/* <Main /> */}
    </div>
  );
}

export default withTranslation()(App);
// export default App
