import express from "express";
import { test, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test)
// First verify the token in verifytoken function then we will call the next then it will go the updateuser API
router.put('/update/:userId' ,verifyToken ,updateUser)

export default router