const express = require("express");
const router = express.Router()
const request = require("request-promise")

router.get("/reddit", (req, res) => {
    res.render("reddit")
})

router.post("/reddit/subreddit/response", async (req, res, next) => {
    try {
        const { redditSubreddit } = req.body
        const response = await request(`https://www.reddit.com/r/${redditSubreddit}/.json`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.post("/reddit/post/response", async (req, res, next) => {
    try {
        const { redditSubreddit, redditPostIdPostName } = req.body
        const response = await request(`https://www.reddit.com/r/${redditSubreddit}/comments/${redditPostIdPostName}/.json`)
        res.json(JSON.parse(response))
    } catch(err){
         next(err) 
    }
})

router.post("/reddit/post/uri/response", async (req, res, next) => {
    try {
        const { redditPostUri } = req.body
        const response = await request(`${redditPostUri}/.json`)
        res.json(JSON.parse(response))
    } catch(err){
         next(err) 
    }
})

router.post("/reddit/user/response", async (req, res, next) => {
    try {
        const { redditUser } = req.body
        const response = await request(`https://www.reddit.com/user/${redditUser}/.json`)
        res.json(JSON.parse(response))
    } catch(err){
         next(err) 
    }
})

router.get("/api/reddit/subreddit", async (req, res, next) => {
    try {
        const { subreddit } = req.query
        const response = await request(`https://www.reddit.com/r/${subreddit}/.json`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.get("/api/reddit/post", async (req, res, next) => {
    try {
        const { subreddit, postIdPostName } = req.query
        const response = await request(`https://www.reddit.com/r/${subreddit}/comments/${postIdPostName}/.json`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.get("/api/reddit/post/uri", async (req, res, next) => {
    try {
        const { postUri } = req.query
        const response = await request(`${postUri}/.json`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

router.get("/api/reddit/user", async (req, res, next) => {
    try {
        const { user } = req.query
        const response = await request(`https://www.reddit.com/user/${user}/.json`)
        res.json(JSON.parse(response))
    } catch(err) {
        next(err)
    }
})

module.exports = router;