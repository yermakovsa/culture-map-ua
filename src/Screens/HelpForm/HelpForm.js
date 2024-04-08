import mainS from "../../App.module.css";
import s from "./HelpForm.module.css";
import r from "../Form/Form.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SuccessPopUp from "../../Components/SuccessPopUp/SuccessPopUp";
import { useState } from "react";
import { monumentApi } from "../../api/apiDeclaration";
import i18n from "../../i18n";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function HelpForm(props) {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  const [fields, setFields] = useState([
    {
      name: "personName",
      placeholder: "help.name",
      value: "",
    },
    {
      name: "personAddress",
      placeholder: "help.address",
      value: "",
    },
    {
      name: "personContacts",
      placeholder: "help.contacts",
      value: "",
    },
    {
      name: "personalInfo",
      placeholder: "help.comment",
      value: "",
    },
  ]);

  const [success, setSuccess] = useState(0);
  const [type, setType] = useState(1);

  const changeHandler = (e, name) => {
    const copy = fields.concat();
    copy.forEach((field) => {
      if (field.name === name) {
        field.value = e.target.value;
      }
    });
    setFields(copy);
  };

  const Fields = fields.map((field, index) => {
    if (index === fields.length - 1 || index === fields.length - 2) {
      return (
        <textarea
          key={field.name}
          className={r.input}
          value={field.value}
          placeholder={i18n.t(field.placeholder)}
          name={field.name}
          onChange={(e) => {
            changeHandler(e, field.name);
          }}
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="off"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          rows="2"
          autoComplete="new-off"
          type="text"
        />
      );
    }
    return (
      <input
        key={field.name}
        className={r.input}
        value={field.value}
        placeholder={i18n.t(field.placeholder)}
        name={field.name}
        onChange={(e) => {
          changeHandler(e, field.name);
        }}
        autoComplete="new-off"
        type="text"
      />
    );
  });

  const send = async () => {
    try {
      let helpType;
      if (type === 1) {
        helpType = "VOLUNTEER";
      }
      if (type === 2) {
        helpType = "PUBLIC_ORGANISATION_MEMBER";
      }
      if (type === 3) {
        helpType = "ARCHITECT";
      }
      if (type === 0) {
        helpType = "OTHER";
      }
      const res = await monumentApi.savePersonHelp({
        personHelpDTO: {
          name: fields[0].value,
          address: fields[1].value,
          contactInformation: fields[2].value,
          comment: fields[3].value,
          type: helpType,
        },
      });
      // console.log(res)
      setSuccess(1);
      clear();
    } catch (err) {
      console.log(err);
      setSuccess(-1);
      clear();
    }
  };

  const clear = () => {
    setFields([
      {
        name: "personName",
        placeholder: "help.name",
        value: "",
      },
      {
        name: "personAddress",
        placeholder: "help.address",
        value: "",
      },
      {
        name: "personContacts",
        placeholder: "help.contacts",
        value: "",
      },
      {
        name: "personalInfo",
        placeholder: "help.comment",
        value: "",
      },
    ]);
    setType(1);
  };

  const isValid = () => {
    let valid = true;
    fields.forEach((field) => {
      valid = !!field.value ? valid : false;
    });
    valid = !!type ? valid : false;
    return valid;
  };

  return (
    <div className={`${mainS.mainDiv} ${r.mainDiv}`}>
      <Helmet>
        <title>{i18n.t("titles.help")}</title>
      </Helmet>
      {success === 0 ? null : (
        <SuccessPopUp
          status={success}
          close={() => {
            setSuccess(0);
          }}
        />
      )}
      <Header open={props.open} />
      <div className={`${mainS.container} ${r.container}`}>
        <div className={r.title}>{i18n.t("help.title")}</div>
        <div className={s.pointLine}>
          <div
            className={s.variant}
            onClick={() => {
              if (type !== 1) {
                setType(1);
              } else {
                setType(0);
              }
            }}
          >
            <div className={s.point}>
              {type === 1 ? <div className={s.selected}></div> : null}
            </div>
            <div className={s.text}>{i18n.t("help.volunteer")}</div>
          </div>
          <div
            className={s.variant}
            onClick={() => {
              if (type !== 2) {
                setType(2);
              } else {
                setType(0);
              }
            }}
          >
            <div className={s.point}>
              {type === 2 ? <div className={s.selected}></div> : null}
            </div>
            <div className={s.text}>{i18n.t("help.member")}</div>
          </div>
          <div
            className={s.variant}
            onClick={() => {
              if (type !== 3) {
                setType(3);
              } else {
                setType(0);
              }
            }}
          >
            <div className={s.point}>
              {type === 3 ? <div className={s.selected}></div> : null}
            </div>
            <div className={s.text}>{i18n.t("help.architect")}</div>
          </div>
        </div>
        {Fields}
        <div className={s.btnLine}>
          <div
            className={isValid() ? s.send : s.sendDisabled}
            onClick={() => {
              if (isValid()) {
                send();
              }
            }}
          >
            {i18n.t("send")}
          </div>
          <Link to = {`/${i18n.language}/form`}>повідомити про руйнацію</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
