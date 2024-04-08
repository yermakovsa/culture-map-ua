import { useState } from "react";
import s from "./Form.module.css";
import mainS from "../../App.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import PhotoIcon from "../../res/img/photoAdd.svg";
import Remove from "../../res/img/removeIcon.svg";
import { monumentApi } from "../../api/apiDeclaration";
import SuccessPopUp from "../../Components/SuccessPopUp/SuccessPopUp";
import i18n from "../../i18n";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

export default function Form(props) {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  const [fields, setFields] = useState([
    {
      name: "placeName",
      placeholder: "form.name",
      value: "",
    },
    {
      name: "placeAddress",
      placeholder: "form.address",
      value: "",
    },
    {
      name: "destructionDate",
      placeholder: "form.date",
      value: "",
    },
    {
      name: "personalInfo",
      placeholder: "form.info",
      value: "",
    },
  ]);

  const [photos, setPhotos] = useState([]);
  const [hover, setHover] = useState(null);
  const [success, setSuccess] = useState(0);

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
    if (index === fields.length - 1) {
      return (
        <textarea
          key={field.name}
          className={s.input}
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
        className={s.input}
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

  const Photos = photos.map((photo, index) => {
    return (
      <div
        className={s.photoPreview}
        key={`${index}photo`}
        onMouseOver={() => {
          setHover(index);
        }}
        onMouseLeave={() => {
          setHover(null);
        }}
      >
        <img src={photo.imagePreview} />
        {hover === index ? (
          <div
            className={s.remove}
            onClick={() => {
              const copy = photos.concat();
              copy.splice(index, 1);
              setPhotos(copy);
              setHover(null);
            }}
          >
            <img src={Remove} />
          </div>
        ) : null}
      </div>
    );
  });

  const isValid = () => {
    let valid = true;
    fields.forEach((field) => {
      valid = !!field.value ? valid : false;
    });
    return valid;
  };

  const send = async () => {
    try {
      const res = await monumentApi.createReportedMonument({
        reportedMonumentDTO: {
          name: fields[0].value,
          address: fields[1].value,
          destructionDate: fields[2].value,
          contactInformation: fields[3].value,
        },
      });
      // console.log(res);
      if (photos.length) {
        for (const photo of photos) {
          const result = await monumentApi.uploadReportedMonumentPhoto({
            queryParams: {
              id: res.id,
              fileName: photo.fileName,
            },
            base64FileDTO: { base64: photo.base64 },
          });
          // console.log(result);
        }
      }
      clear();
      setSuccess(1);
    } catch (err) {
      console.log(err);
      clear();
      setSuccess(-1);
    }
  };

  const clear = () => {
    setFields([
      {
        name: "placeName",
        placeholder: "form.name",
        value: "",
      },
      {
        name: "placeAddress",
        placeholder: "form.address",
        value: "",
      },
      {
        name: "destructionDate",
        placeholder: "form.date",
        value: "",
      },
      {
        name: "personalInfo",
        placeholder: "form.info",
        value: "",
      },
    ]);
    setPhotos([]);
  };

  return (
    <div className={`${mainS.mainDiv} ${s.mainDiv}`}>
      <Helmet>
        <title>{i18n.t("titles.report")}</title>
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
      <div className={`${mainS.container} ${s.container}`}>
        <div className={s.title}>
          {i18n.t("form.title.1")}
          <br />
          {i18n.t("form.title.2")}
        </div>
        {Fields}
        <div className={s.addText}>{i18n.t("form.photo")}</div>
        <div className={s.photoList}>
          {Photos}
          <label className={s.photoUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                try {
                  const res = await fileToDataUri(e.target.files[0]);
                  // console.log(res)
                  const index = res.indexOf("base64,");
                  const photo = {
                    imagePreview: res,
                    fileName: e.target.files[0].name,
                    base64: res.slice(index + 7),
                  };
                  let arr = photos.concat();
                  arr.push(photo);
                  setPhotos(arr);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
            <img src={PhotoIcon} />
          </label>
        </div>
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
      </div>
      <Footer />
    </div>
  );
}
