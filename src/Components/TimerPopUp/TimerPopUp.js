import s from "./TimerPopUp.module.css";
import MapImg from "../../res/img/animation/map.svg";
import Church from "../../res/img/animation/church.svg";
import Explosion from "../../res/img/animation/explosion.svg";
import Mesile from "../../res/img/animation/mesile.svg";
import ChurchDestoyed from "../../res/img/animation/churchDestroyed.svg";
import { useEffect, useState } from "react";
import Sheva from "../../res/img/animation/sheva.png";
import i18n from "../../i18n";
import ReactGA from "react-ga";

const currencyArr = {
  UAH: [
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIxMDAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0KHQu9Cw0LLQsCDQo9C60YDQsNGX0L3RliEiLCJwdWJsaWNfa2V5IjoiaTk3ODM1MzYyMTgiLCJsYW5ndWFnZSI6InVrIiwicmVzdWx0X3VybCI6Imh0dHBzOi8vc2F2ZWFydHVhLmNvbS91YS9nb2Fscz9kb25hdGVkPXRydWUifQ==&signature=sdlUuuVwkg4WNxbeOxXcKdAxxE4=",
      value: "100 ₴",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIyNTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0KHQu9Cw0LLQsCDQo9C60YDQsNGX0L3RliEiLCJwdWJsaWNfa2V5IjoiaTk3ODM1MzYyMTgiLCJsYW5ndWFnZSI6InVrIiwicmVzdWx0X3VybCI6Imh0dHBzOi8vc2F2ZWFydHVhLmNvbS91YS9nb2Fscz9kb25hdGVkPXRydWUifQ==&signature=zJUzW2JBozrIZzfTq7aNoI/HqEk=",
      value: "250 ₴",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiI1MDAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0KHQu9Cw0LLQsCDQo9C60YDQsNGX0L3RliEiLCJwdWJsaWNfa2V5IjoiaTk3ODM1MzYyMTgiLCJsYW5ndWFnZSI6InVrIiwicmVzdWx0X3VybCI6Imh0dHBzOi8vc2F2ZWFydHVhLmNvbS91YS9nb2Fscz9kb25hdGVkPXRydWUifQ==&signature=ukASdkkNaEgvdKJkCTpkj8mxJNE=",
      value: "500 ₴",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCh0LvQsNCy0LAg0KPQutGA0LDRl9C90ZYhIiwicHVibGljX2tleSI6Imk5NzgzNTM2MjE4IiwibGFuZ3VhZ2UiOiJ1ayIsInJlc3VsdF91cmwiOiJodHRwczovL3NhdmVhcnR1YS5jb20vZW4vZ29hbHM/ZG9uYXRlZD10cnVlIn0=&signature=s01bw5mbqcvW1/xU+y6mJi7je/s=",
      value: "інше",
    },
  ],
  EUR: [
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIxMCIsImN1cnJlbmN5IjoiRVVSIiwiZGVzY3JpcHRpb24iOiJHbG9yeSB0byBVa3JhaW5lISIsInB1YmxpY19rZXkiOiJpOTc4MzUzNjIxOCIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9zYXZlYXJ0dWEuY29tL2VuL2dvYWxzP2RvbmF0ZWQ9dHJ1ZSJ9&signature=D4aAnLWCXW9qhFMwv0D6R/xa/ZM=",
      value: "10 €",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIyNSIsImN1cnJlbmN5IjoiRVVSIiwiZGVzY3JpcHRpb24iOiJHbG9yeSB0byBVa3JhaW5lISIsInB1YmxpY19rZXkiOiJpOTc4MzUzNjIxOCIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9zYXZlYXJ0dWEuY29tL2VuL2dvYWxzP2RvbmF0ZWQ9dHJ1ZSJ9&signature=Q5wLKI1Z0UeU60QdnfEZ0UqTB7Y=",
      value: "25 €",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiI1MCIsImN1cnJlbmN5IjoiRVVSIiwiZGVzY3JpcHRpb24iOiJHbG9yeSB0byBVa3JhaW5lISIsInB1YmxpY19rZXkiOiJpOTc4MzUzNjIxOCIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9zYXZlYXJ0dWEuY29tL2VuL2dvYWxzP2RvbmF0ZWQ9dHJ1ZSJ9&signature=edGxsWGMUVev6Dp6UCurz2dQyFI=",
      value: "50 €",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIwIiwiY3VycmVuY3kiOiJFVVIiLCJkZXNjcmlwdGlvbiI6Ikdsb3J5IHRvIFVrcmFpbmUhIiwicHVibGljX2tleSI6Imk5NzgzNTM2MjE4IiwibGFuZ3VhZ2UiOiJlbiIsInJlc3VsdF91cmwiOiJodHRwczovL3NhdmVhcnR1YS5jb20vZW4vZ29hbHM/ZG9uYXRlZD10cnVlIn0=&signature=vdPR2ulD3s2MxpqwiyuOsTC86Qo=",
      value: "other",
    },
  ],
  USD: [
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIxMCIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJHbG9yeSB0byBVa3JhaW5lISIsInB1YmxpY19rZXkiOiJpOTc4MzUzNjIxOCIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9zYXZlYXJ0dWEuY29tL2VuL2dvYWxzP2RvbmF0ZWQ9dHJ1ZSJ9&signature=077OnNUHKAC1VxMFB7bBXV25H74=",
      value: "10 $",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIyNSIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJHbG9yeSB0byBVa3JhaW5lISIsInB1YmxpY19rZXkiOiJpOTc4MzUzNjIxOCIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9zYXZlYXJ0dWEuY29tL2VuL2dvYWxzP2RvbmF0ZWQ9dHJ1ZSJ9&signature=63qtSNlapfCfpZ08qLbMrHB0E+0=",
      value: "25 $",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiI1MCIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJHbG9yeSB0byBVa3JhaW5lISIsInB1YmxpY19rZXkiOiJpOTc4MzUzNjIxOCIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9zYXZlYXJ0dWEuY29tL2VuL2dvYWxzP2RvbmF0ZWQ9dHJ1ZSJ9&signature=daQyjsAfA1YINYk+LjNryP/4OcU=",
      value: "50 $",
    },
    {
      link: "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIwIiwiY3VycmVuY3kiOiJVU0QiLCJkZXNjcmlwdGlvbiI6Ikdsb3J5IHRvIFVrcmFpbmUhIiwicHVibGljX2tleSI6Imk5NzgzNTM2MjE4IiwibGFuZ3VhZ2UiOiJlbiIsInJlc3VsdF91cmwiOiJodHRwczovL3NhdmVhcnR1YS5jb20vZW4vZ29hbHM/ZG9uYXRlZD10cnVlIn0=&signature=cWyBJageb6vZ9bH2uG9ypbuXfO8=",
      value: "other",
    },
  ],
};

