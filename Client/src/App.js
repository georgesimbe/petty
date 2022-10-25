import './App.css';
import React,{useState } from 'react';
import ReactMapGL, {Marker, FullscreenControl,GeolocateControl, NavigationControl} from 'react-map-gl'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line 
// import { NavigationControl } from 'react-map-gl';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN
// console.log(process.env.REACT_APP_TOKEN)
export default function App() {
const [viewPort,setViewPort] = useState({
  longitude: 138.63,
  latitude: -34.8626,
  zoom: 10.45
})

 const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);


return (
  <div>
    <ReactMapGL
    mapboxAccessToken={process.env.REACT_APP_TOKEN}
    {...viewPort}
      onMove={ viewPort => {
        setViewPort(viewPort.viewPort)
      }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      style={{width: "100vw", height: "100vh"}}
      >
        {/* <FullscreenControl /> */}
        <GeolocateControl ref={geolocateControlRef}  position='bottom-right'/>
        <NavigationControl position='bottom-left' />
        {/* <Marker/> */}
        </ReactMapGL>
  </div>
);
}
