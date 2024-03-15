const express = require('express')
const bodyParser = require('body-parser')
const port = 9002
const app = express()
const connect = require('./database/conn')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

const routesFood = require('./routes/FoodRoutes')
const routesUser = require('./routes/UserRoutes')
const routesCommande = require('./routes/CommandeRoutes')

connect()

app.use('/foods', routesFood)
app.use('', routesUser)
app.use('/commandes', routesCommande)

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`)
});
