import express from "express"
import { addStudent, getStudents, updateStudent, getStudentById, adminupdateStudent, getDeletePage, deletePlacement } from "../controllers/student.js"
// import { authenticateUser} from "../controllers/auth.js"

const router = express.Router()

router.get("/placement", getStudents)
router.get("/placement/get/:id", getStudentById);
router.put("/placement/update/:id", adminupdateStudent);
router.post("/placement/add", addStudent)
router.put("/admin/placement", updateStudent)
router.get("/placement/get/delete/:id", getDeletePage);
router.delete("/placement/delete/:id", deletePlacement)

// router.get("/test", (req, res) => {
//     res.json("this is post")
// })

export default router