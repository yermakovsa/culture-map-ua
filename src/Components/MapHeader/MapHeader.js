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
      {sizeStatus ? (
        <>
          {opened ? (
            <div
              className={opened === 2 ? s.mapHiding : s.mapOpened}
              onAnimationEnd={() => {
                if (opened === 2) {
                  setOpened(false)
                }
              }}
            >
              <div className={s.line}>
                <div
                  className={s.close}
                  onClick={() => {
                    setOpened(2)
                  }}
                >
                  <hr className={s.Hr1} />
                  <hr className={s.Hr2} />
                </div>
                <img
                  className={s.flag}
                  src={i18n.language !== 'en' ? enFlag : uaFlag}
                  onClick={() => {
                    changeLng()
                  }}
                />
              </div>
              <div className={s.linkContainer}>
                <Link to={`/${i18n.language}/`} className={s.link}>
                  {i18n.t('header.home')}
                </Link>
                <Link to={`/${i18n.language}/team`} className={s.link}>
                  {i18n.t('header.team')}
                </Link>
                <HashLink smooth to={`/${i18n.language}/goals#goals`} className={s.link}>
                  {i18n.t('header.goals')}
                </HashLink>
                {/* <Link to={`/${i18n.language}/partners`} className={s.link}>
                  {i18n.t('header.partners')}
                </Link> */}
                <Link to={`/${i18n.language}/help`} className={s.link}>
                  {i18n.t('header.help')}
                </Link>
                <Link to={`/${i18n.language}/goals`} className={`${s.link} ${s.donateLink}`}>
                  {i18n.t('donate')}
                </Link>
              </div>
              <div className={s.contacts}>
                <a href='https://instagram.com/saveartua?igshid=YmMyMTA2M2Y=' target='_blank'>
                  <img src={Inst} />
                </a>
                <a href='https://t.me/saveartua' target='_blank'>
                  <img src={Tg} />
                </a>
                <a href='https://www.facebook.com/Save-Art-UA-107470058617201/' target='_blank'>
                  <img src={Fb} />
                </a>
                <a href='https://www.linkedin.com/company/saveartua/' target='_blank'>
                  <img src={In} />
                </a>
                <a href='https://twitter.com/SaveArtUA' target='_blank'>
                  <img src={Tw} />
                </a>
                <a href='mailto:contact@saveartua.com'>
                  <img src={Mail} />
                </a>
              </div>
            </div>
          ) : null}
          <div className={s.headerContainer}>
            <div className={s.header}>
              <div
                className={s.menu}
                onClick={() => {
                  setOpened(true)
                }}
              >
                <hr className={s.hr1} />
                <hr className={s.hr2} />
              </div>
              <Link to={`/${i18n.language}/`} className={s.logo}>
                <img src={Logo} />
              </Link>
              <Link to={`/${i18n.language}/goals`} className={s.donate}>
                {i18n.t('donate')}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            className={s.langChange}
            src={i18n.language !== 'en' ? enFlag : uaFlag}
            onClick={() => {
              changeLng()
            }}
          />
          <div className={s.headerContainer}>
            <div className={s.header}>
              <div
                className={s.menu}
                onClick={() => {
                  setOpened(!opened)
                }}
              >
                {i18n.t('header.menu')}
              </div>
              <Link to={`/${i18n.language}/`}>
                <div className={s.logo}>
                  <img src={Logo} />
                </div>
              </Link>
              <Link to={`/${i18n.language}/goals`} className={s.donate}>
                {i18n.t('donate')}
              </Link>
            </div>
            {opened ? (
              <div className={s.linkContainer}>
                <Link to={`/${i18n.language}/`} className={s.link}>
                  {i18n.t('header.home')}
                </Link>
                <Link to={`/${i18n.language}/team`} className={s.link}>
                  {i18n.t('header.team')}
                </Link>
                <HashLink smooth to={`/${i18n.language}/goals#goals`} className={s.link}>
                  {i18n.t('header.goals')}
                </HashLink>
                {/* <Link to={`/${i18n.language}/partners`} className={s.link}>
                  {i18n.t('header.partners')}
                </Link> */}
                <Link to={`/${i18n.language}/help`} className={s.link}>
                  {i18n.t('header.help')}
                </Link>
                <img
                  className={s.flag}
                  src={i18n.language !== 'en' ? enFlag : uaFlag}
                  onClick={() => {
                    changeLng()
                  }}
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  )
}
