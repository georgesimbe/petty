import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line 
import { NavigationControl } from 'react-map-gl';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN
// console.log(process.env.REACT_APP_TOKEN)
export default function App() {
const [viewPort,setViewPort] = useState({
  longitude: 138.63,
  latitude: -34.8626,
  zoom: 10.45
})

return (
<ReactMapGL
{...viewPort}
  mapboxAccessToken={process.env.REACT_APP_TOKEN}
  mapStyle='mapbox://styles/mapbox/streets-v11'
  onViewportChange={ viewPort => {
    setViewPort(viewPort)
  }}
  // mapStyle='mapbox://styles/mapbox/streets-v11'
  >
    {/* <Marker 
    latitude={lat}
    longitude= {lng}
    draggable
    // onDragEnd={(e) => dispatch{ty}}
    /> */}
</ReactMapGL>

);
}
