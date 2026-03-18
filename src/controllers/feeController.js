// import Fee from "../models/Fee.js";
// import Student from "../models/Student.js";

// /* GET STUDENTS BY CLASS */

// export const getStudentsByClass = async (req, res) => {
//   try {

//     const { className } = req.params;

//     const students = await Student.find({ className });

//     res.json(students);
                                                                                                              
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };


// /* GET STUDENT FEES */

// export const getStudentFees = async (req, res) => {

//   try {

//     const { studentId } = req.params;

//     const fees = await Fee.find({ studentId });

//     if (!fees || fees.length === 0) {
//       return res.json({
//         totalFees: 0,
//         paidFees: 0,
//         pendingFees: 0
//       });
//     }

//     const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);

//     const paidFees = fees
//       .filter(f => f.status === "Paid")
//       .reduce((sum, f) => sum + f.amount, 0);

//     const pendingFees = fees
//       .filter(f => f.status === "Pending")
//       .reduce((sum, f) => sum + f.amount, 0);

//     res.json({
//       totalFees,
//       paidFees,
//       pendingFees
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }

// };







import Fee from "../models/Fee.js";
import Student from "../models/Student.js";

/* ✅ GET STUDENTS BY CLASS (BULLETPROOF) */
export const getStudentsByClass = async (req, res) => {
  try {
    const { className } = req.params;

    console.log("👉 Class from frontend:", className);

    // 🔥 Handle ALL possible DB cases
    const students = await Student.find({
      $or: [
        { class: String(className) },
        { class: Number(className) },
        { className: String(className) },
        { className: Number(className) },
      ],
    });

    console.log("👉 Students found:", students);

    // ✅ IMPORTANT: return empty message also
    if (!students.length) {
      return res.json([]);
    }

    res.json(students);
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ✅ GET STUDENT FEES (SAFE) */
export const getStudentFees = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("👉 Student ID:", id);

    const fees = await Fee.find({ studentId: id });

    console.log("👉 Fees found:", fees);

    let totalFees = 0;
    let paidFees = 0;
    let pendingFees = 0;

    fees.forEach((f) => {
      totalFees += f.amount;

      if (f.status === "Paid") {
        paidFees += f.amount;
      } else {
        pendingFees += f.amount;
      }
    });

    res.json({
      totalFees,
      paidFees,
      pendingFees,
    });
  } catch (err) {
    console.error("❌ Error fetching fees:", err);
    res.status(500).json({ message: err.message });
  }
};