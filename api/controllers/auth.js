import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    //CHECK EXISTING USER
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("Student already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(`rid`,`username`,`email`,`password`,`gender`,`year`) VALUES (?)"
        const values = [
            req.body.rid,
            req.body.username,
            req.body.email,
            hash,
            req.body.gender,
            req.body.year
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    })

}


export const login = (req, res) => {
    //CHECK USER

    const q = "SELECT * FROM user WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        // const token = jwt.sign({ id: data[0].rid }, "jwtkey");
        const token = jwt.sign({ id: data[0].rid, isAdmin: data[0].username === "koushik" && data[0].password === "koushik" }, "jwtkey");
        // req.session.user = result;

        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other)
    })

}

const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) {
        return res.status(401).json({ message: "You need to be authenticated to access this page" })
    }

    try {
        const decoded = jwt.verify(token, "jwtkey")
        if (decoded.isAdmin) {
            req.adminId = decoded.id
            return next()
        } else {
            return res.status(401).json({ message: "You are not authorized to access this page" })
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

export const logout = (req, res) => {

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: false
    }).status(200).json("User has been logged out. ")

}

