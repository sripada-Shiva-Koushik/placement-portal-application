import express from "express"
import { addStudent, deleteStudent, getStudents, updateStudent } from "../controllers/student.js"

const router = express.Router()

router.get("/placement", getStudents)
router.post("/placement", addStudent)
router.delete("/placement", deleteStudent)
router.put("/placement", updateStudent)

// router.get("/test", (req, res) => {
//     res.json("this is post")
// })

export default router