const eventTrack = (label) => {
  ReactGA.event({
    category: "Donation pop-up",
    action: "Donation",
    label: label,
  });
};

export default function TimerPopUp(props) {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    let interval = null;
    if (seconds < 2400) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 100);
      }, 100);
    } else if (seconds !== 0) {
      setSeconds(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const eventHandler = (index) => {
    if (index === 0) {
      eventTrack('small');
    } else if (index === 1) {
      eventTrack('medium');
    } else if (index === 2) {
      eventTrack('large');
    } else {
      eventTrack('other');
    }
  };

  const getAnimationState = () => {
    if (seconds >= 400 && seconds < 900) {
      return <img src={Church} className={s.church} alt={"church"} />;
    }
    if (seconds >= 900 && seconds < 1400) {
      return (
        <>
          <img src={Church} className={s.church} alt={"church"} />
          <img src={Mesile} className={s.mesile} alt={"mesile"} />
        </>
      );
    }
    if (seconds >= 1400 && seconds < 1900) {
      return (
        <>
          <img src={Church} className={s.church} alt={"church"} />
          <img src={Explosion} className={s.explosion} alt={"explosion"} />
        </>
      );
    }
    if (seconds >= 1900 && seconds < 2400) {
      return <img src={ChurchDestoyed} className={s.church} alt={"church"} />;
    }
  };

  return (
    <div
      className={status ? s.blurHide : s.blur}
      onAnimationEnd={() => {
        if (status) {
          props.close();
        }
      }}
    >
      <div className={s.content}>
        <div className={`${s.headerLine} ${s.content2}`}>
          <div className={s.title}>
            {i18n.t("donatePopup.title.1")}
            <span>{i18n.t("donatePopup.title.2")}</span>
            {i18n.t("donatePopup.title.3")}
            <span>{i18n.t("donatePopup.title.4")}</span>
            {i18n.t("donatePopup.title.5")}
          </div>
          <div
            className={s.close}
            onClick={() => {
              setStatus(true);
            }}
          ></div>
        </div>
        <div className={s.animation} style={{ display: "none" }}>
          <img src={MapImg} className={s.imgMap} alt={"Ukraine map"} />
          {getAnimationState()}
        </div>
        <div className={s.animation2}>
          <img src={Sheva} className={s.sheva} alt="Шевченко" />
          <div className={s.dialog}>
            <div>
              {i18n.t("donatePopup.dialog.1")}
              <br />
              {i18n.t("donatePopup.dialog.2")}
              <br />
              {i18n.t("donatePopup.dialog.3")}
            </div>
          </div>
        </div>
        <div className={`${s.text} ${s.content2}`}>
          {i18n.t("donatePopup.help")}
        </div>
        <div className={`${s.moneyLine} ${s.content2}`}>
          {currencyArr[props.currency].map((el, index) => {
            if (index !== currencyArr[props.currency].length - 1) {
              return (
                <a
                  href={el.link}
                  key={el.value}
                  className={s.liqLink}
                  onClick={(index) => {
                    eventHandler(index);
                  }}
                >
                  {el.value}
                </a>
              );
            } else {
              return (
                <a
                  href={el.link}
                  key={el.value}
                  className={`${s.liqLink} ${s.other}`}
                  onClick={(index) => {
                    eventHandler(index);
                  }}
                >
                  {i18n.t("donatePopup.other")}
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
