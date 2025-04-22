const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/dbConnection');
const { ERROR } = require('./utils/json_status_text');



//MiddleWares---------
app.use(express.json())

// courses Routes
const coursesRoutes = require('./routes/course.routes');

app.use('/api/courses', coursesRoutes)

// Handling 404 errors
app.all('*', (req, res) => {
    res.status(500)
        .json({
            status: ERROR,
            message: "This Resourse Is Not Available"
        })
    // If the request comes from a browser
    // if (req.accepts('html')) {
    //     res.render('404.ejs');
    // }
    // If the request comes from mobile/postman
    // else if (req.accepts('json')) {
    //     res.json({ message: '404 page not found' });
    // }
    // Default response if the request comes from other sources
    // else {
    //     res.type('txt').send('404 Not Found');
    // }
});


// Global Error Handlers {errorMessage, statusCode, statusText}
app.use((error, req, res, next) => {
    return res
        .status(error.statusCode || 500)
        .json({
            status: error.statusText || ERROR,
            message: error.errorMessage || error.message,
            code: error.statusCode || 500,
            data: null
        })
})
//#endregion




//#region  Server Creation
connectDB(); // Connect to the database

// Don't start the server until the database connection is established
mongoose.connection.once('open', () => {
    app.listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}`)
    );
});

// Log errors if the database connection fails
mongoose.connection.on('error', (error) =>
    console.log('Database connection error:', error)
);

// Optional: Uncomment this line to log when the database connection is established successfully
// mongoose.connection.on('open', () =>
//     console.log('Database connected successfully')
// );
//#endregion


