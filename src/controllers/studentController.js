import Student from "../models/Student.js";

/* ================= GET ALL STUDENTS ================= */
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE STUDENT ================= */
export const createStudent = async (req, res) => {
  try {
    const { name, className, seatNumber } = req.body;

    // ✅ REQUIRED FIELD VALIDATION
    if (!name || !className || seatNumber === undefined) {
      return res.status(400).json({
        message: "Name, Class and Seat Number are required",
      });
    }

    // ✅ DUPLICATE SEAT NUMBER CHECK
    const existingStudent = await Student.findOne({ seatNumber });
    if (existingStudent) {
      return res.status(409).json({
        message: "Seat number already exists",
      });
    }

    const student = await Student.create({
      name,
      className,
      seatNumber,
    });

    res.status(201).json(student);

  } catch (error) {
    // ✅ HANDLE MONGOOSE VALIDATION ERRORS
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map(err => err.message)
          .join(", "),
      });
    }

    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE STUDENT ================= */
export const updateStudent = async (req, res) => {
  try {
    const { seatNumber } = req.body;

    // ✅ CHECK DUPLICATE SEAT NUMBER (EXCEPT SELF)
    if (seatNumber !== undefined) {
      const duplicate = await Student.findOne({
        seatNumber,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(409).json({
          message: "Seat number already exists",
        });
      }
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map(err => err.message)
          .join(", "),
      });
    }

    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE STUDENT ================= */
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
