import { useEffect, useState } from "react";
import s from "./Goals.module.css";
import mainS from "../../App.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import DonateBlock from "../../Components/DonateBlock/DonateBlock";
import i18n from "../../i18n";
import ReactGA from "react-ga";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import GoalCard from "../../Components/GoalCard/GoalCard";

export default function Goals(props) {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("donated") === "true") {
      if (props.shouldOpen === 0) {
        props.open();
      }
    }
  }, []);

  const [money, setMoney] = useState({
    current: window._env_.REACT_APP_DONATION_SUM,
    all: window._env_.REACT_APP_DONATION_TARGET,
  });

  const getDate = () => {
    const date = new Date();
    return i18n.language === "ua"
      ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
      : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const getMoneyStroke = (num) => {
    let stroke = "";
    let val = `${num}`;
    for (let i = val.length - 1; i >= 0; i--) {
      if ((val.length - i) % 3 === 0 && i !== val.length - 1) {
        stroke += `${val[i]} `;
      } else {
        stroke += val[i];
      }
    }

    return stroke.split("").reverse().join("") + " ₴";
  };

  return (
    <div className={`${mainS.mainDiv} ${s.main}`}>
      <Helmet>
        <title>{i18n.t("titles.donation")}</title>
      </Helmet>
      <Header />
      <div className={`${mainS.container} ${s.cont}`}>
        <GoalCard />
        {/* <div className={s.pickedContainer}>
          <div className={s.picked}>{i18n.t("goals.already")}</div>
          <div className={s.dateSmall}>
            {i18n.t("goals.date")}
            {getDate()}
          </div>
        </div>
        <div className={s.numLine}>
          <div className={s.current}>{getMoneyStroke(money.current)}</div>
          <div className={s.need}>{getMoneyStroke(money.all)}</div>
        </div>
        <div className={s.progressLine}>
          <div
            className={s.done}
            style={{ minWidth: `${(money.current * 100) / money.all}%` }}
          ></div>
        </div>
        <div className={s.needSmall}>{getMoneyStroke(money.all)}</div>
        <div className={s.date}>
          {i18n.t("goals.date")}
          {getDate()}
        </div>
        <div className={s.text}>{i18n.t("goals.raise1")}</div> */}
        {/* <div className={s.title}>{i18n.t("goals.want")}</div> */}
        <DonateBlock />
        <div className={s.text}>
          {i18n.t("goals.raise2")}
          <br />
          {i18n.t("goals.raise3")}
        </div>
        <div className={`${s.title} ${s.goalsTitle}`} id="goals">
          {i18n.t("goals.our")}
        </div>
        <div className={s.goalText}>
          {i18n.t("goals.text1")}
          <br />
          {/* <br /> */}
          {i18n.t("goals.text2")}
          <br />
          <br />
          {i18n.t("goals.text3")}
        </div>
        <div className={s.card}>
          <div>
            <div className={s.num1}>1</div>
            {i18n.t("goals.goals.1")}
          </div>
        </div>
        <div className={s.card}>
          <div className={s.num2}>2</div>
          <div>{i18n.t("goals.goals.2")}</div>
        </div>
        <div className={s.card}>
          <div className={s.num3}>3</div>
          <div>{i18n.t("goals.goals.3")}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
