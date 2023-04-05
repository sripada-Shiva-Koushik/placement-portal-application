import { db } from "../db.js"

export const getStudents = (req, res) => {
    const q = req.query
        ? "SELECT * FROM user"
        : "SELECT * FROM user";
    db.query(q, [req.query], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const addStudent = (req, res) => {
    res.json("from controller")
}
export const deleteStudent = (req, res) => {
    res.json("from controller")
}

export const updateStudent = (req, res) => {
    res.json("from controller")
}