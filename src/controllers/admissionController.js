import Admission from "../models/Admission.js";

/* ===============================
   CREATE Admission
================================ */
export const createAdmission = async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();

    res.status(201).json({
      success: true,
      message: "Admission form submitted successfully",
      data: admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit admission form",
      error: error.message,
    });
  }
};

/* ===============================
   READ ALL Admissions
================================ */
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   READ Single Admission by ID
================================ */
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   UPDATE Admission
================================ */
export const updateAdmission = async (req, res) => {
  try {
    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      data: updatedAdmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   DELETE Admission
================================ */
export const deleteAdmission = async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);

    if (!deletedAdmission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};