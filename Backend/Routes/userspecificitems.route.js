import { Router } from "express";
import { userSpecificItems } from "../Controllers/userspecificitems.controllers.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const specificItems = Router()

specificItems.get('/user-specific-items',verifyToken, userSpecificItems)

export default specificItems