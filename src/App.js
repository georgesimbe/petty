import './App.css';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import ReactMapGL, {
  Marker, GeolocateControl, ScaleControl, Popup
} from 'react-map-gl'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line 
import axios from 'axios';
import Pin from './pin';

export default function App() {
  mapboxgl.accessToken = process.env.REACT_APP_TOKEN
  const mapRef = useRef(null)
  const [viewPort, setViewPort] = useState({
    longitude: 138.63,
    latitude: -34.8626,
    width: "100vw",
    height: "100vh",
    zoom: 10.45
  })


  const [fuelMark, setFuelMark] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3004/getFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4")
      .then((data) => {
        setFuelMark(data.data)
      })
      .catch((err) => {
        console.log("err " + err);
      });
  }, []);

  const [popupInfo, setPopupInfo] = useState(null);
  console.log(fuelMark.S)
  const pins = useMemo(
    () =>
      fuelMark.S && Object.keys(fuelMark.S).map((fuel, index) => {
        // console.log(fuelMark.S[index])
        return (
          < Marker
            key={`marker-${fuel}`}
            longitude={fuelMark.S[index].Lng}
            latitude={fuelMark.S[index].Lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(fuelMark.S[index]);
            }}
          >
            <Pin />
          </Marker >
        )
      }
      ), [fuelMark])




  // const points = fuelMark.map(fuelLocation => ({
  //   type: "s",
  //   properties: { cluster: false, fuelId: fuelLocation.id, category: fuelLocation.category },
  //   geometry: {
  //     type: "Point",
  //     coordinates: [
  //       parseFloat(fuelLocation.location.longitude),
  //       parseFloat(fuelLocation.location.latitude)
  //     ]
  //   }
  // }))

  // const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null


  // const { clusters, supercluster } = useSupercluster({
  //   points,
  //   bounds,
  //   zoom: viewPort.zoom,
  //   bound: [],
  //   option: { radius: 75, maxZoom: 20 }
  // });


  // console.log([fuelMark])
  // const
  // const { data, error, isLoading } = useAsync({ promiseFn: LoadFuelPlaces })

  //Default value to manage the state of the map 

  // const [fuelBrands, setFuelBrands] = useState({})
  // useEffect(() => {
  //   let url = "http://localhost:3004/"
  //   axios.get(url + `GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4`)
  //     .then(response => response.json())
  //     // .then(response => setFuelBrands(response.data))
  //     .catch(err => {
  //       console.log(err);
  //     });
  // })

  // fuelBrands.S.forEach(element => {
  //   console.log(element.S)
  // })
  // function loadFuel() {
  // for (var i = 0; i < fuelBrands.length; i++) {

  // console.log(fuelBrands)

  // data.S.forEach(fuel => {
  //   for (let key in fuel) {
  //     console.log(`${key}: ${fuel[key]}`)
  //   }
  // })

  // }

  // const mapRef = useRef()
  // const geolocateControlRef = React.useCallback((ref) => {
  //     if (ref) {
  //       // Activate as soon as the control is loaded
  //       ref.trigger();
  //     }
  //   }, []);

  // console.log(LoadFuelPlaces())
  // const { data, error, isLoading } = useAsync({ promiseFn: LoadFuelPlaces() })
  //   if (isLoading) return "Loading..."
  //   if (error) return `Something went wrong: ${error.message}`
  //   if (data)
  // if (isLoading) {
  //   console.log("loading...")
  //   return (
  //     <ReactMapGL
  //       mapboxAccessToken={process.env.REACT_APP_TOKEN}
  //       {...viewPort}
  //       maxZoom={20}
  //       onMove={viewPort => {
  //         setViewPort(viewPort.viewPort)
  //       }}
  //       mapStyle='mapbox://styles/mapbox/streets-v11'
  //       style={{ width: "100vw", height: "100vh" }}
  //     >
  //       {/* <GeolocateControl ref={geolocateControlRef}  position='bottom-right'/> */}
  //       {/* <NavigationControl position='bottom-left' /> */}
  //       {/* {data.S.map( fuelMark =>  (
  //           <Marker key={fuelMark.id} latitude={fuelMark.Lat} longitude={fuelMark.lng}>
  //             <button className='fuel-marker'>
  //               <img src="/fuelIcon.svg" alt="" />
  //             </button>
  //           </Marker> 
  //           )
  //           )} */}
  //     </ReactMapGL>
  //   )
  // }
  // if (error) return `Something went wrong: ${error.message}`
  // // if (data) {
  // console.log(clusters)
  return (
    <>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        {...viewPort}
        maxZoom={20}
        onMove={viewPort => {
          setViewPort(viewPort.viewPort)
        }}
        bearing={0}
        pitch={0}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        style={{ width: "100vw", height: "100vh" }
        }
        ref={mapRef}
      >
        <ScaleControl />
        {pins}

        {/* {
        clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewPort({
                      ...viewPort,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new MapboxGeocoder({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.fuelId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="fuel-marker">
                <img src="/fuelLcon" />
              </button>
            </Marker>
          )
        })
      } */}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.Lng)}
            latitude={Number(popupInfo.Lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.N}, {popupInfo.P} |{' '}
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </ReactMapGL >
      {/* <ControlPanel /> */}
    </>
  )
}