import { useCallback, useEffect, useRef, useState } from 'react'
import { cx } from 'linaria'

import s from './MobileSlider.module.css'
import mainS from '../../App.module.css'
import Arrow from '../../res/img/sliderArrow.svg'
import i18n from '../../i18n'

let timer

const cards = [
  {
    name: 'Свято-Успенська Святогірська лавра',
    nameEN: 'Sviatohirsk Lavra or the Sviatohirsk Cave Monastery',
    image: require('../../res/img/monuments/0.jpg'),
  },
  {
    name: 'Музей українських старожитностей Тарновського, XIX століття',
    nameEN: 'Tarnovsky Museum of Ukrainian Antiquities, 19th century',
    image: require('../../res/img/monuments/1.jpg'),
  },
  {
    name: 'Свято-Георгіївська церква, Заворичі',
    nameEN: "St. George's Church, Zavorychi",
    image: require('../../res/img/monuments/2.jpg'),
  },
  {
    name: 'Корпус економічного факультету ХНУ ім. В. Н. Каразіна',
    nameEN: 'Faculty of Economics of KNU named after V. N. Karazina',
    image: require('../../res/img/monuments/3.jpg'),
  },
  {
    name: 'Зруйнована церква в Маріуполі',
    nameEN: 'The destroyed church in Mariupol',
    image: require('../../res/img/monuments/4.jpg'),
  },
  {
    name: 'Національний літературно-меморіальний музей Г. С. Сковороди',
    nameEN: 'National Literary and Memorial Museum of H.S. Skovoroda',
    image: require('../../res/img/monuments/5.jpg'),
  },
  {
    name: 'Церква святителя Феодосія',
    nameEN: 'Church of Saint Theodosius',
    image: require('../../res/img/monuments/6.jpg'),
  },
  {
    name: 'Харківська облдержадміністрація',
    nameEN: 'Kharkiv Regional State Administration',
    image: require('../../res/img/monuments/7.jpg'),
  },
  {
    name: 'Будівля краєзнавчого музею в Охтирці',
    nameEN: 'The building of the local history museum, Okhtyrka',
    image: require('../../res/img/monuments/8.jpg'),
  },
]

export const MobileSlider = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const getPrev = () => {
    return current === 0 ? cards.length - 1 : current - 1
  }

  const getNext = () => {
    return current === cards.length - 1 ? 0 : current + 1
  }

  const setNewCurrent = () => {
    if (direction === 1) {
      setCurrent(getNext())
    }
    if (direction === -1) {
      setCurrent(getPrev())
    }
    setDirection(0)
  }

  return (
    <div className={s.sliderContainer}>
      <div
        className={s.prevSection}
        onClick={() => {
          setDirection(-1)
        }}
      ></div>
      <img src={Arrow} className={s.prev} />
      <div className={s.slides}>
        <div
          className={cx(s.slide, !!direction && s.hideAnimation)}
          style={{ backgroundImage: `url("${cards[current].image}")` }}
        >
          <div className={s.info}>{i18n.language === 'en' ? cards[current].nameEN : cards[current].name}</div>
        </div>
        {!!direction && (
          <div
            className={cx(s.slide, s.hidden)}
            onAnimationEnd={setNewCurrent}
            style={{ backgroundImage: `url("${cards[direction === 1 ? getNext() : getPrev()].image}")` }}
          >
            <div className={s.info}>
              {i18n.language === 'en'
                ? cards[direction === 1 ? getNext() : getPrev()].nameEN
                : cards[direction === 1 ? getNext() : getPrev()].name}
            </div>
          </div>
        )}
      </div>
      <img src={Arrow} className={s.next} />
      <div
        className={s.nextSection}
        onClick={() => {
          setDirection(1)
        }}
      ></div>
    </div>
  )
}
