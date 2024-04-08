import { useCallback, useEffect, useRef, useState } from 'react'
import { cx } from 'linaria'

import s from './LandingSlider.module.css'
import mainS from '../../App.module.css'
import Arrow from '../../res/img/sliderArrow.svg'
import i18n from '../../i18n'

let timer

const cards = [
  {
    name: 'Свято-Успенська Святогірська лавра',
    image: require('../../res/img/monuments/0.jpg'),
  },
  {
    name: 'Музей українських старожитностей Тарновського. XIX століття',
    image: require('../../res/img/monuments/1.jpg'),
  },
  {
    name: 'Свято-Георгіївська церква, Заворичі',
    image: require('../../res/img/monuments/2.jpg'),
  },
  {
    name: 'Корпус економічного факультету ХНУ ім. В. Н. Каразіна',
    image: require('../../res/img/monuments/3.jpg'),
  },
  {
    name: 'Зруйнована церква в Маріуполі',
    image: require('../../res/img/monuments/4.jpg'),
  },
  {
    name: 'Національний літературно-меморіальний музей Г. С. Сковороди',
    image: require('../../res/img/monuments/5.jpg'),
  },
  {
    name: 'Церква святителя Феодосія',
    image: require('../../res/img/monuments/6.jpg'),
  },
  {
    name: 'Харківська облдержадміністрація',
    image: require('../../res/img/monuments/7.jpg'),
  },
  {
    name: 'Будівля краєзнавчого музею в Охтирці',
    image: require('../../res/img/monuments/8.jpg'),
  },
]

const getSlides = () => {
  const arr = []
  arr.push({ cards: cards.slice(0, 3), active: false })
  arr.push({ cards: cards.slice(3, 6), active: false })
  arr.push({ cards: cards.slice(6, 9), active: false })
  return arr
}

export const LandingSlider = () => {
  const [hover, setHover] = useState(false)

  // const [direction, setDirection] = useState(0)
  const [scrollActionAllowed, setScrollActionAllowed] = useState(true)
  const [x, setX] = useState(0)
  const sliderRef = useRef()

  const [cardArr, setCardArr] = useState([
    {
      name: 'Свято-Успенська Святогірська лавра',
      nameEN: 'Sviatohirsk Lavra or the Sviatohirsk Cave Monastery',
      image: require('../../res/img/monuments/0.jpg'),
    },
    {
      name: 'Музей українських старожитностей Тарновського. XIX століття',
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
  ])

  const [current, setCurrent] = useState(0)

  const Cards = cardArr.map((card) => {
    return (
      <div className={s.card} key={card.name} style={{ backgroundImage: `url("${card.image}")` }}>
        <div className={cx(s.name, mainS.caption2)}>{i18n.language === 'en' ? card.nameEN : card.name}</div>
      </div>
    )
  })

  const getNewCurrent = (direction) => {
    if (direction === 1) {
      return current === cardArr.length - 3 ? 0 : current + 1
    } else {
      return current === 0 ? cardArr.length - 3 : current - 1
    }
  }

  const scrollHandler = useCallback(() => {
    if (scrollActionAllowed) {
      // console.log('allowed')
      if (x < sliderRef.current.scrollLeft) {
        setCurrent(getNewCurrent(1))
      } else {
        setCurrent(getNewCurrent(-1))
      }
      sliderRef.current.style.overflowX = 'hidden'
      setScrollActionAllowed(false)
    }
    if (sliderRef.current.scrollLeft === current * 352) {
      // console.log('here')
      sliderRef.current.style.overflowX = 'scroll'
      setScrollActionAllowed(true)
    }
    setX(sliderRef.current.scrollLeft)
  }, [x, scrollActionAllowed, current])

  useEffect(() => {
    if (hover) {
      clearInterval(timer)
      if (sliderRef.current) {
        setX(sliderRef.current.scrollLeft)
        sliderRef.current.addEventListener('scroll', scrollHandler)
        return () => sliderRef.current.removeEventListener('scroll', scrollHandler)
      }
    } else {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('scroll', scrollHandler)
      }
      timer = setInterval(() => {
        setCurrent(getNewCurrent(1))
      }, 3000)
    }
    return () => clearInterval(timer)
  }, [scrollHandler, hover])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: current * 352, behavior: 'smooth' })
    }
  }, [current])

  return (
    <div
      className={s.sliderContainer}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <div
        className={hover ? s.prevArrow : cx(s.prevArrow, s.hidden)}
        onClick={() => {
          setScrollActionAllowed(false)
          setCurrent(getNewCurrent(-1))
        }}
      >
        <img src={Arrow} />
      </div>
      <div className={s.slider} ref={sliderRef}>
        {Cards}
      </div>
      <div
        className={hover ? s.nextArrow : cx(s.nextArrow, s.hidden)}
        onClick={() => {
          setScrollActionAllowed(false)
          setCurrent(getNewCurrent(1))
        }}
      >
        <img src={Arrow} />
      </div>
    </div>
  )
}
