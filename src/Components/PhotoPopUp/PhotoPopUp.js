import { useEffect, useState } from "react";
import s from "./PhotoPopUp.module.css";
import Close from "../../res/img/closePhoto.svg";

export default function PhotoPopUp(props) {
  const [selected, setSelected] = useState(0);

  const Photos = props.photos.map((photo, index) => {
    if (index === selected) {
      return <img src={photo} className={s.photoSelected} />;
    } else {
      return (
        <img
          src={photo}
          className={s.photo}
          onClick={() => {
            setSelected(index);
          }}
        />
      );
    }
  });

  return (
    <div className={s.blurDiv}>
      <div className={s.photoShown}>
        <img src={props.photos[selected]} className={s.img}/>
        <img className={s.close} src={Close} onClick={props.close} />
        <div
          className={s.prev}
          onClick={() => {
            if (selected !== 0) {
              setSelected(selected - 1);
            } else {
              setSelected(props.photos.length - 1);
            }
          }}
        ></div>
        <div
          className={s.next}
          onClick={() => {
            if (selected !== props.photos.length - 1) {
              setSelected(selected + 1);
            } else {
              setSelected(0);
            }
          }}
        ></div>
      </div>
      <div className={s.photoList}>{Photos}</div>
    </div>
  );
}
