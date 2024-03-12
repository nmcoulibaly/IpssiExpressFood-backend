require('dotenv').config();
const mongoose = require('mongoose')

const connect = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect('mongodb+srv://ibenothmen:Azerty123456789@clusteref.iizzzfs.mongodb.net/')
        console.log("Connexion reussie")
    }
    catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connect
