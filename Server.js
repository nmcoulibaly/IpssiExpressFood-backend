const express = require('express')
const bodyParser = require('body-parser')
const port = 9009
const app = express()
const connect = require('./database/conn')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

const routesFood = require('./routes/FoodRoutes')
const routesUser = require('./routes/UserRoutes')

connect()

app.use('/foods', routesFood)
app.use('', routesUser)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`)
});
