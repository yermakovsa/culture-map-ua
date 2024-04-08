import { useState, useEffect } from 'react'
import s from './DonateBlock.module.css'
import btc from '../../res/img/btc.svg'
import btcSelected from '../../res/img/btcSelected.svg'
import near from '../../res/img/near.svg'
import nearSelected from '../../res/img/nearSelected.svg'
import eth from '../../res/img/eth.svg'
import ethSelected from '../../res/img/ethSelected.svg'
import usdt from '../../res/img/usdt.svg'
import usdtSelected from '../../res/img/usdtSelected.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import i18n from '../../i18n'
import PaymentLine from '../../res/img/paymentLine.png'

const getSize = () => {
  const { innerWidth: width, innerHeight: height } = window
  if (width <= 690) {
    return true
  } else {
    return false
  }
}

const donateLinks = {
  uah: 'https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCR0LvQsNCz0L7QtNGW0LnQvdC40Lkg0LLQvdC10YHQvtC6INCx0LXQtyDQn9CU0JIiLCJwdWJsaWNfa2V5IjoiaTk3ODM1MzYyMTgiLCJsYW5ndWFnZSI6InVrIn0=&signature=y2gluu9WNyWAY8Ckn/JcDTqa9P0=',
  usd: 'https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIwIiwiY3VycmVuY3kiOiJVU0QiLCJkZXNjcmlwdGlvbiI6ItCR0LvQsNCz0L7QtNGW0LnQvdC40Lkg0LLQvdC10YHQvtC6INCx0LXQtyDQn9CU0JIiLCJwdWJsaWNfa2V5IjoiaTk3ODM1MzYyMTgiLCJsYW5ndWFnZSI6InVrIn0=&signature=GqAhsmw2+I4oibITKSO/+m4slgg=',
  eur: 'https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIwIiwiY3VycmVuY3kiOiJFVVIiLCJkZXNjcmlwdGlvbiI6ItCR0LvQsNCz0L7QtNGW0LnQvdC40Lkg0LLQvdC10YHQvtC6INCx0LXQtyDQn9CU0JIiLCJwdWJsaWNfa2V5IjoiaTk3ODM1MzYyMTgiLCJsYW5ndWFnZSI6InVrIn0=&signature=AzLxNFqDbrxq4xOj/kdWkibf3AQ=',
}

