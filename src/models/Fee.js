import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  amount: Number,
  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending",
  },
  date: Date,
});

export default mongoose.model("Fee", feeSchema);