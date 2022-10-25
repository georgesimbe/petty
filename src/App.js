import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// mapboxgl.workerUrl = "./mapbox-gl-csp-worker.js";
import SearchBox from './SearchBox';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN
// console.log(process.env.REACT_APP_TOKEN)
export default function App() {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(138.63);
const [lat, setLat] = useState(-34.8626);
const [zoom, setZoom] = useState(10.45);

useEffect(() => {
if (map.current) return; // initialize map only once when application restarted
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],
  zoom: zoom
  });
});

useEffect(() => {
  if (!map.current) return; 
  map.current.on('move', () => {
  setLng(map.current.getCenter().lng.toFixed(4));
  setLat(map.current.getCenter().lat.toFixed(4));
  setZoom(map.current.getZoom().toFixed(2));
  });
});

return (

<div ref={mapContainer} className="map-container">
  <div/>  
  {/* <SearchBox/> */}
  <div className="sidebar">
  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>

</div>
);
}
