import {useEffect, useState } from 'react';
import axios from 'axios';

// const CustomMarker = ({index, marker}) => {
//   return (
//     <Marker
//       longitude={marker.longitude}
//       latitude={marker.latitude}>
//       <div className="marker">
//         <span><b>{index + 1}</b></span>
//       </div>
//     </Marker>
//   )
// };

function FuelMarker (){
  const [fuelBrands,setFuelBrands] = useState([])
  useEffect(() => {
    let url = "http://localhost:3004/"
    axios.get(url + `GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4`)
    .then(response => setFuelBrands(response.data))
    .catch(err => {
      console.log(err);
    });
  }, [])
  return fuelBrands.S
}

// function apiCaller (){

// }
export default FuelMarker