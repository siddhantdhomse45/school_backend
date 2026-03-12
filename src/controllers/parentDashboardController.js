// import User from "../models/User.js";
// import Student from "../models/Student.js";
// import Attendance from "../models/Attendance.js";
// import Exam from "../models/Exam.js";
// import Fee from "../models/Fee.js";

// export const getParentDashboard = async (req, res) => {
//   try {
//     const parentId = req.params.parentId;

//     const parent = await User.findById(parentId);

//     if (!parent || parent.role !== "parent") {
//       return res.status(404).json({ message: "Parent not found" });
//     }

//     let student = await Student.findById(parent.studentId);

//     // If no student linked, return dummy student for demo purposes
//     if (!student) {
//       student = {
//         _id: "dummy-student-1",
//         name: "Demo Student",
//         className: "Class 10-A",
//         seatNumber: "A001"
//       };
//     }

//     /* Attendance from Jan to Today */
//     const startDate = new Date(new Date().getFullYear(), 0, 1);

//     let attendance = await Attendance.find({
//       studentId: student._id,
//       date: { $gte: startDate },
//     }).sort({ date: -1 });

//     // If no attendance records, return dummy data
//     if (attendance.length === 0) {
//       attendance = [
//         { _id: "1", date: new Date("2024-01-15"), status: "Present" },
//         { _id: "2", date: new Date("2024-01-16"), status: "Present" },
//         { _id: "3", date: new Date("2024-01-17"), status: "Present" },
//         { _id: "4", date: new Date("2024-01-18"), status: "Absent" },
//         { _id: "5", date: new Date("2024-01-19"), status: "Present" },
//         { _id: "6", date: new Date("2024-02-10"), status: "Present" },
//         { _id: "7", date: new Date("2024-02-11"), status: "Present" },
//         { _id: "8", date: new Date("2024-02-12"), status: "Present" },
//         { _id: "9", date: new Date("2024-03-05"), status: "Present" },
//         { _id: "10", date: new Date("2024-03-06"), status: "Present" },
//         { _id: "11", date: new Date("2024-04-10"), status: "Present" },
//         { _id: "12", date: new Date("2024-04-11"), status: "Absent" },
//         { _id: "13", date: new Date("2024-05-15"), status: "Present" },
//         { _id: "14", date: new Date("2024-05-16"), status: "Present" },
//         { _id: "15", date: new Date("2024-06-20"), status: "Present" },
//       ];
//     }

//     /* Exams */
//     let exams = await Exam.find({
//       studentId: student._id,
//     }).sort({ date: -1 });

//     // If no exams, return dummy data
//     if (exams.length === 0) {
//       exams = [
//         { _id: "1", subject: "Mathematics", marks: 85, maxMarks: 100, examType: "Unit Test 1", date: new Date("2024-01-20") },
//         { _id: "2", subject: "Science", marks: 78, maxMarks: 100, examType: "Unit Test 1", date: new Date("2024-01-22") },
//         { _id: "3", subject: "English", marks: 92, maxMarks: 100, examType: "Unit Test 1", date: new Date("2024-01-25") },
//         { _id: "4", subject: "Mathematics", marks: 88, maxMarks: 100, examType: "Unit Test 2", date: new Date("2024-02-15") },
//         { _id: "5", subject: "Science", marks: 75, maxMarks: 100, examType: "Unit Test 2", date: new Date("2024-02-18") },
//         { _id: "6", subject: "History", marks: 95, maxMarks: 100, examType: "Half Yearly", date: new Date("2024-03-10") },
//         { _id: "7", subject: "Geography", marks: 82, maxMarks: 100, examType: "Half Yearly", date: new Date("2024-03-12") },
//       ];
//     }

//     /* Fees */
//     let fees = await Fee.find({
//       studentId: student._id,
//     }).sort({ date: -1 });

