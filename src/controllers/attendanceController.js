import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";


export const markAttendance = async (req, res) => {
  try {
    const { userId, userType, date, status } = req.body;

    console.log("ATTENDANCE BODY:", req.body);

    const existing = await Attendance.findOne({ userId, userType, date });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: "Attendance updated" });
    }

    await Attendance.create({
      userId,
      userType,
      date,
      status,
    });

    res.status(201).json({ message: "Attendance marked" });
  } catch (error) {
    console.error("❌ ATTENDANCE ERROR:", error); // 👈 THIS
    res.status(500).json({ message: "Server error" });
  }
};



/* ===== GET STUDENT ATTENDANCE ===== */
export const getStudentAttendance = async (req, res) => {
  const { className, date } = req.query;
  
  let query = { userType: "Student" };
  
  if (className) {
    query.className = className;
  }
  if (date) {
    query.date = date;
  }
  
  const data = await Attendance.find(query)
    .populate("userId", "name seatNumber className")
    .sort({ date: -1 });

  res.json(data);
};

/* ===== GET STUDENT BY CLASS ===== */
export const getStudentsByClass = async (req, res) => {
  const { className } = req.query;
  
  try {
    const query = className ? { className } : {};
    const students = await Student.find(query).sort({ name: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===== GET STAFF ATTENDANCE ===== */
export const getStaffAttendance = async (req, res) => {
  const { date } = req.query;
  
  let query = { userType: "Staff" };
  if (date) {
    query.date = date;
  }
  
  const data = await Attendance.find(query)
    .populate("userId", "name")
    .sort({ date: -1 });

  res.json(data);
};
