// import mongoose from "mongoose";

// const admissionSchema = new mongoose.Schema(
//   {
//     studentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     gender: {
//       type: String,
//       enum: ["Male", "Female", "Other"],
//     },
//     dob: {
//       type: Date,
//     },
//     classApplying: {
//       type: String,
//       required: true,
//     },
//     fatherName: String,
//     motherName: String,
//     mobile: {
//       type: String,
//       required: true,
//     },
//     email: String,
//     address: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Admission", admissionSchema);





import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    classApplying: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admission", admissionSchema);