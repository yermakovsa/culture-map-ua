import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { HashLink } from 'react-router-hash-link'
import { cx } from 'linaria'

import mainS from '../../App.module.css'
import Header from '../../Components/Header/Header'
import i18n from '../../i18n'
import s from './Main.module.css'
import Footer from '../../Components/Footer/Footer'
import { LandingSlider } from '../../Components/LandingSlider/LandingSlider'
import Goal1 from '../../res/img/landing/goal1.svg'
import Goal2 from '../../res/img/landing/goal2.svg'
import Goal3 from '../../res/img/landing/goal3.svg'
import { TeamBlinker } from '../../Components/TeamBlinker/TeamBlinker'
import MinCult from '../../res/img/partners/mincult.svg'
import NSAU from '../../res/img/partners/NSAU.png'
import UK from '../../res/img/partners/ukCouncil.svg'
import UKF from '../../res/img/partners/UKF.svg'
import { useWindowDimensions } from '../../hooks/windowDimension'
import { MobileSlider } from '../../Components/LandingSlider/MobileSlider'
import Video from '../../res/img/bgvideo.mp4'

const storageName = 'previewSeen'

const eventTrack = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

export default function Main(props) {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
  const { width, height } = useWindowDimensions()

  const isMobile = () => {
    return width <= 690
  }

  return (
    <div className={cx(mainS.mainDiv, s.mainDiv)}>
      <Helmet>
        <title>{i18n.t('main.title')}</title>
      </Helmet>
      <Header open={props.open} />
      <div className={s.video}>
        <video autoPlay muted loop>
          <source src={Video} type="video/mp4"/>
        </video>
      </div>
      <div className={cx(mainS.container, s.headContainer)}>
        <h1
          className={mainS.mainTitle}
          dangerouslySetInnerHTML={isMobile() ? { __html: i18n.t('home.titleMob') } : { __html: i18n.t('home.title') }}
        />

        <div className={cx(s.subtitle, mainS.subtitle)}>{i18n.t('home.subtitle')}</div>
        <Link
          to={`/${i18n.language}/map`}
          className={cx(s.openMap, mainS.redBtn)}
          onClick={() => {
            eventTrack('Landing', 'Open map', 'Top')
          }}
        >
          {i18n.t('main.openMap')}
        </Link>
      </div>
      <div className={cx(mainS.container, s.monumentContainer)}>
        <h2 className={mainS.title}>{i18n.t('home.monumentsTitle')}</h2>
        {isMobile() ? <MobileSlider /> : <LandingSlider />}
        <div className={s.statsLine}>
          <div className={s.stat}>
            <h2 className={mainS.mainTitle}>500+</h2>
            <p className={isMobile() ? mainS.subtitle : mainS.mainText}>{i18n.t('home.500')}</p>
          </div>
          <div className={s.stat}>
            <h2 className={mainS.mainTitle}>100+</h2>
            <p className={isMobile() ? mainS.subtitle : mainS.mainText}>{i18n.t('home.100')}</p>
          </div>
          <div className={s.stat}>
            <h2 className={mainS.mainTitle}>50+</h2>
            <p className={isMobile() ? mainS.subtitle : mainS.mainText}>{i18n.t('home.50')}</p>
          </div>
        </div>
      </div>
      <div className={cx(mainS.container, s.goalsContainer)}>
        <h2 className={mainS.title}>{i18n.t('home.goalsTitle')}</h2>
        <div className={s.goalLine}>
          <div className={s.goalCard}>
            <div className={s.imageDiv}>
              <img src={Goal1} className={s.icon1} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : null)}>{i18n.t('home.goal.1')}</div>
          </div>
          <div className={s.goalCard}>
            <div className={s.imageDiv}>
              <img src={Goal2} className={s.icon2} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : null)}>{i18n.t('home.goal.2')}</div>
          </div>
          <div className={s.goalCard}>
            <div className={s.imageDiv}>
              <img src={Goal3} className={s.icon3} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : null)}>{i18n.t('home.goal.3')}</div>
          </div>
        </div>
        <Link to={`/${i18n.language}/goals`} className={cx(s.btn, mainS.redBtn)}>
          {i18n.t('home.help')}
        </Link>
      </div>
      <div className={cx(mainS.container, s.teamContainer)}>
        <h2 className={mainS.title}>{i18n.t('home.teamTitle')}</h2>
        <div className={s.teamLine}>
          <TeamBlinker />
          <div className={s.teamText}>
            <div className={isMobile() ? mainS.subtitle : mainS.mainText}>{i18n.t('home.teamText')}</div>
            <Link to={`/${i18n.language}/team`} className={cx(s.btn, mainS.redBtn)}>
              {i18n.t('home.about')}
            </Link>
          </div>
        </div>
      </div>
      <div className={cx(mainS.container, s.partnersContainer)}>
        <h2 className={mainS.title}>{i18n.t('home.partnersTitle')}</h2>
        <div className={s.partnersContent}>
          <div className={s.partnersCard}>
            <div className={s.imageDiv}>
              <img src={MinCult} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : mainS.caption2)}>{i18n.t('home.partner.1')}</div>
          </div>
          <div className={s.partnersCard}>
            <div className={s.imageDiv}>
              <img src={UKF} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : mainS.caption2)}>{i18n.t('home.partner.2')}</div>
          </div>
          <div className={s.partnersCard}>
            <div className={s.imageDiv}>
              <img src={UK} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : mainS.caption2)}>{i18n.t('home.partner.3')}</div>
          </div>
          <div className={s.partnersCard}>
            <div className={s.imageDiv}>
              <img src={NSAU} />
            </div>
            <div className={cx(s.text, isMobile() ? mainS.subtitle : mainS.caption2)}>{i18n.t('home.partner.4')}</div>
          </div>
        </div>
      </div>
      <div className={cx(mainS.container, s.mapContainer)}>
        <h2
          className={mainS.title}
          dangerouslySetInnerHTML={
            isMobile() ? { __html: i18n.t('home.mapTrigerMob') } : { __html: i18n.t('home.mapTriger') }
          }
        />
        <Link
          to={`/${i18n.language}/map`}
          className={cx(s.btn, mainS.redBtn)}
          onClick={() => {
            eventTrack('Landing', 'Open map', 'Top')
          }}
        >
          {i18n.t('main.openMap')}
        </Link>
      </div>
      <div className={cx(mainS.container, s.donateContainer)}>
        <h2
          className={mainS.title}
          dangerouslySetInnerHTML={
            isMobile() ? { __html: i18n.t('home.helpTrigerMob') } : { __html: i18n.t('home.helpTriger') }
          }
        />
        <div className={s.linkBlock}>
          <Link to={`/${i18n.language}/goals`} className={s.donateButton}>
            <div className={s.dollar}>₴</div>
            <h3>{i18n.t('donate')}</h3>
          </Link>
          <Link to={`/${i18n.language}/help`} className={cx(mainS.caption2, s.help)}>
            {i18n.t('home.otherHelp')}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
