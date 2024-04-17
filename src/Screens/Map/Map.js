import mainS from '../../App.module.css'
import s from './Map.module.css'
import Map from 'react-map-gl'
import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { monumentApi } from '../../api/apiDeclaration'
import { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useSupercluster from 'use-supercluster'
import { Link } from 'react-router-dom'
import Logo from '../../res/img/logo.svg'
import enFlag from '../../res/img/en.svg'
import i18n from '../../i18n'
import uaFlag from '../../res/img/ua.svg'
import mapboxgl from 'mapbox-gl'
import Sidemenu from '../../Components/Sidemenu/Sidemenu'
import Music from '../../res/img/music.svg'
import Writer from '../../res/img/writer.svg'
import Actor from '../../res/img/actor.svg'
import Filmmaker from '../../res/img/filmmaker.svg'
import Historical from '../../res/img/historical.svg'
import Fashion from '../../res/img/fashion.svg'
import UniversitySelected from '../../res/img/universitySelected.svg'
import University from '../../res/img/university.svg'
import OldSelected from '../../res/img/oldSelected.svg'
import Old from '../../res/img/old.svg'
import './map.css'
import Plus from '../../res/img/plus.svg'
import Minus from '../../res/img/minus.svg'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import Home from '../../res/img/homeIcon.svg'
import Team from '../../res/img/teamIcon.svg'
import DonatePopUp from '../../Components/DonatePopUp/DonatePopUp'
import MapHeader from '../../Components/MapHeader/MapHeader'
import monumentsUA from "../../locales/monumentsUA.json"
import monumentsEN from "../../locales/monumentsEN.json"

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

const initialBounds = {
  w: 22.163889,
  s: 44.386389,
  e: 40.198056,
  n: 52.334444,
}

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

export default function MapBox(props) {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)

  const mapRef = useRef(null)

  const [minZoom, setMinZoom] = useState(1)
  const [zoom, setZoom] = useState(5)
  const [bounds, setBounds] = useState(null)
  const [monuments, setMonuments] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [sizeStatus, setSizeStatus] = useState(getSize())

  useEffect(() => {
    function handleResize() {
      setSizeStatus(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    getMonuments()
  }, [i18n.language])

  useEffect(() => {
    if (selectedId) {
      const monument = monuments.find((monument) => {
        return monument.id === selectedId
      })
      if (!sizeStatus) {
        mapRef.current.setCenter({
          lng: monument.coordinates.lon,
          lat: monument.coordinates.lat,
        })
        // mapRef.current.flyTo({center: [monument.coordinates.lon, monument.coordinates.lat], zoom: 15, speed: 2})
        mapRef.current.zoomTo(15)
      }
    }
  }, [selectedId])

  const getMonuments = async () => {
    try {
      const res = i18n.language === 'en' ? monumentsEN : monumentsUA;
      // console.log(res);
      setMonuments(res.monuments)
    } catch (err) {
      console.log(err)
    }
  }

  const onMapLoad = useCallback(() => {
    setBounds(mapRef.current.getBounds().toArray().flat())
    setMinZoom(mapRef.current.getZoom())
    mapRef.current.on('move', () => {
      setZoom(mapRef.current.getZoom())
      setBounds(mapRef.current.getBounds().toArray().flat())
    })

    const checkBounds = (center) => {
      if (center.lat > initialBounds.n) {
        mapRef.current.setCenter({
          lng: center.lng,
          lat: initialBounds.n,
        })
      }
      if (center.lat < initialBounds.s) {
        mapRef.current.setCenter({
          lng: center.lng,
          lat: initialBounds.s,
        })
      }
      if (center.lng > initialBounds.e) {
        mapRef.current.setCenter({
          lng: initialBounds.e,
          lat: center.lat,
        })
      }
      if (center.lng < initialBounds.w) {
        mapRef.current.setCenter({
          lng: initialBounds.w,
          lat: center.lat,
        })
      }
    }

    // console.log(monuments)

    mapRef.current.on('moveend', () => {
      checkBounds(mapRef.current.getCenter())
    })
  })

  const points = monuments.length
    ? monuments.map((monument) => {
        return {
          type: 'Feature',
          properties: {
            cluster: false,
            id: monument.id,
            category: monument.type,
          },
          geometry: {
            type: 'Point',
            coordinates: [monument.coordinates.lon, monument.coordinates.lat],
          },
        }
      })
    : []

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 13 },
  })

  const getStyle = (num, type) => {
    const delta = (40 + ((20 * num) ^ 2) / points.length) ^ 2
    let fontSize
    if (num < 10) {
      fontSize = 16
    } else if (num < 20) {
      fontSize = 24
    } else {
      fontSize = 40
    }
    return {
      height: `${delta}px`,
      fontSize: `${fontSize}px`,
      image: getMarker(type),
    }
  }

  const getMarker = (type) => {
    switch (type) {
      case 'WRITER':
        return Writer
      case 'MUSICIAN':
        return Music
      case 'ACTOR':
        return Actor
      case 'FILMMAKER':
        return Filmmaker
      case 'HISTORICAL':
        return Historical
      case 'FASHION':
        return Fashion
      case 'UNIVERSITY':
        return University
      case 'OLD_BUILDING':
        return Old
      default:
        return Old
    }
  }

  const getSelectedMarker = (type) => {
    switch (type) {
      case 'WRITER':
        return Writer
      case 'MUSICIAN':
        return Music
      case 'ACTOR':
        return Actor
      case 'FILMMAKER':
        return Filmmaker
      case 'HISTORICAL':
        return Historical
      case 'FASHION':
        return Fashion
      case 'UNIVERSITY':
        return UniversitySelected
      case 'OLD_BUILDING':
        return OldSelected
      default:
        return OldSelected
    }
  }

  // console.log(supercluster)

  const getPointsTypes = (id, arr) => {
    // console.log(arr)
    let children = supercluster.getChildren(id)
    for (let i = 0; i < children.length; i++) {
      if (!children[i].properties.cluster) {
        arr.push(children[i].properties.category)
        // console.log(arr)
      } else {
        getPointsTypes(children[i].properties.cluster_id, arr)
      }
    }
    return arr
  }

  const getClusterType = (arr) => {
    let typeCount = [
      {
        type: 'MUSICIAN',
        count: 0,
      },
      {
        type: 'FILMMAKER',
        count: 0,
      },
      {
        type: 'FASHION',
        count: 0,
      },
      {
        type: 'UNIVERSITY',
        count: 0,
      },
      {
        type: 'WRITER',
        count: 0,
      },
      {
        type: 'OLD_BUILDING',
        count: 0,
      },
      {
        type: 'ACTOR',
        count: 0,
      },
      {
        type: 'HISTORICAL',
        count: 0,
      }
    ]
    arr.forEach((type) => {
      // console.log(type)
      const index = typeCount.findIndex((el) => el.type === type)
      typeCount[index].count++
    })
    const newArr = typeCount.map((type) => {
      return type.count
    })
    const maxValue = Math.max(...newArr)
    const maxIndex = newArr.indexOf(maxValue)
    return typeCount[maxIndex].type
  }

  // const Markers = clusters.length
  //   ? clusters.map((cluster, index) => {
  //       if (cluster.properties.cluster) {
  //         // console.log(supercluster)
  //         let typesArray = []
  //         typesArray = getPointsTypes(cluster.properties.cluster_id, typesArray)
  //         const mostRecent = getClusterType(typesArray)
  //         const style = getStyle(cluster.properties.point_count, mostRecent)
  //         // console.log(style)
  //         return (
  //           <Marker
  //             key={cluster.properties.cluster_id}
  //             latitude={cluster.geometry.coordinates[1]}
  //             longitude={cluster.geometry.coordinates[0]}
  //             id={`cluster-${index}`}
  //           >
  //             <div
  //               className={s.marker}
  //               style={{ fontSize: style.fontSize }}
  //               onClick={() => {
  //                 const expansionZoom = Math.min(
  //                   supercluster.getClusterExpansionZoom(cluster.properties.cluster_id),
  //                   15
  //                 )
  //                 mapRef.current.flyTo({
  //                   center: [cluster.geometry.coordinates[0], cluster.geometry.coordinates[1]],
  //                   zoom: expansionZoom,
  //                   speed: 3,
  //                 })
  //               }}
  //             >
  //               <img src={style.image} style={{ height: style.height }} />
  //               <div>{cluster.properties.point_count}</div>
  //             </div>
  //           </Marker>
  //         )
  //       } else {
  //         // console.log(cluster);
  //         return (
  //           <Marker
  //             key={cluster.properties.id}
  //             latitude={cluster.geometry.coordinates[1]}
  //             longitude={cluster.geometry.coordinates[0]}
  //           >
  //             <img
  //               src={
  //                 selectedId === cluster.properties.id
  //                   ? getSelectedMarker(cluster.properties.category)
  //                   : getMarker(cluster.properties.category)
  //               }
  //               style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
  //               onClick={() => {
  //                 setSelectedId(cluster.properties.id)
  //               }}
  //             />
  //           </Marker>
  //         )
  //       }
  //     })
  //   : null

  const Clusters = clusters.length
    ? clusters
        .filter((cluster) => {
          if (cluster.properties.cluster) {
            return cluster
          }
        })
        .map((cluster) => {
          let typesArray = []
          typesArray = getPointsTypes(cluster.properties.cluster_id, typesArray)
          const mostRecent = getClusterType(typesArray)
          const style = getStyle(cluster.properties.point_count, mostRecent)
          // console.log(style)
          return (
            <Marker
              key={cluster.properties.cluster_id}
              latitude={cluster.geometry.coordinates[1]}
              longitude={cluster.geometry.coordinates[0]}
            >
              <div
                className={s.marker}
                style={{ fontSize: style.fontSize }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.properties.cluster_id),
                    15
                  )
                  mapRef.current.flyTo({
                    center: [cluster.geometry.coordinates[0], cluster.geometry.coordinates[1]],
                    zoom: expansionZoom,
                    speed: 3,
                  })
                }}
              >
                <img src={style.image} style={{ height: style.height }} />
                <div>{cluster.properties.point_count}</div>
              </div>
            </Marker>
          )
        })
    : null

  const MonumentMarkers = clusters.length
    ? clusters
        .filter((cluster) => {
          if (!cluster.properties.cluster) {
            return cluster
          }
        })
        .map((cluster) => {
          return (
            <Marker
              key={cluster.properties.id}
              latitude={cluster.geometry.coordinates[1]}
              longitude={cluster.geometry.coordinates[0]}
            >
              <img
                src={
                  selectedId === cluster.properties.id
                    ? getSelectedMarker(cluster.properties.category)
                    : getMarker(cluster.properties.category)
                }
                style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
                onClick={() => {
                  setSelectedId(cluster.properties.id)
                }}
              />
            </Marker>
          )
        })
    : null

  const zooming = (type) => {
    if (type === 'plus' && zoom < 15) {
      mapRef.current.zoomTo(zoom + 1)
    }
    if (type === 'minus' && zoom > minZoom) {
      mapRef.current.zoomTo(zoom - 1)
    }
  }

  return (
    <div className={`${mainS.mainDiv} ${s.mainDiv}`}>
      <Helmet>
        <title>{i18n.t('titles.map')}</title>
      </Helmet>
      <div className={s.controlButtons}>
        <div
          className={zoom < 15 ? s.plus : s.plusDisabled}
          onClick={() => {
            zooming('plus')
          }}
        >
          <img src={Plus} />
        </div>
        <hr />
        <div
          className={zoom > minZoom ? s.minus : s.minusDisabled}
          onClick={() => {
            zooming('minus')
          }}
        >
          <img src={Minus} />
        </div>
      </div>
      {monuments.length ? (
        <Sidemenu
          monuments={monuments}
          selectedId={selectedId}
          setSelected={setSelectedId}
          open={() => {
            // console.log("here");
            props.open()
          }}
        />
      ) : null}
      <MapHeader open={props.open} />
      <Map
        initialViewState={{
          // longitude: 31.4275,
          // latitude: 48.482778,
          // zoom: 5,
          bounds: [initialBounds.w, initialBounds.s, initialBounds.e, initialBounds.n],
        }}
        dragRotate={false}
        // touchZoomRotate = {false}
        touchPitch={false}
        maxZoom={15}
        minZoom={minZoom - 0.4}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/remorozov/cl1o2zld4000214ml7pg02nhw'
        accessToken={window._env_.REACT_APP_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}
        onLoad={onMapLoad}
      >
        {Clusters}
        {MonumentMarkers}
      </Map>
    </div>
  )
}
