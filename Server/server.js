
const  axios = require('axios');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv').config()
const logger = require('./middlewares/logger')


app.listen(4567, function () {
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

app.get("/", function(req,res){
  saFuelApi(`GetCountryFuelTypes?countryId=21`).then(({data}) => {
    res.send(JSON.stringify(data))
  })

})