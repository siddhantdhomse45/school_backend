import Attendance from "../models/Attendance.js";


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
  const data = await Attendance.find({ role: "student" })
    .populate("user", "name rollNumber")
    .sort({ date: -1 });

  res.json(data);
};

/* ===== GET STAFF ATTENDANCE ===== */
export const getStaffAttendance = async (req, res) => {
  const data = await Attendance.find({ role: "staff" })
    .populate("user", "name")
    .sort({ date: -1 });

  res.json(data);
};