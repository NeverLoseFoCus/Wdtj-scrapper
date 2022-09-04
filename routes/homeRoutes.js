const express = require("express");
const router = express.Router()
const request = require("request-promise")
require('dotenv').config();


const base_url = `http://api.scraperapi.com?api_key=${process.env.API_KEY}&autoparse=true`


router.get("/", (req, res) => {
    res.render("home")
 })
 
router.post("/scraper/response", async (req, res, next) => {
    try {
       const {inputData, isJSON} = req.body
       const response = await request(`${base_url}&url=${inputData}`)     
       if(isJSON) {
          res.json(JSON.parse(response))
       } else {
          res.json(response)
       }              
    } catch(err) {
       next(err)
    }
 })

router.get("/api/scraper", async (req, res, next) => {
   try {
      const { url, scraperApiKey, isJSON } = req.query
      const response = await request(`http://api.scraperapi.com?api_key=${scraperApiKey}&autoparse=true&url=${url}`)     
      if(isJSON) {
         res.json(JSON.parse(response))
      } else {
         res.json(response)
      }              
   } catch(err) {
      next(err)
   }
})

router.get("/api", (req, res) => {
   res.render("api")
})

module.exports = router;