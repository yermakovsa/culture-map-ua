import { useEffect, useState } from "react";
import s from "./Partners.module.css";
import mainS from "../../App.module.css";
import i18n from "../../i18n";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NSAU from "../../res/img/partners/NSAU.png";
import MinCult from "../../res/img/partners/mincult.svg";
import UKF from "../../res/img/partners/UKF.svg";
import UKFen from "../../res/img/partners/UKFen.svg";
import UKCouncil from "../../res/img/partners/ukCouncil.svg";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

export default function Partners() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);

  const [partners, setPartners] = useState([
    {
      name: "Міністерство культури та інформаційної політики України",
      info: "Міністерство культури та інформаційної політики України - центральний орган виконавчої влади, що реалізує державну політику у сфері культури, відновлення та збереження національної пам'яті, охорони культурної спадщини тощо.",
      nameEN: "Ministry of Culture and Information Policy of Ukraine",
      infoEN:
        "The Ministry of Culture and Information Policy of Ukraine is the central executive body that implements state policy in the field of culture, restoration and preservation of national memory, protection of cultural heritage, etc.",
      image: MinCult,
    },
    {
      name: "Міністерство культури та інформаційної політики України",
      info: "Міністерство культури та інформаційної політики України - центральний орган виконавчої влади, що реалізує державну політику у сфері культури, відновлення та збереження національної пам'яті, охорони культурної спадщини тощо.",
      nameEN: "Ministry of Culture and Information Policy of Ukraine",
      infoEN:
        "The Ministry of Culture and Information Policy of Ukraine is the central executive body that implements state policy in the field of culture, restoration and preservation of national memory, protection of cultural heritage, etc.",
      image: UKCouncil,
    },
    {
      name: "Архітектурна Палата НСАУ",
      nameEN: "The Architectural Chamber of NSAU",
      info: "Найбільше об’єднання атестованих архітекторів України, мета якої є забезпечення високої якості послуг у сфері архітектурної діяльності.",
      infoEN:
        "The Architectural Chamber of NSAU is the largest association of certified architects in Ukraine, which aims to ensure high-quality services in the field of architectural activities.",
      image: NSAU,
    },
    {
      name: "Український культурний фонд",
      nameEN: "Ukrinian Cultural Foundation",
      info: "УКФ - держустанова, яка створена для розвитку національної культури та мистецтва в Україні.",
      infoEN:
        "UKF is a state institution, which was created for the development of national culture and art in Ukraine.",
      image: i18n.language === "en" ? UKFen : UKF,
    },
  ]);

  useEffect(() => {
    let copy = partners.concat();
    partners[2].image = i18n.language === "en" ? UKFen : UKF;
    setPartners(copy);
  }, [i18n.language]);

  const PartnerList = partners.map((el, index) => {
    return (
      <div className={s.partnerCard} key={`${index}-partner`}>
        <img src={el.image} alt={el.name} className={s.image} />
        <div className={s.info}>
          <h1>{i18n.language === "ua" ? el.name : el.nameEN}</h1>
          <p>{i18n.language === "ua" ? el.info : el.infoEN}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={`${mainS.mainDiv} ${s.mainDiv}`}>
      <Helmet>
        <title>{i18n.t("titles.partners")}</title>
      </Helmet>
      <Header />
      <div className={mainS.container}>
        <div className={s.title}>{i18n.language === 'ua' ? 'Наші партнери' : 'Our partners'}</div>
        {PartnerList}
      </div>
      <Footer />
    </div>
  );
}
