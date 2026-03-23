


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       enum: ["student", "parent", "staff", "admin"],
//       required: true,
//     },

//     contact: {
//       type: String,
//       required: function () {
//         return this.role !== "student";
//       },
//       default: undefined,
//     },


//     rollNumber: {
//       type: String,
//       unique: true,
//       sparse: true, // ✅ allows multiple null values
//       default: undefined,
//     },

//     // For parent users - link to their child's Student record
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//       default: null,
//     },

//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);





import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

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
    },

    /* ✅ STUDENT FIELDS */
    className: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    rollNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    /* ✅ PARENT LINK */
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔥 linking to student user
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);