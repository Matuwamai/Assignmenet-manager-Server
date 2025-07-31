import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createAdminAssignment = async (req, res) => {
  try {
    const { title, description, deadline,  } = req.body;
 const userId ="1cede590-9fb3-4b5d-a40b-f77c1a58dc88"
    const assignment = await prisma.adminAssignment.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
        userId
      },
    });

    res.status(201).json({ message: "Admin assignment created", assignment });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ error: "Failed to create admin assignment" });
  }
};

// 2. Get All Admin Assignments
export const getAllAdminAssignments = async (req, res) => {
  try {
    const assignments = await prisma.adminAssignment.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(assignments);
  } catch (error) {
    console.error("Fetch All Error:", error);
    res.status(500).json({ error: "Failed to fetch admin assignments" });
  }
};

// 3. Get Admin Assignment by ID with all Student Submissions
export const getAdminAssignmentById = async (req, res) => {
  console.log(req.body)
  const { id } = req.params;
  try {
    const assignment = await prisma.adminAssignment.findUnique({
      where: { id},
      include: {
        assignemnts: {
          include: {
            report:true,
            
            student:{
            select:{name :true}
            
          }
        },
        }
      }
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
    console.log("sucess");
  } catch (error) {
    console.error("Fetch By ID Error:", error);
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
};

// 4. Delete Admin Assignment
export const deleteAdminAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.adminAssignment.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Assignment deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};
