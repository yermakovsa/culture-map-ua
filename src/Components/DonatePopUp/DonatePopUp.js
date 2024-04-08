import s from "./DonatePopUp.module.css";
import { useState } from "react";
import Close from "../../res/img/closeDonate.svg";
import { monumentApi } from "../../api/apiDeclaration";
import i18n from "../../i18n";

export default function DonatePopUp(props) {
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });

  const [hide, setHide] = useState(false);

  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const changeHandler = (e) => {
    const copy = { ...email };
    copy.value = e.target.value;
    copy.valid = validateEmail(e.target.value);
    setEmail(copy);
  };

  const sendEmail = async (email) => {
    try {
      const res = await monumentApi.saveEmail({
        emailDTO: {
          email: email,
          language: i18n.language === "en" ? "en" : "ua",
        },
      });
      // console.log(res);
    } catch (err) {
      // console.log(err);
    }
  };

  const send = () => {
    if (email.valid) {
      sendEmail(email.value);
      setSuccess(true);
    }
  };

  return (
    <div
      className={hide ? s.blurDivHide : s.blurDiv}
      onAnimationEnd={() => {
        if (hide) {
          props.close();
        }
      }}
    >
      {success ? (
        <div className={s.form}>
          <div className={s.close}>
            <img
              src={Close}
              onClick={() => {
                setHide(true);
              }}
            />
          </div>
          <div className={s.title}>Дякуємо!</div>
          <div className={s.text}>
            Ми надішлемо Вам повідомлення, як тільки реалізуємо можливість
            відправки пожертвувань на відбудову історичної спадщини
          </div>
          <div className={s.line}>
            <div
              className={s.send}
              style={{ background: "#9ABE57" }}
              onClick={() => {
                setHide(true);
              }}
            >
              Добре
            </div>
          </div>
        </div>
      ) : (
        <div className={s.form}>
          <div className={s.close}>
            <img
              src={Close}
              onClick={() => {
                setHide(true);
              }}
            />
          </div>
          <div className={s.title}>Дякуємо!</div>
          <div className={s.text}>
            Ми дуже вдячні за Ваше бажання допомогти відбудувати Україну, але
            поки функція пожертви знаходиться в розробці. Щойно кнопка донату
            запрацює, ми можемо надіслати сповіщення Вам на пошту
          </div>
          <div className={s.line}>
            <input
              className={s.input}
              value={email.value}
              type="email"
              placeholder="Залиште нам свою пошту"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
            <div
              className={email.valid ? s.send : s.sendInvalid}
              onClick={send}
            >
              Надіслати
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
