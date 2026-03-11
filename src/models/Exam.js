import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: String,
  marks: Number,
  maxMarks: Number,
  examType: String,
  date: Date,
});

export default mongoose.model("Exam", examSchema);