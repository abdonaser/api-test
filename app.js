const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const courseValidation = require('./utils/courseValidation')
const { body, validationResult } = require('express-validator')
const { fieldValidation } = require('./utils/courseValidator')
let courses = require('./data')
const errorMessage = require('./utils/formatError')
//MiddleWares---------
app.use(express.json())
//---------------------------


// Get All Courses
app.get('/api/courses', (req, res) => {
    res.json(courses)
})

// Get specific Course
app.get('/api/courses/:courseId', (req, res) => {
    const courseId = +req.params.courseId
    const course = courses.find(course => course.id === courseId)
    if (!course) {
        res.status(404).json({ msg: "faild" })

    } else {
        res.status(200).json({ msg: "seccess", data: course })
    }
})

// Create specific Course

app.post('/api/courses', fieldValidation, (req, res) => {
    const result = validationResult(req)

    if (!result) {
        const courseData = req.body;
        if (courseData) {
            let newCourse = {
                id: Date.now(),
                ...courseData
            }
            courses.push(newCourse);
            res
                .status(201)
                .json({ msg: "added Successfully", data: newCourse })
        } else {
            res
                .status(404)
                .json({ msg: "faild adding" })
        }
    } else {
        res
            .status(404)
            .json({ msg: errorMessage(result.errors) })
    }

})

/**
 * title : {**** && *****}
 * price : {**** && *****}
 * 
 * 
 */



// Update specific Course
app.put('/api/courses/:courseId', (req, res) => {
    const courseId = +req.params.courseId

    const courseExist = courses.find(course => course.id === courseId)
    if (courseExist) {
        const courseUpdtaed = req.body
        courses = courses.map(course => course.id === courseId ? { id: course.id, ...courseUpdtaed } : course)
        console.log(courses);
        res
            .status(200)
            .json({ msg: "updated successfully", data: courseExist })
    } else {
        res
            .status(404)
            .json({ msg: "faild updating" })
    }

})

// Delete aspecific Course 
app.delete('/api/courses/:courseId', (req, res) => {
    const courseId = +req.params.courseId
    const courseExist = courses.find(course => course.id === courseId)
    if (courseExist) {
        courses = courses.filter(course => course.id !== courseId)
        res
            .status(200)
            .json({ msg: "Deleted successfully" })
    } else {
        res
            .status(404)
            .json({ msg: "faild Deleting" })
    }
})



app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })

