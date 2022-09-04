const express = require("express")
const app = express()
const path = require("path")
const request = require("request-promise")
const axios = require("axios")
const CircularJSON = require("circular-json")

const youtubeRoutes = require("./routes/youtubeRoutes.js")
const redditRoutes = require("./routes/redditRoutes.js")
const twitterRoutes = require("./routes/twitterRoutes.js")
const amazonRoutes = require("./routes/amazonRoutes.js")
const homeRoutes = require("./routes/homeRoutes.js")

const ExpressError = require("./utils/ExpressError.js")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/", youtubeRoutes)
app.use("/", redditRoutes)
app.use("/", twitterRoutes)
app.use("/", amazonRoutes)
app.use("/", homeRoutes)

app.get("/test", async (req, res) => {
   const response = await axios.get("https://www.instagram.com/p/CcA2c_NKPm1/?__a=1", {
      headers: {
         'Content-Type': 'application/json'
      },
      data: {}
   })
   const str = CircularJSON.stringify(response);
   res.json(JSON.parse(str))
})

app.get("*", (req, res, next) => {
   next(new ExpressError("no such route sorry", 404))
})

app.use((err, req, res, next) => {
   const {message, status} = err
   res.status(status).render("error", {message, err})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
   console.log(`working on port ${port}`)                             
})