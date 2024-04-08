import { useEffect, useState } from 'react'
import s from './TeamBlinker.module.css'

function importAll(r) {
  return r.keys().map(r)
}

const images = importAll(require.context('../../res/img/team/', false, /\.(png|jpe?g|svg)$/))

const getRandomElement = (arr) => {
  const index = Math.floor(Math.random() * arr.length)
  const copy = arr.concat()
  copy.splice(index, 1)
  return {
    element: arr[index],
    newArr: copy,
  }
}

const initializeImageArray = () => {
  let arr = images.concat()
  let imageSet = []
  while (imageSet.length < 9) {
    const first = getRandomElement(arr)
    arr = first.newArr.concat()
    const second = getRandomElement(arr)
    arr = second.newArr.concat()
    imageSet.push([first.element, second.element])
  }

  return imageSet
}

const fillFirstRenderArray = () => {
  const arr = []
  while (arr.length < 9) {
    arr.push(true)
  }
  return arr
}

export const TeamBlinker = () => {
  const [imageArr, setImageArr] = useState([])
  const [firstRender, setFirstRender] = useState(fillFirstRenderArray())

  useEffect(() => {
    const set = initializeImageArray()
    // console.log(set)
    setImageArr(set)
  }, [])

  const fillNewNextImage = (index) => {
    const copy = imageArr.concat()
    // console.log(copy[index][0], copy[index][1], index, '0')
    const arr = []
    copy.forEach((pare) => {
      arr.push(pare[0])
      arr.push(pare[1])
    })
    const uniqueArray = images.filter(function (obj) {
      return arr.indexOf(obj) == -1
    })
    // console.log(copy[index], index, '1')
    const i = Math.floor(Math.random() * uniqueArray.length)
    copy[index][0] = copy[index][1]
    copy[index][1] = uniqueArray[i]
    // console.log(copy[index], index, '2')
    const firstRenderCopy = firstRender.concat()
    firstRenderCopy[index] = false
    setFirstRender(firstRenderCopy)
    setImageArr(copy)
  }

  const Images = imageArr.map((pare, index) => {
    const delay = firstRender[index] ? (index > 2 && index < 6 ? 2.5 + (5 - index) * 0.2 : 2 + index * 0.2) : 2
    return (
      <div className={s.photoDiv} key={`${pare[0]}-${pare[1]}`}>
        <img src={pare[0]} className={s.image1} style={{ animationDelay: `${delay}s` }} />
        <img
          src={pare[1]}
          className={s.image2}
          style={{ animationDelay: `${delay}s` }}
          onAnimationEnd={() => {
            fillNewNextImage(index)
          }}
        />
      </div>
    )
  })

  return <div className={s.container}>{Images}</div>
}
