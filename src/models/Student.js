import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    seatNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
