import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "active" },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
