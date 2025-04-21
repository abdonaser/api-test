const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3000


//MiddleWares---------
app.use(express.json())


// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));




// courses Routes
const coursesRouter = require('./routes/course.routes');
app.use('/api/courses', coursesRouter)


app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })

