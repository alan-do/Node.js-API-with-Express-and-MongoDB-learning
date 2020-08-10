const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors')

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();


const app = express();
//Body parser
app.use(express.json());

//route
const bootcamps = require('./routes/bootcamps');

//Dev loggimg middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
//Handle Unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server & exit
    server.close(() => process.exit(1));
});