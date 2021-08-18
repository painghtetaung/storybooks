const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, //to stop some warning
            useUnifiedTopology: true, //to stop some warning
            useFindAndModify: false //to stop some warning
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1) //to exit the process with failure
    }
}

module.exports = connectDB //to use coonnectDB in app.js