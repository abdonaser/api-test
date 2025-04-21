const { validationResult } = require("express-validator");
// let courses = require("../public/data/courses");
const { allCourses, writeData } = require('../helpers/read_write_Helpers');
const errorMessage = require("../utils/formatError");

// Read all Courses
const courses = allCourses()

const getAllCourser = (req, res) => {
    res.status(200).json({ msg: "seccess", data: courses })
};

const getCourse = (req, res) => {
    const courseId = +req.params.courseId
    const course = courses.find(course => course.id === courseId)
    if (!course) {
        res.status(404).json({ msg: "faild" })

    } else {
        res.status(200).json({ msg: "seccess", data: course })
    }
};

const addCourse = (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        const courseData = req.body;

        if (courseData) {
            let newCourse = {
                id: Date.now(),
                ...courseData
            }
            // courses.push(newCourse);
            let newdata = [...courses, newCourse]
            writeData(newdata)
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

};

const UpdateCourse = (req, res) => {
    const courseId = +req.params.courseId

    const courseExist = courses.find(course => course.id === courseId)
    if (courseExist) {
        const courseUpdtaed = req.body
        let newdata = courses.map(course => course.id === courseId ? { id: course.id, ...courseUpdtaed } : course)
        writeData(newdata)
        res
            .status(200)
            .json({ msg: "updated successfully", data: courseExist })
    } else {
        res
            .status(404)
            .json({ msg: "faild updating" })
    }

};

const Update_SpeceficProperty_Course = (req, res) => {
    const courseId = +req.params.courseId
    const courseExist = courses.find(course => course.id === courseId)

    if (courseExist) {
        const newFieldsUpdated = req.body
        let newdata = courses.map(course => course.id === courseId ? { ...courseExist, ...newFieldsUpdated } : course)
        writeData(newdata)
        const courseAfterUpdating = courses.find(course => course.id === courseId)

        return res
            .status(200)
            .json({ msg: "updated successfully", data: courseAfterUpdating })
    } else {
        return res
            .status(404)
            .json({ msg: "this course not Found" })
    }

};


const deleteCourse = (req, res) => {
    const courseId = +req.params.courseId
    const courseExist = courses.find(course => course.id === courseId)
    if (courseExist) {
        let newdata = courses.filter(course => course.id !== courseId)
        writeData(newdata)
        res
            .status(200)
            .json({ msg: "Deleted successfully" })
    } else {
        res
            .status(404)
            .json({ msg: "faild Deleting" })
    }
};




module.exports = {
    getAllCourser,
    getCourse,
    addCourse,
    UpdateCourse,
    Update_SpeceficProperty_Course,
    deleteCourse,
}