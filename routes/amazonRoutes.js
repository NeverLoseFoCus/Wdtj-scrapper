const express = require("express");
const router = express.Router()
const request = require("request-promise")
require('dotenv').config();

const base_url = `http://api.scraperapi.com?api_key=${process.env.API_KEY}&autoparse=true`


router.get("/amazon", (req, res) => {
    res.render("amazon")
})

router.post("/amazon/product/response", async (req, res, next) => {
    try {
        const { amazonProductId } = req.body
        const response = await request(`${base_url}&url=https://www.amazon.com/dp/${amazonProductId}/`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.post("/amazon/product/reviews/response", async (req, res, next) => {
    try {
        const { amazonProductId } = req.body
        const response = await request(`${base_url}&url=https://www.amazon.com/product-reviews/${amazonProductId}/`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.post("/amazon/store/response", async (req, res, next) => {
    try {
        const { amazonStoreName, amazonStoreId } = req.body
        const response = await request(`${base_url}&url=https://www.amazon.com/stores/${amazonStoreName}/page/${amazonStoreId}?ref_=ast_bln`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.get("/api/amazon/product", async (req, res, next) => {
    try {
        const { productId, scraperApiKey } = req.query
        const response = await request(`http://api.scraperapi.com?api_key=${scraperApiKey}&autoparse=true&url=https://www.amazon.com/dp/${productId}/`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.get("/api/amazon/product/reviews", async (req, res, next) => {
    try {
        const { productId, scraperApiKey } = req.query
        const response = await request(`http://api.scraperapi.com?api_key=${scraperApiKey}&autoparse=true&url=https://www.amazon.com/product-reviews/${productId}/`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.get("/api/amazon/store", async (req, res, next) => {
    try {
        const { storeName, storeId, scraperApiKey } = req.query
        const response = await request(`http://api.scraperapi.com?api_key=${scraperApiKey}&autoparse=true&url=https://www.amazon.com/stores/${storeName}/page/${storeId}?ref_=ast_bln`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

module.exports = router;