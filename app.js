const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/dbConnection');


//MiddleWares---------
app.use(express.json())

// courses Routes
const coursesRouter = require('./routes/course.routes');

app.use('/api/courses', coursesRouter)


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

