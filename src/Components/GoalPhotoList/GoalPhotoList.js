import { useEffect, useRef, useState } from "react";
import s from "./GoalPhotoList.module.css";
import Close from "../../res/img/goals/close.svg";

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  // console.log(width);
  if (width <= 690) {
    return true;
  } else {
    return false;
  }
};

export const GoalPhotoList = (props) => {
  const [close, setClose] = useState(false);
  const [selected, setSelected] = useState(0);
  const [sizeStatus, setSizeStatus] = useState(getSize());

  // console.log(sizeStatus);

  useEffect(() => {
    function handleResize() {
      setSizeStatus(getSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelected(props.selected);
  }, []);

  const PhotoList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((el, index) => {
    return (
      <img
        key={"photo-" + index}
        alt={"museum" + index}
        className={index === selected ? s.photoSelected : s.photo}
        src={require(`../../res/img/goals/${index}.jpg`)}
        onClick={() => {
          setSelected(index);
        }}
      />
    );
  });

  const closeHandler = (e) => {
    if (e.target.id === "main" && !sizeStatus) {
      setClose(true);
    }
  };

  return (
    <div
      className={close ? s.blurDivHide : s.blurDiv}
      onClick={(e) => {
        closeHandler(e);
      }}
      id="main"
      onAnimationEnd={() => {
        if (close) {
          props.close();
        }
      }}
    >
      <div className={s.close}>
        <img
          src={Close}
          onClick={() => {
            setClose(true);
          }}
        />
      </div>
      <div className={s.photoShown}>
        <img src={require(`../../res/img/goals/${selected}.jpg`)} />
        {selected > 0 ? (
          <div
            className={s.prev}
            onClick={() => {
              setSelected(selected - 1);
            }}
          ></div>
        ) : null}
        {selected < 12 ? (
          <div
            className={s.next}
            onClick={() => {
              setSelected(selected + 1);
            }}
          ></div>
        ) : null}
      </div>
      <div className={s.photoList}>{PhotoList}</div>
    </div>
  );
};
