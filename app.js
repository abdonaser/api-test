const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//MiddleWares---------
app.use(express.json())



// courses Routes
const coursesRouter = require('./routes/course.routes')
app.use('/api/courses', coursesRouter)



app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })

