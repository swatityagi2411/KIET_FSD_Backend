const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const checkroles = require("../middleware/roleMiddleware");
const Student = require("../models/studentModel");

// Router-level Middleware

router.use((req, res, next) => {

    console.log("You are at Student Route");

    next();
});
router.use(authmiddleware)
// GET ALL STUDENTS


router.get(
    "/",
    checkroles("teacher", "student", "admin"),

    async (req, res) => {

        try {

            const students = await Student.find();

            res.status(200).json(students);

        } catch (error) {

            res.status(500).json({
                message: "Error fetching students",
                error: error.message
            });
        }
    }
);



// SEARCH / FILTER


router.get(
    "/search",
    checkroles("teacher", "student", "admin"),

    async (req, res) => {

        try {

            const { course, age } = req.query;

            const filter = {};

            if (course) {
                filter.course = course;
            }

            if (age) {
                filter.age = Number(age);
            }

            const students = await Student.find(filter);

            res.status(200).json(students);

        } catch (error) {

            res.status(500).json({
                message: "Error searching students",
                error: error.message
            });
        }
    }
);



// GET STUDENT BY ID

router.get(
    "/:id",
    checkroles("teacher", "student", "admin"),

    async (req, res) => {

        try {

            const id = req.params.id;

            const student = await Student.findById(id);

            if (!student) {

                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.status(200).json(student);

        } catch (error) {

            res.status(500).json({
                message: "Error fetching student",
                error: error.message
            });
        }
    }
);



// CREATE STUDENT


router.post(
    "/",
    checkroles("teacher", "admin"),

    async (req, res) => {

        try {

            const { name, age, course } = req.body;

            const student = await Student.create({
                name,
                age,
                course
            });

            res.status(201).json({
                message: "Student created successfully",
                student
            });

        } catch (error) {

            res.status(500).json({
                message: "Error creating student",
                error: error.message
            });
        }
    }
);



// PUT - COMPLETE UPDATE

router.put(
    "/:id",
    checkroles("teacher", "admin"),

    async (req, res) => {

        try {

            const id = req.params.id;

            const { name, age, course } = req.body;

            const student = await Student.findByIdAndUpdate(
                id,
                {
                    name,
                    age,
                    course
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!student) {

                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.status(200).json({
                message: "Student updated successfully",
                student
            });

        } catch (error) {

            res.status(500).json({
                message: "Error updating student",
                error: error.message
            });
        }
    }
);

// DELETE STUDENT

router.delete(
    "/:id",
    checkroles("admin"),

    async (req, res) => {

        try {

            const id = req.params.id;

            const student = await Student.findByIdAndDelete(id);

            if (!student) {

                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.status(200).json({
                message: "Student deleted successfully",
                student
            });

        } catch (error) {

            res.status(500).json({
                message: "Error deleting student",
                error: error.message
            });
        }
    }
);


module.exports = router;