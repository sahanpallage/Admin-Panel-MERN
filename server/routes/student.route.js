import { Router } from "express";
import Student from "../models/student.model.js";

const router = Router();

router.get("/", async (req, res) => {
  await Student.find()
    .then((students) => res.status(200).json({ students, success: true }))
    .catch((error) => res.status(400).json({ error, success: false }));
});

router.get("/:id", async (req, res) => {
  const studentId = req.params.id;
  await Student.findById(studentId)
    .then((student) => res.status(200).json({ student, success: true }))
    .catch((error) => res.status(400).json({ error, success: false }));
});

router.post("/add", async (req, res) => {
  const latestStudent = await Student.findOne({}, {}, { sort: { _id: -1 } });
  const newStudent = new Student({
    _id: latestStudent ? latestStudent._id + 1 : 1,
    ...req.body,
  });
  await newStudent
    .save()
    .then(() =>
      res
        .status(200)
        .json({ message: "Student added successfully!", success: true })
    )
    .catch((error) => res.status(400).json({ error, success: false }));
});

router.put("/update/:id", async (req, res) => {
  const studentId = req.params.id;

  await Student.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((student) =>
      res.status(200).json({
        message: "Student updated successfully!",
        success: true,
        student,
      })
    )
    .catch((error) => res.status(400).json({ error, success: false }));
});

router.delete("/delete/:id", async (req, res) => {
  const studentId = req.params.id;
  await Student.findByIdAndDelete(studentId)
    .then(() =>
      res
        .status(200)
        .json({ message: "Student deleted successfully!", success: true })
    )
    .catch((error) => res.status(400).json({ error, success: false }));
});

export default router;
