import Staff from "../models/Staff.js";

/* ================= GET ALL STAFF ================= */
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE STAFF ================= */
export const createStaff = async (req, res) => {
  try {
    const { name, designation, email, phone } = req.body;

    if (!name || !designation || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({
        message: "Staff with this email already exists",
      });
    }

    const staff = await Staff.create({
      name,
      designation,
      email,
      phone,
    });

    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE STAFF ================= */
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE STAFF ================= */
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    res.status(200).json({
      message: "Staff deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