//     // If no fees, return dummy data
//     if (fees.length === 0) {
//       fees = [
//         { _id: "1", amount: 15000, status: "Paid", date: new Date("2024-01-05") },
//         { _id: "2", amount: 5000, status: "Paid", date: new Date("2024-04-01") },
//         { _id: "3", amount: 5000, status: "Pending", date: new Date("2024-07-01") },
//         { _id: "4", amount: 3000, status: "Pending", date: new Date("2024-10-01") },
//       ];
//     }

//     /* Attendance Summary */
//     const totalDays = attendance.length;
//     const presentDays = attendance.filter(a => a.status === "Present").length;
//     const absentDays = totalDays - presentDays;

//     const attendancePercentage =
//       totalDays === 0 ? 0 : Math.round((presentDays / totalDays) * 100);

//     /* Monthly Attendance Data for Chart */
//     const monthlyData = {};
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

//     attendance.forEach((record) => {
//       const date = new Date(record.date);
//       const monthIndex = date.getMonth();
//       const monthName = months[monthIndex];

//       if (!monthlyData[monthName]) {
//         monthlyData[monthName] = { total: 0, present: 0 };
//       }
//       monthlyData[monthName].total += 1;
//       if (record.status === "Present") {
//         monthlyData[monthName].present += 1;
//       }
//     });

//     const monthly = months.map((month) => {
//       const data = monthlyData[month] || { total: 0, present: 0 };
//       const percentage = data.total === 0 ? 0 : Math.round((data.present / data.total) * 100);
//       return {
//         month,
//         percentage,
//         present: data.present,
//         total: data.total
//       };
//     });

//     res.json({
//       student,
//       attendanceSummary: {
//         totalDays,
//         presentDays,
//         absentDays,
//         attendancePercentage,
//         monthly
//       },
//       attendance,
//       exams,
//       fees,
//     });

//   } catch (error) {
//     console.error("PARENT DASHBOARD ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };











import User from "../models/User.js";
import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Exam from "../models/Exam.js";
import Fee from "../models/Fee.js";

export const getParentDashboard = async (req, res) => {
  try {

    const parentId = req.params.parentId;

    const parent = await User.findById(parentId);

    if (!parent || parent.role !== "parent") {
      return res.status(404).json({ message: "Parent not found" });
    }

    const student = await Student.findById(parent.studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not linked to parent"
      });
    }

    /* Attendance */
    const startDate = new Date(new Date().getFullYear(), 0, 1);

    const attendance = await Attendance.find({
      userId: student._id,
      userType: "Student",
      date: { $gte: startDate },
    }).sort({ date: -1 });

    /* Exams */

    const exams = await Exam.find({
      studentId: student._id,
    }).sort({ date: -1 });

    /* Fees */

    const fees = await Fee.find({
      studentId: student._id,
    }).sort({ date: -1 });

    /* Attendance Summary */

    const totalDays = attendance.length;

    const presentDays = attendance.filter(
      a => a.status === "Present"
    ).length;

    const absentDays = totalDays - presentDays;

    const attendancePercentage =
      totalDays === 0
        ? 0
        : Math.round((presentDays / totalDays) * 100);

    /* Monthly Chart */

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const monthlyData = {};

    attendance.forEach((record) => {

      const monthIndex = new Date(record.date).getMonth();

      const month = months[monthIndex];

      if (!monthlyData[month]) {
        monthlyData[month] = { total: 0, present: 0 };
      }

      monthlyData[month].total += 1;

      if (record.status === "Present") {
        monthlyData[month].present += 1;
      }

    });

    const monthly = months.map((m) => {

      const data = monthlyData[m] || { total: 0, present: 0 };

      const percentage =
        data.total === 0
          ? 0
          : Math.round((data.present / data.total) * 100);

      return {
        month: m,
        percentage,
        present: data.present,
        total: data.total
      };

    });

    res.json({
      student,
      attendanceSummary: {
        totalDays,
        presentDays,
        absentDays,
        attendancePercentage,
        monthly
      },
      attendance,
      exams,
      fees
    });

  } catch (error) {

    console.error("Parent Dashboard Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};