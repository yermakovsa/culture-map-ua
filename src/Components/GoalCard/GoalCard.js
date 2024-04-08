import mainS from '../../App.module.css'
import s from './GoalCard.module.css'
import { useEffect, useState } from 'react'
import i18n from '../../i18n'
import P1 from '../../res/img/goals/1.jpg'
import P2 from '../../res/img/goals/2.jpg'
import P3 from '../../res/img/goals/3.jpg'
import Arrow from '../../res/img/goals/arrow.svg'
import { GoalPhotoList } from '../GoalPhotoList/GoalPhotoList'

export default function GoalCard() {
  const [money, setMoney] = useState({
    // current: window._env_.REACT_APP_DONATION_SUM,
    current: window._env_.REACT_APP_DONATION_SUM,
    all: window._env_.REACT_APP_DONATION_TARGET,
  })

  const [desc, setDesc] = useState(false)
  const [photos, setPhotos] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (photos) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [photos])

  const getDate = () => {
    const date = new Date()
    return i18n.language === 'ua'
      ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
      : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  useEffect(() => {
    if (i18n.language === 'en') {
      setMoney({
        current: Math.round(+window._env_.REACT_APP_DONATION_SUM / +window._env_.REACT_APP_USD_UAH_EXCHANGE_RATE),
        all: Math.round(+window._env_.REACT_APP_DONATION_TARGET / +window._env_.REACT_APP_USD_UAH_EXCHANGE_RATE),
      })
    } else {
      setMoney({
        current: window._env_.REACT_APP_DONATION_SUM,
        all: window._env_.REACT_APP_DONATION_TARGET,
      })
    }
  }, [i18n.language])

  const getMoneyStroke = (num) => {
    let stroke = ''
    let val = `${num}`
    for (let i = val.length - 1; i >= 0; i--) {
      if ((val.length - i) % 3 === 0 && i !== val.length - 1) {
        stroke += `${val[i]} `
      } else {
        stroke += val[i]
      }
    }

    return stroke.split('').reverse().join('') + (i18n.language === 'ua' ? ' ₴' : ' $')
  }

  const textBlock =
    i18n.language === 'ua' ? (
      <div className={s.description}>
        Чернігівський обласний художній музей імені Григорія Галагана був заснований у 1983 р. у Чернігові. Фонд музею
        містить близько 16 000 експонатів. Музей містить не тільки мистецьку спадщину України (що датується з XVI ст.),
        а й полотна голландських, фламандських, французьких, італійських митців.
        <br />
        Від 24 лютого 2022 р. зали художнього музею імені Галагана спорожніли. Експонати перемістили в безпечне місце.
        Увечері 6 березня у двір музею прилетів ворожий снаряд. Як і у роки Другої світової війни, старовинна будівля
        зазнала пошкоджень: було вибито 30 вікон, побило меблі та техніку. Підлога, стеля, світильники залів також
        зазнали пошкоджень.
        <br /> Навіть під час обстрілів та облоги Чернігова музейники рятували колекцію. Експонати запаковували у плівку
        і поміщали у звичайні ящики. Працівники також усували наслідки обстрілу своїми силами: закривали вікна залів з
        картинами від доступу повітря, атмосферного впливу та мародерів.
        <br />
        Звісно, за таких умов картини не можуть зберігатися тривалий час, особливо в холодну пору, яка вже наближається.
        Саме тому Благодійний Фонд “SaveArtUA” оголошує збір коштів на суму 60 000 грн для покриття перших потреб музею,
        що включають протипожежні ковдри, поролон, пінопласт, мікалентний папір та інші матеріали, що можуть забезпечити
        якісне збереження експонатів у безпечному місці.
        <br />
        Росія цинічно намагалася навʼязати свою культуру українцям протягом століть. Для українців важливо зберегти
        зараз свою культуру, пронести її через пекло війни і передати нащадкам, адже культура – це основа будь-якої
        нації.
        <div className={s.subTitle}>Список захисних матеріалів:</div>
        <ul>
          <li>ковдра протипожежна (100 шт.) - 34 000 грн;</li>
          <li>поролон в листах (10 шт.) - 1 100 грн;</li>
          <li>пінопласт в гранулах (0.5 куб. м.) - 948 грн;</li>
          <li>крафтовий папір (3 рулони) - 1 050 грн;</li>
          <li>плита ОСБ (10 шт.) - 4 820 грн;</li>
          <li>тканина базальтова (150 кв. м.) - 15 000 грн;</li>
          <li>мікалентний папір (50 рулонів) - 4 500 грн</li>
        </ul>
      </div>
    ) : (
      <div className={s.description}>
        The Chernihiv Regional Art Museum, named after Hryhoriy Galagan, was founded in 1983 in Chernihiv. The museum
        contains around 16,000 exhibits in total.
        <br />
        The museum does not only contain the artistic heritage of Ukraine (dating back to the 16th century), but it also
        houses paintings by Dutch, Flemish, French, and Italian artists.
        <br />
        Since February 24, 2022, the halls of the Galagan Art Museum have been emptied. The exhibits were moved to a
        safe place. On the evening of March 6, an enemy projectile flew into the museum courtyard. As in the years of
        the Second World War, the ancient building was damaged: 30 windows, furniture, and various appliances were
        broken. The floor, ceiling, and lights of the halls were also damaged.
        <br />
        Even during the shelling and siege of Chernihiv, museum workers saved the collection. The exhibits were wrapped
        in a membrane and placed in ordinary boxes. The workers also removed the consequences of the shelling through
        their own efforts: they closed the windows of the halls with paintings from the access to air, atmospheric
        influences, and marauders.
        <br />
        Of course, under such conditions, paintings cannot be stored for a long time, especially in the cold season,
        which is already approaching. That is why the "SaveArtUA" Charitable Fund announces a fundraiser of UAH 60,000
        to cover the first needs of the museum, which include fire blankets, foam rubber, foam, mica paper and other
        materials that can ensure the high-quality preservation of exhibits in a safe place.
        <br />
        Russia cynically tried to impose its culture on Ukrainians for centuries. Ukrainians must preserve their culture
        now, and carry it through the hell of war to pass on to our descendants because culture is the basis of any
        nation.
        <div className={s.subTitle}>List of protective materials:</div>
        <ul>
          <li>fire blanket (100 pcs.) - UAH 34,000;</li>
          <li>foam rubber in sheets (10 pcs.) - UAH 1,100;</li>
          <li>polyfoam in granules (0.5 cubic meters) - UAH 948;</li>
          <li>kraft paper (3 rolls) - UAH 1,050;</li>
          <li>OSB plate (10 pcs.) - UAH 4,820;</li>
          <li>basalt fabric (150 square meters) - UAH 15,000;</li>
          <li>mica paper (50 rolls) - UAH 4,500</li>
        </ul>
      </div>
    )

  return (
    <>
      {photos ? (
        <GoalPhotoList
          close={() => {
            setPhotos(false)
          }}
          selected={selected}
        />
      ) : null}
      <div className={s.container}>
        <div className={s.picked}>{i18n.t('goals.already')}</div>
        <div className={s.numLine}>
          <div className={s.current}>{getMoneyStroke(money.current)}</div>
          <div className={s.need}>{getMoneyStroke(money.all)}</div>
        </div>
        <div className={s.progressLine}>
          <div className={s.done} style={{ minWidth: `${(money.current * 100) / money.all}%` }}></div>
        </div>
        <div className={s.needSmall}>{getMoneyStroke(money.all)}</div>
        <div className={s.info}>
          <div className={s.desc}>
            <div className={s.name}>{i18n.t('goals.goalCard.name')}</div>
            <div className={s.address}>{i18n.t('goals.goalCard.address')}</div>
            <a className={s.link} href='https://www.facebook.com/galaganmuseum.art/' target='_blank'>
              {i18n.t('goals.goalCard.link')}
            </a>
            <div className={s.text}>
              {i18n.t('goals.goalCard.text.1')}
              <br />
              {i18n.t('goals.goalCard.text.2')}
            </div>
          </div>
          <div className={s.photoBlock}>
            <img
              className={s.main}
              src={require('../../res/img/goals/0.jpg')}
              onClick={() => {
                setSelected(0)
                setPhotos(true)
              }}
            />
            <div className={s.list}>
              <div
                className={s.photo}
                style={{ backgroundImage: `url(${P1})` }}
                onClick={() => {
                  setSelected(1)
                  setPhotos(true)
                }}
              ></div>
              <div
                className={s.photo}
                style={{ backgroundImage: `url(${P2})` }}
                onClick={() => {
                  setSelected(2)
                  setPhotos(true)
                }}
              ></div>
              <div
                className={s.photo}
                style={{ backgroundImage: `url(${P3})` }}
                onClick={() => {
                  setSelected(3)
                  setPhotos(true)
                }}
              >
                <div className={s.more}>5+</div>
              </div>
            </div>
          </div>
          <div className={s.textSmall}>
            {i18n.t('goals.goalCard.text.1')}
            <br />
            {i18n.t('goals.goalCard.text.2')}
          </div>
        </div>
        {desc ? textBlock : null}
        <div
          className={s.open}
          onClick={() => {
            setDesc(!desc)
          }}
        >
          <div>{desc ? i18n.t('goals.goalCard.close') : i18n.t('goals.goalCard.open')}</div>
          <img src={Arrow} style={desc ? { transform: 'rotate(180deg)' } : null} />
        </div>
      </div>
    </>
  )
}
