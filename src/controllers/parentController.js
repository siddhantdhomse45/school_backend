import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

/* ================= GET ALL PARENTS ================= */
export const getParents = async (req, res) => {
  try {
    const parents = await User.find({ role: "parent" })
      .select("-password")
      .populate("studentId", "name className seatNumber")
      .sort({ createdAt: -1 });     

    res.json(parents);      
  } catch (error) {
    console.error("GET PARENTS ERROR:", error);    
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SINGLE PARENT ================= */
export const getParentById = async (req, res) => {
  try {
    const parent = await User.findById(req.params.id)
      .select("-password")
      .populate("studentId", "name className seatNumber");

    if (!parent || parent.role !== "parent") {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.json(parent);
  } catch (error) {
    console.error("GET PARENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE PARENT ================= */
export const createParent = async (req, res) => {
  try {
    const { name, email, password, contact, studentId } = req.body;

    // Validation
    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // If studentId is provided, verify it exists
    if (studentId) {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      // Update student's parentId
      await Student.findByIdAndUpdate(studentId, { parentId: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const parent = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "parent",
      contact,
      studentId: studentId || null,
    });

    // If studentId was provided, link the parent to the student
    if (studentId) {
      await Student.findByIdAndUpdate(studentId, { parentId: parent._id });
    }

    res.status(201).json({
      message: "Parent created successfully",
      parent: {
        id: parent._id,
        name: parent.name,
        email: parent.email,
        contact: parent.contact,
        studentId: parent.studentId,
      },
    });
  } catch (error) {
    console.error("CREATE PARENT ERROR:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate value error" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE PARENT ================= */
export const updateParent = async (req, res) => {
  try {
    const { name, email, contact, studentId } = req.body;
    const { id } = req.params;

    const parent = await User.findById(id);
    if (!parent || parent.role !== "parent") {
      return res.status(404).json({ message: "Parent not found" });
    }

    // Check if email is being changed and if it's already in use
    if (email && email !== parent.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    // Handle student linking
    if (studentId !== undefined) {
      // Remove old student link if exists
      if (parent.studentId) {
        await Student.findByIdAndUpdate(parent.studentId, { parentId: null });
      }

      // Link new student if provided
      if (studentId) {
        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
        await Student.findByIdAndUpdate(studentId, { parentId: parent._id });
      }
    }

    const updatedParent = await User.findByIdAndUpdate(
      id,
      {
        name: name || parent.name,
        email: email || parent.email,
        contact: contact || parent.contact,
        studentId: studentId !== undefined ? studentId : parent.studentId,
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Parent updated successfully",
      parent: updatedParent,
    });
  } catch (error) {
    console.error("UPDATE PARENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE PARENT ================= */
export const deleteParent = async (req, res) => {
  try {
    const { id } = req.params;

    const parent = await User.findById(id);
    if (!parent || parent.role !== "parent") {
      return res.status(404).json({ message: "Parent not found" });
    }

    // Remove parent link from student if exists
    if (parent.studentId) {
      await Student.findByIdAndUpdate(parent.studentId, { parentId: null });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "Parent deleted successfully" });
  } catch (error) {
    console.error("DELETE PARENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET UNLINKED STUDENTS ================= */
export const getAvailableStudents = async (req, res) => {
  try {
    // Get students who don't have a parent or have a different parent
    const students = await Student.find({
      $or: [
        { parentId: null },
        { parentId: { $exists: false } }
      ]
    }).select("name className seatNumber");

    res.json(students);
  } catch (error) {
    console.error("GET AVAILABLE STUDENTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// controllers/parentController.js

export const linkStudentToParent = async (req, res) => {
  try {
    const { parentId, studentId } = req.body;

    const parent = await User.findById(parentId);
    const student = await Student.findById(studentId);

    if (!parent || parent.role !== "parent") {
      return res.status(404).json({ message: "Parent not found" });
    }

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    parent.studentId = studentId;
    await parent.save();

    student.parentId = parentId;
    await student.save();

    res.json({ message: "Linked successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};