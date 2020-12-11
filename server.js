const express = require('express') // faz o servidor
const nunjucks = require('nunjucks') // template engine ou motor de templates

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false, // permite no Nunjucks usar html
  noCache: true
})

server.get("/", function(req, res) {
  const about = {
    avatar_url: "https://avatars2.githubusercontent.com/u/41840074?s=460&u=fec6f1a197b55bcc590a2c60409baab2431abe53&v=4",
    name: "Bruno Romão",
    role: "Administrador especialista em marketing e mídias digitis",
    description: 'Programador full-stack focado em mobile, web e ciência de dados. Colaborador da <a href="https://www.revistasuacasa.arq.br/" target="_blank">Supernova Editora</a>',
    links: [
      {name: "Github", url: "https://github.com/bhrrcarioca/"},
      {name: "Twitter", url: "https://twitter.com/bruno_romao/"},
      {name: "Linkedin", url: "https://www.linkedin.com/in/bhrrcarioca/"}
    ]
  }

  return res.render("about", {about: about})
})

server.get("/portfolio", function(req, res) {

  return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id
  })

  if(!video){
    return res.send("video not found!")
  }

  return res.render("video", { item: video })
})

server.listen(5000, function() {
  console.log("server is running")
})