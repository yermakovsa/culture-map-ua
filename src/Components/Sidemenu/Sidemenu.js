import s from "./Sidemenu.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import i18n from "../../i18n";
import { monumentApi } from "../../api/apiDeclaration";
import Back from "../../res/img/back.svg";
import Build from "../../res/img/build.svg";
import Destroy from "../../res/img/destroy.svg";
import Default from "../../res/img/default.svg";
import PhotoPopUp from "../PhotoPopUp/PhotoPopUp";
import listIcon from "../../res/img/listIcon.svg";
import BackSmall from "../../res/img/backSmall.svg";
import Hide from "../../res/img/hide.svg";
import OpenPhoto from "../../res/img/openPhoto.svg";
// import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import monumentsUA from "../../locales/monumentsUA.json"
import monumentsEN from "../../locales/monumentsEN.json"

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  if (width <= 690) {
    return true;
  } else {
    return false;
  }
};

const setBackPhoto = () => {
  const { innerWidth: width, innerHeight: height } = window;
  if (width <= 1100) {
    return BackSmall;
  } else {
    return Back;
  }
};

export default function Sidemenu(props) {
  // console.log(props.monuments.filter((el) => el.type === "UNIVERSITY"));
  const [discription, setDiscription] = useState(null);
  const [hover, setHover] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  const [photoShow, setPhotoShow] = useState(null);
  const [sizeStatus, setSizeStatus] = useState(getSize());
  const [showList, setShowList] = useState(false);
  const [backBtn, setBackBtn] = useState(setBackPhoto());
  const [photoHover, setPhotoHover] = useState(false);
  const [y, setY] = useState(0);
  const [showSearch, setShowSearch] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [fromList, setFromList] = useState(false);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setSizeStatus(getSize());
      setBackBtn(setBackPhoto());
      if (getSize()) {
        setPhotoShow(null);
      }
    }
    // document.body.style.touchAction = 'none'
    // document.body.style['ms' + 'touchAction'] = 'none'
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMonumentDisc = async (id) => {
    try {
      // console.log(id);
      const tmpRes = i18n.language === 'en' ? monumentsEN : monumentsUA;
      const res = tmpRes.monuments.find(mon => mon.id === id);

      // console.log(res);
      const photos = res.photos?.length
        ? res.photos.map((photo) => {
            return photo.publicFileUrl;
          })
        : [Default];
      setDiscription({
        id: res.id,
        lat: res.coordinates.lat,
        lon: res.coordinates.lon,
        builtDate: res.constructionDate,
        ruinedDate: res.destructionDate,
        images: photos,
        name: res.name,
        address: res.address,
        description: res.description,
        status: res.status,
        level: res.level,
        ownership: res.ownership,
      });
      if (sizeStatus) {
        setShowList(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStatus = (status) => {
    if (i18n.language === "en") {
      switch (status) {
        case "DAMAGED":
          return "damaged";
        case "PARTIALLY_DESTROYED":
          return "partially destroyed";
        case "COMPLETELY_DESTROYED":
          return "destroyed";
        default:
          return "damaged";
      }
    } else {
      switch (status) {
        case "DAMAGED":
          return "пошкоджено";
        case "PARTIALLY_DESTROYED":
          return "частково зруйновано";
        case "COMPLETELY_DESTROYED":
          return "знищено";
        default:
          return "пошкоджено";
      }
    }
  };

  // console.log(props.monuments);

  useEffect(() => {
    if (props.selectedId) {
      getMonumentDisc(props.selectedId);
    }
  }, [props.selectedId, i18n.language]);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  // console.log(props.monuments)

  const Monuments = props?.monuments
    ? props.monuments
        .filter((monument) => {
          if (filter) {
            if (filter === "MUSICIAN") {
              if (filter === monument.type || monument.type === "COSTEL") {
                return monument;
              }
            } else {
              if (filter === monument.type) {
                return monument;
              }
            }
          } else {
            return monument;
          }
        })
        .filter((monument) => {
          if (search) {
            if (
              monument.name.toLowerCase().includes(search.toLowerCase()) ||
              monument.address.toLowerCase().includes(search.toLowerCase()) ||
              monument.description.toLowerCase().includes(search.toLowerCase())
            ) {
              return monument;
            }
          } else {
            return monument;
          }
        })
        .map((monument) => {
          return (
            <div
              className={s.item}
              key={monument.id}
              onMouseOver={() => {
                if (!sizeStatus) {
                  setHover(monument.id);
                }
              }}
              onMouseLeave={() => {
                if (!sizeStatus) {
                  setHover(null);
                }
              }}
              onClick={() => {
                props.setSelected(monument.id);
                setFromList(true);
                // setDiscription()
                // console.log("here");
              }}
            >
              {hover === monument.id ? (
                <div className={s.openItem}>{i18n.t("map.open")}</div>
              ) : null}
              <img
                src={
                  monument.photos?.length
                    ? monument.photos[0].publicFileUrl
                    : Default
                }
                alt={monument.name}
              />
              <div className={s.itemInfo}>
                <div className={s.name}>{monument.name}</div>
                <div className={s.address}>{monument.address}</div>
                <div className={s.statsList}>
                  <div className={s.stat}>
                    <img src={Build} />
                    <div>{monument.constructionDate}</div>
                  </div>
                  <div className={s.stat}>
                    <img src={Destroy} />
                    <div>{monument.destructionDate}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
    : null;

  const scrollList = useCallback(() => {
    if (
      containerRef.current.scrollTop > 0 &&
      containerRef.current.scrollTop + containerRef.current.clientHeight <
        containerRef.current.scrollHeight
    ) {
      if (y > containerRef.current.scrollTop) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
      setY(containerRef.current.scrollTop);
    } else if (containerRef.current.scrollTop <= 0) {
      setShowSearch(true);
      setY(0);
    } else {
      setShowSearch(false);
      setY(
        containerRef.current.scrollHeight - containerRef.current.clientHeight
      );
    }
  }, [y]);

  useEffect(() => {
    if (showList && sizeStatus) {
      if (containerRef.current) {
        containerRef.current.addEventListener("scroll", scrollList);
        return () => {
          if (containerRef.current) {
            containerRef.current.removeEventListener("scroll", scrollList);
          }
        };
      }
    }
  }, [showList, sizeStatus, discription, scrollList]);

  useEffect(() => {
    if (showList && sizeStatus && !discription) {
      setShowSearch(true);
    }
  }, [showList, sizeStatus, discription]);

  const getCurrentImg = useCallback(() => {
    // console.log(imgRef.current.clientWidth)
    let index = Math.round(
      (imgRef.current.scrollLeft * discription?.images.length) /
        imgRef.current.scrollWidth
    );
    // console.log(index);
    setCurrentImg(index);
  }, [currentImg]);

  useEffect(() => {
    if (showList && sizeStatus && discription) {
      if (imgRef.current) {
        // console.log(imgRef.current.scrollWidth);
        imgRef.current.addEventListener("scroll", getCurrentImg);
        return () => {
          if (imgRef.current) {
            imgRef.current.removeEventListener("scroll", getCurrentImg);
          }
        };
      }
    }
  }, [showList, sizeStatus, discription, getCurrentImg]);

  return sizeStatus ? (
    showList ? (
      <>
        <div className={s.blurDiv}></div>
        <div
          className={showList === 2 ? s.containerHide : s.container}
          onAnimationEnd={() => {
            if (showList === 2) {
              setShowList(false);
            }
          }}
          style={
            discription
              ? { padding: "0px", overflowY: "auto" }
              : { overflowY: "hidden" }
          }
        >
          {discription ? (
            <div className={s.fullDescription}>
              <div className={s.test}>
                <img
                  className={s.back}
                  src={backBtn}
                  onClick={() => {
                    // console.log('clicked')
                    setHover(null);
                    setCurrentImg(0);
                    setDiscription(null);
                    props.setSelected(null);
                    // containerRef.current = null;
                    if (!fromList) {
                      setShowList(2);
                    }
                    setFromList(false);
                  }}
                />
                <div className={s.imgDiv} ref={imgRef}>
                  {discription.images.map((image, index) => {
                    return (
                      <img
                        className={s.photo}
                        src={image}
                        key={`photo${index}`}
                        alt={discription.name}
                      />
                    );
                  })}
                </div>
                <div className={s.navBar}>
                  {discription.images.map((image, index) => {
                    return (
                      <div
                        className={index === currentImg ? s.dotActive : s.dot}
                        style={index === 0 ? { marginLeft: "0px" } : {}}
                        key={`dot${index}`}
                      ></div>
                    );
                  })}
                </div>
              </div>

              <div className={s.content}>
                <div className={s.title}>{discription.name}</div>
                <div className={s.address}>{discription.address}</div>
                <hr />
                <div className={s.stats}>
                  <div className={s.line}>
                    <div className={s.statName}>{i18n.t("map.built")}:</div>
                    <div>{discription.builtDate}</div>
                  </div>
                  <div className={s.line}>
                    <div className={s.statName}>{i18n.t("map.destroyed")}:</div>
                    <div>{discription.ruinedDate}</div>
                  </div>
                  <div className={s.line}>
                    <div className={s.statName}>{i18n.t("map.status")}:</div>
                    <div>{getStatus(discription.status)}</div>
                  </div>
                  {/* <div className={s.line}>
                    <div className={s.statName}>Реєстр:</div>
                    <div>{getLevel(discription.level)}</div>
                  </div>
                  <div className={s.line}>
                    <div className={s.statName}>Форма власності:</div>
                    <div>{getOwner(discription.ownership)}</div>
                  </div> */}
                </div>
                <hr />
                <div className={s.info}>{discription.description}</div>
              </div>
            </div>
          ) : (
            <>
              <div
                className={s.hide}
                onClick={() => {
                  setShowList(2);
                }}
              >
                <img src={Hide} />
              </div>
              {showSearch ? (
                <div>
                  <input
                    className={s.search}
                    value={search}
                    type="text"
                    placeholder={i18n.t("map.search")}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                  />
                  <div className={s.filters}>
                    <div
                      onClick={(e) => {
                        if (filter !== "MUSICIAN") {
                          setFilter("MUSICIAN");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "MUSICIAN"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.church")}
                    </div>
                    <div
                      onClick={(e) => {
                        if (filter !== "WRITER") {
                          setFilter("WRITER");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "WRITER"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.museum")}
                    </div>
                    <div
                      onClick={(e) => {
                        if (filter !== "ACTOR") {
                          setFilter("ACTOR");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "ACTOR"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.monument")}
                    </div>
                    {/* <div
                      onClick={(e) => {
                        if (filter !== "COSTEL") {
                          setFilter("COSTEL");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "COSTEL"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.costel")}
                    </div> */}
                    <div
                      onClick={(e) => {
                        if (filter !== "FASHION") {
                          setFilter("FASHION");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "FASHION"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.library")}
                    </div>
                    <div
                      onClick={(e) => {
                        if (filter !== "FILMMAKER") {
                          setFilter("FILMMAKER");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "FILMMAKER"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.admin")}
                    </div>
                    <div
                      onClick={(e) => {
                        if (filter !== "HISTORICAL") {
                          setFilter("HISTORICAL");
                        } else {
                          setFilter(null);
                        }
                      }}
                      className={
                        filter === "HISTORICAL"
                          ? s.filterItemSelected
                          : s.filterItem
                      }
                    >
                      {i18n.t("map.theatre")}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className={s.list} ref={containerRef}>
                {Monuments}
              </div>
            </>
          )}
        </div>
      </>
    ) : (
      <div
        className={s.openList}
        onClick={() => {
          setShowList(true);
        }}
      >
        <img src={listIcon} />
        <div>{i18n.t("map.list")}</div>
      </div>
    )
  ) : (
    <>
      {photoShow ? (
        <PhotoPopUp
          photos={photoShow}
          close={() => {
            setPhotoShow(null);
          }}
        />
      ) : null}
      <div className={s.container}>
        {discription ? (
          <div className={s.fullDescription}>
            {photoHover ? (
              <div
                className={s.openPhoto}
                onMouseLeave={() => {
                  setPhotoHover(false);
                }}
                onClick={() => {
                  if (discription.images[0] !== Default && !sizeStatus) {
                    setPhotoShow(discription.images);
                  }
                }}
              >
                <img src={OpenPhoto} />
              </div>
            ) : null}
            <img
              className={s.back}
              src={backBtn}
              onClick={() => {
                // console.log('clicked')
                setHover(null);
                setDiscription(null);
                props.setSelected(null);
              }}
            />
            <div
              onMouseOver={() => {
                if (discription.images[0] !== Default && !sizeStatus) {
                  setPhotoHover(true);
                }
              }}
              className={s.imgDiv}
            >
              <img className={s.photo} src={discription.images[0]} />
            </div>

            <div className={s.content}>
              <div className={s.title}>{discription.name}</div>
              <div className={s.address}>{discription.address}</div>
              <hr />
              <div className={s.stats}>
                <div className={s.line}>
                  <div className={s.statName}>{i18n.t("map.built")}:</div>
                  <div>{discription.builtDate}</div>
                </div>
                <div className={s.line}>
                  <div className={s.statName}>{i18n.t("map.destroyed")}:</div>
                  <div>{discription.ruinedDate}</div>
                </div>
                <div className={s.line}>
                  <div className={s.statName}>{i18n.t("map.status")}:</div>
                  <div>{getStatus(discription.status)}</div>
                </div>
                {/* <div className={s.line}>
                  <div className={s.statName}>Реєстр:</div>
                  <div>{getLevel(discription.level)}</div>
                </div>
                <div className={s.line}>
                  <div className={s.statName}>Форма власності:</div>
                  <div>{getOwner(discription.ownership)}</div>
                </div> */}
              </div>
              <hr />
              <div className={s.info}>{discription.description}</div>
            </div>
          </div>
        ) : (
          <>
            <input
              className={s.search}
              value={search}
              type="text"
              placeholder={i18n.t("map.search")}
              onChange={(e) => {
                changeHandler(e);
              }}
            />
            <div className={s.filters}>
              <div
                onClick={(e) => {
                  if (filter !== "MUSICIAN") {
                    setFilter("MUSICIAN");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "MUSICIAN" ? s.filterItemSelected : s.filterItem
                }
              >
                {i18n.t("map.church")}
              </div>
              <div
                onClick={(e) => {
                  if (filter !== "WRITER") {
                    setFilter("WRITER");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "WRITER" ? s.filterItemSelected : s.filterItem
                }
              >
                {i18n.t("map.museum")}
              </div>
              <div
                onClick={(e) => {
                  if (filter !== "ACTOR") {
                    setFilter("ACTOR");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "ACTOR" ? s.filterItemSelected : s.filterItem
                }
              >
                {i18n.t("map.monument")}
              </div>
              {/* <div
                onClick={(e) => {
                  if (filter !== "COSTEL") {
                    setFilter("COSTEL");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "COSTEL" ? s.filterItemSelected : s.filterItem
                }
              >
                {i18n.t("map.costel")}
              </div> */}
              <div
                onClick={(e) => {
                  if (filter !== "FASHION") {
                    setFilter("FASHION");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "FASHION" ? s.filterItemSelected : s.filterItem
                }
              >
                {i18n.t("map.library")}
              </div>
              <div
                onClick={(e) => {
                  if (filter !== "FILMMAKER") {
                    setFilter("FILMMAKER");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "FILMMAKER"
                    ? s.filterItemSelected
                    : s.filterItem
                }
              >
                {i18n.t("map.admin")}
              </div>
              <div
                onClick={(e) => {
                  if (filter !== "HISTORICAL") {
                    setFilter("HISTORICAL");
                  } else {
                    setFilter(null);
                  }
                }}
                className={
                  filter === "HISTORICAL" ? s.filterItemSelected : s.filterItem
                }
              >
                {i18n.t("map.theatre")}
              </div>
            </div>
            <div className={s.list}>{Monuments}</div>
          </>
        )}
      </div>
    </>
  );
}
