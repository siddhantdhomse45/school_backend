// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* ================= REGISTER ================= */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role, contact } = req.body;

//     // Validation
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     // if (role === "student" && !rollNumber) {
//     //   return res.status(400).json({ message: "Roll number required" });
//     // }

//     if (role !== "student" && !contact) {
//       return res.status(400).json({ message: "Contact required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       contact: role !== "student" ? contact : undefined,
//       // rollNumber: role === "student" ? rollNumber : undefined,
//     });

//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);

//     if (error.code === 11000) {
//       return res.status(409).json({ message: "Duplicate value error" });
//     }

//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================= LOGIN ================= */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email, role });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // if (role === "student" && user.rollNumber !== rollNumber) {
//     //   return res.status(401).json({ message: "Invalid roll number" });
//     // }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* REGISTER */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role, contact } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         message: "Required fields missing",
//       });
//     }

//     if (role !== "student" && !contact) {
//       return res.status(400).json({
//         message: "Contact required",
//       });
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({
//         message: "Email already registered",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       contact: role !== "student" ? contact : undefined,
//     });

//     res.status(201).json({
//       message: "Registration successful",
//     });
//   } catch (error) {
//     console.error(error);

//     if (error.code === 11000) {
//       return res.status(409).json({
//         message: "Duplicate value error",
//       });
//     }

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// /* LOGIN */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email, role });

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid credentials",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };










import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      contact,
      className,
      rollNumber,
    } = req.body;

    console.log("Incoming Data:", req.body);

    /* ✅ BASIC VALIDATION */
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    /* ✅ STUDENT VALIDATION */
    if (role === "student") {
      if (!className || !rollNumber) {
        return res.status(400).json({
          message: "Class and Roll Number are required for students",
        });
      }
    }

    /* ✅ NON-STUDENT VALIDATION */
    if (role !== "student" && !contact) {
      return res.status(400).json({
        message: "Contact required",
      });
    }

    /* ✅ CHECK EXISTING USER */
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    /* ✅ CHECK DUPLICATE ROLL NUMBER */
    if (role === "student") {
      const existingRoll = await User.findOne({ rollNumber });
      if (existingRoll) {
        return res.status(409).json({
          message: "Roll number already exists",
        });
      }
    }

    /* ✅ HASH PASSWORD */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ✅ CREATE USER */
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      contact: role !== "student" ? contact : undefined,
      className: role === "student" ? className : undefined,
      rollNumber: role === "student" ? rollNumber : undefined,
    });

    console.log("User Created:", newUser);

    res.status(201).json({
      message: "Registration successful ✅",
      user: newUser,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate value error",
      });
    }

    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password, role, className, rollNumber } = req.body;

    let user;

    /* ✅ STUDENT LOGIN WITH EXTRA CHECK */
    if (role === "student") {
      user = await User.findOne({
        email,
        role,
        className,
        rollNumber,
      });
    } else {
      user = await User.findOne({ email, role });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};