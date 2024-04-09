import { useState, useEffect } from 'react'
import s from './MapHeader.module.css'
import Logo from '../../res/img/logo.svg'
import { Link } from 'react-router-dom'
import uaFlag from '../../res/img/ua.svg'
import enFlag from '../../res/img/en.svg'
import Tg from '../../res/img/tg.svg'
import Fb from '../../res/img/fb.svg'
import Inst from '../../res/img/inst.svg'
import Mail from '../../res/img/mailIcon.svg'
import ReactGA from 'react-ga'
import In from '../../res/img/in.svg'
import Tw from '../../res/img/tw.svg'
import i18n from '../../i18n'
import { useNavigate } from 'react-router'
import { HashLink } from 'react-router-hash-link'

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window
  // console.log(width);
  if (width <= 690) {
    return true
  } else {
    return false
  }
}

const eventTrack = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

export default function MapHeader(props) {
  const [opened, setOpened] = useState(false)
  const [sizeStatus, setSizeStatus] = useState(getSize())
  const history = useNavigate()

  const changeLng = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ua')
      let pathname = window.location.pathname
      // console.log(pathname)
      // console.log(pathname.slice(1).indexOf('/'))
      // console.log(pathname.slice(pathname.slice(1).indexOf('/') + 1))
      history('/ua' + pathname.slice(pathname.slice(1).indexOf('/') + 1))
    } else {
      i18n.changeLanguage('en')
      let pathname = window.location.pathname
      // console.log(pathname)
      // console.log(pathname.slice(1).indexOf('/'))
      // console.log(pathname.slice(pathname.slice(1).indexOf('/') + 1))
      history('/en' + pathname.slice(pathname.slice(1).indexOf('/') + 1))
    }
  }

  useEffect(() => {
    function handleResize() {
      setSizeStatus(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
       <img
            className={s.langChange}
            src={i18n.language !== 'en' ? enFlag : uaFlag}
            onClick={() => {
              changeLng()
            }}
          />    </>
  )
}
