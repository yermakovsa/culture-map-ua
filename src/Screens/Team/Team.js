import mainS from '../../App.module.css'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import i18n from '../../i18n'
import s from './Team.module.css'
import Mikola from '../../res/img/team/Mikola.png'
import Sergiy from '../../res/img/team/Sergiy.png'
import Artem from '../../res/img/team/Artem.svg'
import Irina from '../../res/img/team/Irina.png'
import Vlad from '../../res/img/team/Vlad.png'
import Bohdan from '../../res/img/team/Bohdan.png'
import Uriy from '../../res/img/team/Uriy.png'
import Orest from '../../res/img/team/Orest.png'
import Anna from '../../res/img/team/Anna.png'
import Nastya from '../../res/img/team/Anast.png'
import Ani from '../../res/img/team/Ani.png'
import UriyL from '../../res/img/team/UriyL.png'
import Zubenko from '../../res/img/team/Zubenko.png'
import Brovchenko from '../../res/img/team/Brovchenko.png'
import Bentsak from '../../res/img/team/Bentsak.png'
import Marunyak from '../../res/img/team/Marunyak.png'
import Mintuk from '../../res/img/team/Mintuk.png'
import Mulyarska from '../../res/img/team/Mulyarska.png'
import Onistuk from '../../res/img/team/Onistuk.png'
import Savikina from '../../res/img/team/Savikina.png'
import Chuyko from '../../res/img/team/Chuyko.png'
import Fb from '../../res/img/fb.svg'
import Tg from '../../res/img/tg.svg'
import Inst from '../../res/img/inst.svg'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window
  // console.log(width);
  if (width <= 1100) {
    return true
  } else {
    return false
  }
}

