import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
{
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  marks: {
    type: Number,
    required: true,
  },

  maxMarks: {
    type: Number,
    required: true,
  },

  examType: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },
},
{ timestamps: true }
);

export default mongoose.model("Exam", examSchema);