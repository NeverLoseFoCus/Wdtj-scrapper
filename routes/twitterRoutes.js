const express = require("express");
const router = express.Router()
const request = require("request-promise")
const { Client } = require('twitter.js');


const client = new Client()
router.use(async (req, res, next) => {
   try {
      await client.loginWithBearerToken(process.env.TWITTER_BEARER_KEY);
      next()
   } catch(err) {
      next(err)
   }
   
})

router.get("/twitter", (req, res) => {
    res.render("twitter")
})

router.post("/twitter/user/response", async (req, res, next) => {
    try {
        const { twitterUserName } = req.body
        const user = await client.users.fetchByUsername(twitterUserName);
        res.json(user)
    } catch(err) {
        next(err)
    }
})

router.post("/twitter/post/response", async (req, res, next) => {
    try {
        const { twitterPostId } = req.body
        const user = await client.tweets.fetch(twitterPostId);
        res.json(user)
    } catch(err) {
        next(err)
    }
})

router.get("/api/twitter/user", async (req, res, next) => {
    try {
        const { userName } = req.query
        const user = await client.users.fetchByUsername(userName);
        res.json(user)
    } catch(err) {
        next(err)
    }
})

router.get("/api/twitter/post", async (req, res, next) => {
    try {
        const { postId } = req.query
        const user = await client.tweets.fetch(postId);
        res.json(user)
    } catch(err) {
        next(err)
    }
})



module.exports = router;