export default function Team(props) {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)

  // const [team, setTeam] = useState([]);

  const [departments, setDepartmaents] = useState([
    {
      name: 'team.founders',
      members: [
        {
          name: 'Микола Кривий',
          nameEN: 'Mykola Kryvyi',
          role: 'co-founder',
          photo: Mikola,
          phone: '+380 67 117 7976',
          email: 'mykola.kryvyi@ucu.edu.ua',
          tg: 'https://t.me/jiter',
          fb: 'https://www.facebook.com/profile.php?id=100006412209752',
          inst: 'https://www.instagram.com/m_kryvyi/',
        },
        {
          name: 'Ірина Кречковська',
          nameEN: 'Iryna Krechkovska',
          role: 'co-founder',
          photo: Irina,
          phone: '+380 96 465 9940',
          email: 'krechkovska@ucu.edu.ua',
          tg: 'https://t.me/krechkovska',
          fb: 'https://www.facebook.com/iryna.krechkovska',
          inst: 'https://www.instagram.com/krechkovska/',
        },
      ],
    },
    {
      name: 'team.technical',
      members: [
        {
          name: 'Сергій Єрмаков',
          nameEN: 'Serhii Yermakov',
          role: 'chief technology officer',
          photo: Sergiy,
          tg: 'https://t.me/yermakovsa',
          fb: 'https://www.facebook.com/profile.php?id=100038943752931',
          inst: 'https://www.instagram.com/yermakovsa/',
        },
        {
          name: 'Артем Сах',
          nameEN: 'Artem Sakh',
          role: 'lead & UI designer',
          photo: Artem,
          phone: '+380 98 050 2811',
          email: 'sakh.ph@gmail.com',
          tg: 'https://t.me/Artem_Sakh',
          fb: 'https://www.facebook.com/artem.sakh/',
          inst: 'https://www.instagram.com/sakh.art/',
        },
        {
          name: 'Богдан Решетник',
          nameEN: 'Bohdan Reshetnik',
          role: 'UI/UX designer',
          photo: Bohdan,
          phone: '+380 96 013 6774',
          email: 'reshetnikbohdan@gmail.com',
          tg: 'https://t.me/cumbatt',
          inst: 'https://instagram.com/benjamin_de_martini?igshid=YmMyMTA2M2Y=',
        },
        {
          name: 'Влад Морозов',
          nameEN: 'Vlad Morozov',
          role: 'frontend developer',
          photo: Vlad,
          phone: '+380 95 657 9457',
          email: 'morozov_v@dlit.dp.ua',
          tg: 'https://t.me/remorozov',
          fb: '',
          inst: '',
        },
      ],
    },
    {
      name: 'team.smm',
      members: [
        {
          name: 'Анастасія Звір',
          nameEN: 'Anastasia Zvir',
          role: 'head of SMM',
          photo: Nastya,
          phone: '+380 98 578 1540',
          email: 'zvir.anastasiya@gmail.com',
          tg: 'https://t.me/anastasia_zvir',
          fb: 'https://www.facebook.com/anastasiya.zvir',
          inst: 'https://instagram.com/anastasia_zvir?igshid=YmMyMTA2M2Y=',
        },
        {
          name: 'Анна Кущак',
          nameEN: 'Anna Kushchak',
          role: 'copywriter',
          photo: Anna,
          phone: '+380 68 833 1401',
          email: 'kushchakanna@gmail.com',
          tg: 'https://t.me/kushchak',
          fb: 'https://www.facebook.com/anna.kushchak.5',
          inst: 'https://instagram.com/an.kushchak?igshid=YmMyMTA2M2Y=',
        },
        {
          name: 'Ані Саакян',
          nameEN: 'Ani Saakyan',
          role: 'adviser',
          photo: Ani,
          phone: '+380 67 789 0060',
          email: 'saakyan@ucu.edu.ua',
          tg: 'https://t.me/libertani',
          fb: 'https://www.facebook.com/anilibertani',
          inst: 'https://instagram.com/libertanii/',
        },
        {
          name: 'Марія Зубенко',
          nameEN: 'Mariia Zubenko',
          role: 'copywriter',
          photo: Zubenko,
          phone: '+380 97 590 2307',
          email: 'zubenko.masha.2015@gmail.com',
          tg: 'https://t.me/introverti',
          inst: 'https://www.instagram.com/_mariazu_/',
        },
      ],
    },
    {
      name: 'team.communications',
      members: [
        {
          name: 'Юрій Ломіковський',
          nameEN: 'Yurii Lomikovskyi',
          role: 'head of communications',
          photo: Uriy,
          phone: '+380 96 413 7622',
          email: 'y.lomikovskyy@gmail.com',
          tg: 'https://t.me/y_lomikovskyy',
          fb: 'https://www.facebook.com/yurii.lomikovskyi',
          inst: 'https://www.instagram.com/y_lomikovskyy/',
        },
        {
          name: 'Орест Коханевич',
          nameEN: 'Orest Kokhanevych',
          role: 'communication manager',
          photo: Orest,
          phone: '+380 99 157 0674',
          email: 'orest.kokhanevych@ucu.edu.ua',
          tg: 'https://t.me/Orest_Kohanevych',
          fb: 'https://www.facebook.com/OrestKohanevych',
          inst: 'https://www.instagram.com/orestkohanevych/',
        },
      ],
    },
    {
      name: 'team.PR',
      members: [
        {
          name: 'Ярослав Бровченко',
          nameEN: 'Yaroslav Brovchenko',
          role: 'PR manager',
          photo: Brovchenko,
          phone: '+380 97 592 0453',
          email: 'ybrovc@gmail.com',
          tg: 'https://t.me/ya_tviy_bro',
          fb: 'https://www.facebook.com/profile.php?id=100007232269167',
          inst: 'https://www.instagram.com/ya_tviy_bro/',
        },
        {
          name: 'Софія Минтюк',
          nameEN: 'Sofiia Myntiuk',
          role: 'PR manager',
          photo: Mintuk,
          phone: '+380 68 091 0096',
          email: 'myntiuk@ucu.edu.ua',
          tg: 'https://t.me/sophmintaii',
          fb: 'https://www.facebook.com/profile.php?id=100033371223932',
          inst: 'https://www.instagram.com/sophi.mint/',
        },
        {
          name: 'Дар‘я Савінкіна',
          nameEN: 'Daria Savinkina',
          role: 'PR manager',
          photo: Savikina,
          phone: '+380 98 096 9198',
          email: 'dsavinkina@gmail.com',
          tg: 'https://t.me/dsvnkna',
          fb: 'https://www.facebook.com/dsvnkna',
          inst: 'https://www.instagram.com/dsvnkna',
        },
      ],
    },
    {
      name: 'team.fundraising',
      members: [
        {
          name: 'Юрій Лишак',
          nameEN: 'Yurii Lyshak',
          role: 'head of fundraising',
          photo: UriyL,
          phone: '+380 93 139 5655',
          email: 'lyshak@ucu.edu.ua',
          tg: 'https://t.me/Yurkooo',
          fb: 'https://www.facebook.com/yurkooo.lyshak',
          inst: 'https://www.instagram.com/yurka_lyshak/',
        },
      ],
    },
    {
      name: 'team.content',
      members: [
        {
          name: 'Софія Маруняк',
          nameEN: 'Sofiia Maruniak',
          role: 'content manager',
          photo: Marunyak,
          phone: '+380 97 184 7236',
          email: 'marunyaksofia@gmail.com',
          tg: 'https://t.me/sofiamarunyak',
          fb: 'https://www.facebook.com/sofiamarunyak/',
          inst: 'https://instagram.com/sofiamarunyak?igshid=YmMyMTA2M2Y=',
        },
        {
          name: 'Галина Бенцак',
          nameEN: 'Halyna Bentsak',
          role: 'content manager',
          photo: Bentsak,
          phone: '+380 96 717 0828',
          email: 'halyna.bentsak@gmail.com',
          tg: 'https://t.me/halkabentsak',
          fb: 'https://www.facebook.com/',
          inst: 'https://instagram.com/_bentsak_?igshid=YmMyMTA2M2Y=',
        },
        {
          name: 'Саша Онистюк',
          nameEN: 'Sasha Onystiuk',
          role: 'content manager',
          photo: Onistuk,
          phone: '+380 96 001 7897',
          email: 'oleksandra.onystiuk@ucu.edu.ua',
          tg: 'https://t.me/hey_aleksandraa',
          fb: 'https://www.facebook.com/hey.aleksandraa/',
          inst: 'https://www.instagram.com/hey_aleksandraa/?hl=uk',
        },
      ],
    },
    {
      name: 'team.HR',
      members: [
        {
          name: 'Яна Мулярська',
          nameEN: 'Yana Muliarska',
          role: 'HR specialist',
          photo: Mulyarska,
          phone: '+380 95 120 3869',
          email: 'yana.muliarska@gmail.com',
          tg: 'https://t.me/tvoyana',
          fb: 'https://www.facebook.com/yana.muliarska',
          inst: 'https://instagram.com/tvoe_shchastya?igshid=YmMyMTA2M2Y=',
        },
      ],
    },
  ])

  const [experts, setExperts] = useState(false)

  const [expertsArr, setExpertsArr] = useState([
    {
      name: 'Кирило Чуйко',
      nameEN: '',
      role: 'архітектор, член архітектурної палати НСАУ',
      roleEN: 'architect, member of the Architectural Chamber of the NSAU',
      photo: Chuyko,
      email: 'kyrylo.chuyko@gmail.com',
    },
  ])

  const [sizeStatus, setSizeStatus] = useState(getSize())
  useEffect(() => {
    function handleResize() {
      setSizeStatus(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getMemberCard = (el) => {
    return (
      <div className={s.card} key={el.name}>
        <img className={s.photo} alt={el.name} src={el.photo} />
        <div className={s.name}>{i18n.language === 'ua' ? el.name : el.nameEN}</div>
        <div className={s.role}>{el.role}</div>
        {el.email && el.phone ? (
          <div className={s.contacts}>
            <a href={`tel:${el.phone.trim()}`}>{el.phone}</a>
            <br />
            <a href={`mailto:${el.email}`}>{el.email}</a>
          </div>
        ) : null}

        <div className={s.contactLine}>
          {el.inst ? (
            <a className={s.icon} href={el.inst} target='_blank'>
              <img src={Inst} />
            </a>
          ) : null}
          {el.tg ? (
            <a className={s.icon} href={el.tg} target='_blank'>
              <img src={Tg} />
            </a>
          ) : null}
          {el.fb ? (
            <a className={s.icon} href={el.fb} target='_blank'>
              <img src={Fb} />
            </a>
          ) : null}
        </div>
      </div>
    )
  }

  const Departments = departments.map((dep) => {
    return (
      <div key={i18n.t(dep.name)}>
        <div className={s.department}>{i18n.t(dep.name)}</div>
        <div className={s.profileContainer}>
          {dep.members.map((el) => {
            return getMemberCard(el)
          })}
        </div>
      </div>
    )
  })

  const Experts = expertsArr.map((el) => {
    return (
      <div className={s.card} key={el.name}>
        <img className={s.photo} alt={el.name} src={el.photo} />
        <div className={s.name}>{i18n.language === 'ua' ? el.name : el.nameEN}</div>
        <div className={s.role}>{i18n.language === 'ua' ? el.role : el.roleEN}</div>
        {el.email ? (
          <div className={s.contacts}>
            <a href={`mailto:${el.email}`}>{el.email}</a>
          </div>
        ) : null}
      </div>
    )
  })

  return (
    <div className={`${mainS.mainDiv} ${s.mainDiv}`}>
      <Helmet>
        <title>{i18n.t('titles.team')}</title>
      </Helmet>
      <Header open={props.open} />
      <div className={mainS.container}>
        <div className={s.title}>{i18n.t('team.title')}</div>
        {experts ? <div className={s.profileContainer}>{Experts}</div> : Departments}
      </div>
      <Footer />
    </div>
  )
}
