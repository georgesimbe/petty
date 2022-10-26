import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line 
import useSwr from 'swr'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import FuelMarker from './Components/FuelMarker'
// import FuelMarker from './Components/FuelMarker'; 
// import { useAsync } from 'react-async';
import axios from 'axios';
import useSupercluster from "use-supercluster";

const fetcher = (...args) => fetch(...args).then(response => response.json())
// function LoadFuelPlaces() {

//   // .then(res => (res.ok ? res : Promise.reject(res)))
//   // .then(res => res.json())
// }
// console.log(LoadFuelPlaces())
export default function App() {
  mapboxgl.accessToken = process.env.REACT_APP_TOKEN
  const [viewPort, setViewPort] = useState({
    longitude: 138.63,
    latitude: -34.8626,
    width: "100vw",
    height: "100vh",
    zoom: 10.45
  })

  const mapRef = useRef()
  let url = "http://localhost:3004/getFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4"
  const { data, error } = useSwr(url, fetcher)
  const fuelMark = data && !error ? data : []
  const points = fuelMark.S.map(fuelLocation => ({
    type: "Feature",
    properties: { cluster: false, fuelId: fuelLocation.id, category: fuelLocation.category },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(fuelLocation.location.longitude),
        parseFloat(fuelLocation.location.latitude)
      ]
    }
  }))

  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewPort.zoom,
    bound: [],
    option: { radius: 75, maxZoom: 20 }
  });


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
  // if (data) {
  console.log(clusters)
  return (
    <ReactMapGL
      mapboxAccessToken={process.env.REACT_APP_TOKEN}
      {...viewPort}
      maxZoom={20}
      onMove={viewPort => {
        setViewPort(viewPort.viewPort)
      }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      style={{ width: "100vw", height: "100vh" }}
      ref={mapRef}
    >

      {clusters.map(cluster => {
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
      })}
    </ReactMapGL>
  )
}