export default function DonateBlock() {
  const [size, setSize] = useState(getSize())

  const [paypalCopied, setPaypalCopied] = useState(false)

  useEffect(() => {
    function handleResize() {
      setSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [variants, setVariants] = useState([
    {
      text: 'goals.card',
      selected: true,
    },
    {
      text: 'goals.crypt',
      selected: false,
    },
    {
      text: 'goals.details',
      selected: false,
    },
    {
      text: 'goals.paypal',
      selected: false,
    },
  ])

  useEffect(() => {
    setPaypalCopied(false)
  }, [variants])

  const [currencies, setCurrencies] = useState([
    {
      text: 'UAH',
      selected: true,
    },
    {
      text: 'USD',
      selected: false,
    },
    {
      text: 'EUR',
      selected: false,
    },
  ])

  const [crypts, setCrypts] = useState([
    {
      name: 'BTC',
      selected: false,
      hovered: false,
      code: '1EpBjLiW5MG7qSRxseMHBU4bditZYyifgp',
      image: btc,
      imageHover: btcSelected,
    },
    {
      name: 'ETH',
      selected: false,
      hovered: false,
      code: '0x35A2a129Ae6A2192BB6059082470278ECcb79D10',
      image: eth,
      imageHover: ethSelected,
    },
    {
      name: 'USDT (ERC20)',
      selected: false,
      hovered: false,
      code: '0x35A2a129Ae6A2192BB6059082470278ECcb79D10',
      image: usdt,
      imageHover: usdtSelected,
    },
    {
      name: 'USDT (TRC20)',
      selected: false,
      hovered: false,
      code: 'TSbtsWmo88B9mx8dspp4GjkN9TwHAZWZ5V',
      image: usdt,
      imageHover: usdtSelected,
    },
    {
      name: 'NEAR',
      selected: false,
      hovered: false,
      code: '152a3b368f62e5aadf4376c5e32d6dc772bf62fe21a3b082392b3fd246ef3043',
      image: near,
      imageHover: nearSelected,
    },
  ])

  const Variants = variants.map((variant, index) => {
    return (
      <div
        key={`${index}-variant`}
        className={variant.selected ? s.variantSelected : s.variant}
        onClick={() => {
          const copy = variants.concat()
          copy.forEach((el) => {
            el.selected = false
          })
          copy[index].selected = true
          setVariants(copy)
        }}
      >
        {i18n.t(variant.text)}
      </div>
    )
  })

  const Currencies = currencies.map((el, index) => {
    return (
      <div
        key={`${index}-curr`}
        className={el.selected ? s.currencySelected : s.currency}
        onClick={() => {
          const copy = currencies.concat()
          copy.forEach((el) => {
            el.selected = false
          })
          copy[index].selected = true
          setCurrencies(copy)
        }}
      >
        {el.text}
      </div>
    )
  })

  const Crypts = crypts.map((el, index) => {
    return (
      <CopyToClipboard text={el.code}>
        <div
          className={s.crypt}
          key={`${index}-crypt`}
          onMouseOver={() => {
            if (!size && !el.selected) {
              let copy = crypts.concat()
              copy[index].hovered = true
              setCrypts(copy)
            }
          }}
          onMouseLeave={() => {
            if (!size) {
              let copy = crypts.concat()
              copy.forEach((el) => (el.hovered = false))
              copy[index].selected = false
              setCrypts(copy)
            }
          }}
          onClick={() => {
            let copy = crypts.concat()
            copy[index].selected = true
            setCrypts(copy)
          }}
        >
          {size ? (
            el.selected ? (
              <div
                className={s.copy}
                onAnimationEnd={() => {
                  let copy = crypts.concat()
                  copy[index].selected = false
                  setCrypts(copy)
                }}
              >
                {i18n.t('goals.copied')}
              </div>
            ) : null
          ) : (
            <div className={s.copy}>{el.selected ? i18n.t('goals.copied') : i18n.t('goals.copy')}</div>
          )}
          <div className={s.name}>
            <div className={s.imgDiv}>
              <img src={el.hovered ? el.imageHover : el.image} />
            </div>
            <div>{el.name}</div>
          </div>
          <div className={s.link}>{el.code}</div>
        </div>
      </CopyToClipboard>
    )
  })

  const getLeft = () => {
    if (currencies[0].selected) {
      return 0
    } else if (currencies[1].selected) {
      return 33.33333333
    } else {
      return 66.66666666
    }
  }

  const getVarStyle = () => {
    // if (variants[0].selected) {
    //   return {left: '0px', width: '330px'};
    // } else if (variants[1].selected) {
    //   return {left: '330px', width: '225px'};
    // } else {
    //   return {left: '555px', width: '225px'};
    // }
    let i
    variants.forEach((el, index) => {
      if (el.selected) {
        i = index
      }
    })
    return { left: `${i * 25}%` }
  }

 const getCurrentDesc = () => {
    if (currencies[0].selected) {
      return i18n.language === "ua" ? (
        <div className={s.currencyDesc}>
          Найменування отримувача: БО БЛАГОДІЙНИЙ ФОНД СЕЙВ АРТ ЮА
          <br />
          Код отримувача: 44743470
          <br />
          IBAN: UA413052990000026009001025420
          <br />
          Назва банку: АТ КБ "ПРИВАТБАНК"
        </div>
      ) : (
        <div className={s.currencyDesc}>
          Bank: JSC CB PRIVATBANK
          <br />
          MFI: 305299
          <br />
          IBAN: UA413052990000026009001025420
          <br />
          Recipient code: 44743470
          <br/>
          Recipient: CHARITY FOUNDATION SAVE ART UA
        </div>
      );
    } else if (currencies[1].selected) {
      return i18n.language === "ua" ? (
        <div className={s.currencyDesc}>
          Найменування отримувача: БО БЛАГОДІЙНИЙ ФОНД СЕЙВ АРТ ЮА
          <br />
          IBAN: UA853052990000026002011029543
          <br/>
          SWIFT code банку: PBANUA2X
          <br/>
          Назва банку: JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE
          <br />
        </div>
      ) : (
        <div className={s.currencyDesc}>
          Recipient: CHARITY FOUNDATION SAVE ART UA
          <br />
          IBAN: UA853052990000026002011029543
          <br/>
          Bank SWIFT Code: PBANUA2X
          <br/>
          Bank: JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE
          <br />
        </div>
      );
    } else {
      return i18n.language === "ua" ? (
        <div className={s.currencyDesc}>
          Найменування отримувача: БО БЛАГОДІЙНИЙ ФОНД СЕЙВ АРТ ЮА
          <br />
          IBAN: UA793052990000026003021010626
          <br/>
          SWIFT code банку: PBANUA2X
          <br/>
          Назва банку: JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE
          <br />
        </div>
      ) : (
        <div className={s.currencyDesc}>
          Recipient: CHARITY FOUNDATION SAVE ART UA
          <br />
          IBAN: UA793052990000026003021010626
          <br/>
          Bank SWIFT Code: PBANUA2X
          <br/>
          Bank: JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE
          <br />
        </div>
      );
    }
  };

  return (
    <div className={s.container} id='donate'>
      <div className={s.variants}>{Variants}</div>
      <div className={s.variantLine}>
        {/* {variants[0].selected ? <div className={s.creditSelected}></div> : null}
        {variants[1].selected ? <div className={s.cryptSelected}></div> : null}
        {variants[2].selected ? <div className={s.reqSelected}></div> : null} */}
        <div className={s.variantLineSelected} style={getVarStyle()}></div>
      </div>
      {variants[0].selected ? (
        <>
          <div className={s.liqContainer}>
            <a className={s.liqLink} href={donateLinks.uah}>
              UAH
            </a>
            <a className={s.liqLink} href={donateLinks.usd}>
              USD
            </a>
            <a className={s.liqLink} href={donateLinks.eur}>
              EUR
            </a>
          </div>
          <img src={PaymentLine} className={s.paymentLine} alt='payment systems' />
        </>
      ) : null}
      {variants[1].selected ? <div className={s.cryptContainer}>{Crypts}</div> : null}
      {variants[2].selected ? (
        <div className={s.requiseBlock}>
          <div className={s.currencies}>{Currencies}</div>
          <div className={s.currencyLine}>
            <div className={s.currencyLineSelected} style={{ left: `${getLeft()}%` }}></div>
          </div>
          {getCurrentDesc()}
        </div>
      ) : null}
      {variants[3].selected ? (
        <div className={s.paypal}>
          <div>info@saveartua.com</div>
          <CopyToClipboard text={'info@saveartua.com'}>
            <div
              className={paypalCopied ? s.copiedEmail : s.copyEmail}
              onClick={() => {
                setPaypalCopied(true)
              }}
            >
              {paypalCopied ? i18n.t('goals.copied') : i18n.t('goals.copy')}
            </div>
          </CopyToClipboard>
        </div>
      ) : null}
    </div>
  )
}
