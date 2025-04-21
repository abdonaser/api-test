const { validationResult } = require("express-validator");
let courses = require("../data/courses");
const errorMessage = require("../utils/formatError");
const courseModel = require("../models/course.model");

const getAllCourser = async (req, res) => {
    const courses_db = await courseModel.find()
    res.json(courses_db)
};

const getCourse = async (req, res) => {
    const courseId = req.params.courseId
    // const course = courses.find(course => course.id === courseId)
    try {
        const course = await courseModel.findById(courseId)
        if (!course) {
            res.status(404).json({ msg: "course not Found" })
        } else {
            res.status(200).json({ msg: "seccess", data: course })
        }
    } catch (error) {
        res.status(500).json({ msg: "invalid ID" })
    }
};

const addCourse = async (req, res) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        const courseData = req.body;

        if (courseData) {
            let newCourse = {
                ...courseData
            }

            // const addcourse = new courseModel(newCourse)
            // await addcourse.save();
            await courseModel.create(newCourse)

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

const UpdateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updateData = req.body;

        // Check if course exists
        const courseExist = await courseModel.findById(courseId);

        if (!courseExist) {
            return res.status(404).json({ msg: "Course not found" });
        }

        // Update course
        const updatedCourse = await courseModel.findOneAndReplace(
            { _id: courseId },
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            msg: "Course updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        console.error("UpdateCourse error:", error);
        return res.status(500).json({ msg: "invalid ID", err: error.message });
    }
};


const Update_SpeceficProperty_Course = async (req, res) => {
    try {
        const { courseId } = req.params
        const newFieldsUpdated = req.body

        const courseExist = await courseModel.findById(courseId)
        if (!courseExist) {
            return res
                .status(404)
                .json({ msg: "Course Not Found" })
        }

        const courseAfterUpdating = await courseModel.findByIdAndUpdate(courseId, { $set: newFieldsUpdated }, { new: true, runValidators: true }
        )


        return res
            .status(200)
            .json({ msg: "updated successfully", data: courseAfterUpdating })

    } catch (error) {
        return res.status(500).json({ msg: "invalid ID", err: error.message });
    }

};


const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        const deletedCourse = await courseModel.findByIdAndDelete(courseId);
        console.log(deletedCourse);

        if (deletedCourse) {
            return res.status(200).json({ msg: "Course deleted successfully" });
        } else {
            return res.status(400).json({ msg: "Failed to delete course" });
        }

    } catch (error) {
        return res.status(500).json({ msg: "An error occurred", error: error.message });
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