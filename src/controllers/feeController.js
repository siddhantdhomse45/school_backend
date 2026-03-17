import Fee from "../models/Fee.js";
import Student from "../models/Student.js";

/* GET STUDENTS BY CLASS */

export const getStudentsByClass = async (req, res) => {
  try {

    const { className } = req.params;

    const students = await Student.find({ className });

    res.json(students);
                                                                                                              
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


/* GET STUDENT FEES */

export const getStudentFees = async (req, res) => {

  try {

    const { studentId } = req.params;

    const fees = await Fee.find({ studentId });

    if (!fees || fees.length === 0) {
      return res.json({
        totalFees: 0,
        paidFees: 0,
        pendingFees: 0
      });
    }

    const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);

    const paidFees = fees
      .filter(f => f.status === "Paid")
      .reduce((sum, f) => sum + f.amount, 0);

    const pendingFees = fees
      .filter(f => f.status === "Pending")
      .reduce((sum, f) => sum + f.amount, 0);

    res.json({
      totalFees,
      paidFees,
      pendingFees
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

};