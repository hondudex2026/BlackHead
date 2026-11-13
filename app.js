//dependencias
const express = require("express")
const path = require("path")
const app = express()


//Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//Ruta
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});


//server
const port = 49302
app.listen(port, () => {
    console.log(`Server corriendo en: "http://localhost:${port}"`)
})