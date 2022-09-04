const express = require("express");
const router = express.Router()
const request = require("request-promise")
require('dotenv').config();

router.get("/youtube", (req, res) => {
    res.render("youtube")
 })

router.post("/youtube/channelid/response", async (req, res, next) => {
    try {
        const { youtubeChannelId } = req.body;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${youtubeChannelId}&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }  
})

router.post("/youtube/channelid/playlists/response", async (req, res, next) => {
    try {
        const { youtubeChannelId } = req.body;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${youtubeChannelId}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.post("/youtube/channelid/activities/response", async (req, res, next) => {
    try {
        const { youtubeChannelId } = req.body;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=${youtubeChannelId}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.post("/youtube/videoid/response", async (req, res, next) => {
    try {
        const { youtubeVideoId } = req.body;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${youtubeVideoId}&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.post("/youtube/videoid/comments/response", async (req, res, next) => {
    try {
        const { youtubeVideoId } = req.body;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${youtubeVideoId}&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.get("/api/youtube/channelid", async (req, res, next) => {
    try {
        const { channelId } = req.query;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    } 
})

router.get("/api/youtube/channelid/playlists", async (req, res, next) => {
    try {
        const { channelId } = req.query;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.get("/api/youtube/channelid/activites", async (req, res, next) => {
    try {
        const { channelId } = req.query;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.get("/api/youtube/videoid", async (req, res, next) => {
    try {
        const { videoId } = req.query;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

router.get("/api/youtube/videoid/comments", async (req, res, next) => {
    try {
        const { videoId } = req.query;
        const response = await request(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`)
        res.json(JSON.parse(response))
    } catch(err){
        next(err)
    }
})

module.exports = router;
