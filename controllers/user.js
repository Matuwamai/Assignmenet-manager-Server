import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
// Create a new user
export const createUser = async (req, res) => {
  try {
    console.log("Data", req.body);
    const { name, email, password, role, regNumber, studyProgram, yearOfStudy } = req.body;

    // Normalize role
    const normalizedRole = role.toUpperCase(); // 'STUDENT' or 'ADMIN'

    // Validate required user fields
    if (!name || !email || !password || !normalizedRole) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: normalizedRole, // Must match Prisma Role enum
      },
    });

    let student = null;

    if (normalizedRole === "STUDENT") {
      if (!regNumber || !studyProgram || !yearOfStudy) {
        return res.status(400).json({ message: "Missing student-specific fields" });
      }

      student = await prisma.student.create({
        data: {
          userId: user.id,
          regNumber,
          studyProgram,
          yearOfStudy: parseInt(yearOfStudy),
        },
      });
    }

    res.status(201).json({ ...user, student });

  } catch (err) {
    console.error("Create User Error:", err);
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};



// Get paginated + searchable users
export const getUsers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (currentPage - 1) * pageSize;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({
        where: {
          OR: [
            { name: { contains: search } },
            { email: { contains: search} },
          ],
        },
      }),
    ]);

    res.status(200).json({
      data: users,
      total,
      currentPage,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get single user
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password, role },
    });

    res.status(200).json(user);
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({ where: { id } });

    res.status(200).json({message: "User Deleted Succefully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role:user.role, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token , user});
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
    console.log(error);
  }
};