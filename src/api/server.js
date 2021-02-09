require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

const authenticate = (res, req, next) => {
  res.key = process.env.TOKEN
  next()
}

var corsOptions = {
  origin: "https://welbi.org/api",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use("/api", authenticate)

// Residents
app.get("/residents", cors(corsOptions), async (req, res) => {
  console.info("GET /residents")
  res.send(
    await axios.get(`${process.env.API}/residents?token=${process.env.TOKEN}`)
      .then(checkStatus)
      .then(response => response.data)
  )
})

app.post("/residents", cors(corsOptions), async (req, res) => {
  console.info("POST /residents")
  res.send(
    await axios.get(`${process.env.API}/residents?token=${process.env.TOKEN}`, req)
      .then(checkStatus)
      .then(response => response.data)
  )
})
// Programs
app.get("/programs", cors(corsOptions), async (req, res) => {
  console.info("GET /programs")
  res.send(
    await axios.get(`${process.env.API}/programs?token=${process.env.TOKEN}`)
      .then(checkStatus)
      .then(response => response.data)
  )
})

app.post("/programs", cors(corsOptions), async (req, res) => {
  console.info("POST /programs")
  res.send(
    await axios.get(`${process.env.API}/programs?token=${process.env.TOKEN}`, req)
      .then(checkStatus)
      .then(response => response.data)
  )
})

// app.use('/api', createProxyMiddleware({
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   //onProxyReq: (proxyReq, req, res) => { proxyReq.setHeader('Authorization', `bearer ${token}`)},
// }))

if (!module.parent) {
  const port = process.env.PORT || 3001

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".")
  })
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(error) // eslint-disable-line no-console
  throw error
}
