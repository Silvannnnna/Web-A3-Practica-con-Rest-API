import "dotenv/config"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.routes.js"
import { connectDB } from "./utils/db.js"

connectDB()

const app = express()

app.use(cors({ origin: process.env.WEB_URL || true }))
app.use(express.json())
app.use(morgan("dev"))
app.use(indexRoutes)
app.use(loginRoutes)
app.use(usersRoutes)

const PORT = 8000

app.listen(PORT,console.log("http://localhost:"+PORT))