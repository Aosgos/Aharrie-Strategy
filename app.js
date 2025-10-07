const express = require('express');
require('dotenv').config();
const path = require('path');

const authRoute = require('./src/routes/authRoute');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.APP_PORT || 2020;


app.use(express.json());
app.use(cookieParser());

// setup route
// app.use(pageRoute);
// app.use('/superadmin', superAdminRoute);
app.use('/api/v1/auth', authRoute);


const { dbconnect } = require('./src/config/dbConnection')
dbconnect().then(res => console.log('connected'))
    .catch(e => console.log(e))

app.listen(port, () => {
    console.log('server is running on port:', port)
})