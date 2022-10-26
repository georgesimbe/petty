import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import ReactMapGL, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line 
import useSwr from 'swr'
// import FuelMarker from './Components/FuelMarker'
// import FuelMarker from './Components/FuelMarker'; 
// import { useAsync } from 'react-async';
import axios from 'axios';


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
    >
      {/* <GeolocateControl ref={geolocateControlRef}  position='bottom-right'/> */}
      {/* <NavigationControl position='bottom-left' /> */}

      {fuelMark.S.map(fm => (
        <Marker key={fm.S} latitude={fm.Lat} longitude={fm.lng}>
          <button className='fuel-marker'>
            <img src="/fuelIcon.svg" alt="" />
          </button>
        </Marker>
      )
      )}
    </ReactMapGL>
  )
}
// }