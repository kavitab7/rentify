const express = require('express')
const dotenv = require("dotenv")
const morgan = require('morgan')
const connectDB = require('./config/db')
const propertyRoutes = require('./routes/propertyRoutes')
const userRoutes = require("./routes/userRoute")
const path = require('path')

const app = express()
dotenv.config();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/property', propertyRoutes)

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(
        `Server Running on port ${PORT}`
    );
});