import {Router} from "express"
import { hola, ping } from "../controllers/index.controllers.js"

const router = Router()

router.get("/",hola)
router.get("/ping",ping)

export default router