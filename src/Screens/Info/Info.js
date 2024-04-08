import { Link } from "react-router-dom";
import s from "../Error/Error.module.css";
import i18n from "../../i18n";

export default function Info() {
  return (
    <div className={s.container}>
      <div className={s.text1}>Контактна інформація</div>
      <div className={s.text2}>
        <br />
        <br />
        телефон: +380 67 117 7976
        <br />
        <br />
        email: info@saveartua.com
        <br />
        <br />
        адреса: м. Львів, проспект Червоної Калини 77, 188
      </div>
      <Link to={`/${i18n.language}/`} className={s.main}>
        {i18n.t("error.back")}
      </Link>
    </div>
  );
}
