import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "parent", "staff", "admin"],
      required: true,
    },

    contact: {
      type: String,
      required: function () {
        return this.role !== "student";
      },
      default: undefined,
    },

    rollNumber: {
      type: String,
      unique: true,
      sparse: true, // ✅ allows multiple null values
      default: undefined,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);