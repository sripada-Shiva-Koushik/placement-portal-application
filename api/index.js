import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/students.js"
import cookieParser from "cookie-parser"
import cors from "cors"
// import { authenticateUser } from "./controllers/auth.js"

const app = express()
app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/students", postRoutes)

app.listen(8000, () => {
    console.log("Connected to the port 8000!")
});

