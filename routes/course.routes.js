const {
    getAllCourser,
    UpdateCourse,
    Update_SpeceficProperty_Course,
    addCourse,
    deleteCourse,
    getCourse } = require('../controlers/coursersControlers')
const fieldValidation = require('../midelWares/courseSchema')
const express = require('express')
const router = express.Router()


router.route('/')
    .get(getAllCourser)
    .post(fieldValidation(), addCourse)

router.route('/:courseId')
    .get(getCourse)
    .put(UpdateCourse)
    .patch(Update_SpeceficProperty_Course)
    .delete(deleteCourse)



module.exports = router