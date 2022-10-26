const  axios = require('axios');
var cors = require("cors");
// let saFuelApi = axios.create({
//   baseURL: "https://fppdirectapi-prod.safuelpricinginformation.com.au/Subscriber/",
//   headers:{
//     Authorization: `FPDAPI SubscriberToken=${process.env.SAFUELAPI}`,
//     'Content-type': 'application/json',
//   }
// })


function Marker (){
  let saFuelApi = axios.create({
    baseURL: "https://localhost:3004/",
    headers:{
      "Access-Control-Allow-Origin": "*",
      Authorization: `FPDAPI SubscriberToken=${process.env.SAFUELAPI}`,
      'Content-type': 'application/json',

    }
  })
  saFuelApi(`/GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4`).then(({data}) => {
    res.send(JSON.stringify(data))
  }).then(response => {
    return response
  }).catch(err => {
    console.log(err);
  });
}

// function apiCaller (){

// }
export default Marker