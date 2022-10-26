
const axios = require('axios');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3004;
require('dotenv').config()
const logger = require('./middlewares/logger')
var cors = require('cors');

app.use(cors( {origin: '*'} ))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(3004, function () {
  console.log(`Server is listening on port ${PORT}`)
})

app.use(logger)


let saFuelApi = axios.create({
  baseURL: "https://fppdirectapi-prod.safuelpricinginformation.com.au/Subscriber/",
  headers:{
    Authorization: `FPDAPI SubscriberToken=${process.env.SAFUELAPI}`,
    'Content-type': 'application/json',
  }
})

app.get("/getCountryFuelTypes", function(req,res){
  saFuelApi(`GetCountryFuelTypes?countryId=21`).then(({data}) => {
    res.send(JSON.stringify(data))
  })
})

app.get("/getCountryGeographicRegions", function(req,res){
  saFuelApi(`/GetCountryGeographicRegions?countryId=21`).then(({data}) => {
    res.send(JSON.stringify(data))
  })
})

app.get("/getCountryBrands", function(req,res){
  saFuelApi(`/GetCountryBrands?countryId=21`).then(({data}) => {
    res.send(JSON.stringify(data))
  })
})

app.get("/getFullSiteDetails", function(req,res){
  saFuelApi(`/GetFullSiteDetails?countryId=21&geoRegionLevel=3&geoRegionId=4`).then(({data}) => {
    res.send(JSON.stringify(data))
  })
})

// axios.post("http://localhost:3001/register", data)
