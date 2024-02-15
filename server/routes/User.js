import express from "express";
import { EditUser, GetUser, LoginUser, RegisterUser, RemoveUser } from "../controller/User.js";

const router = express.Router();

router.get('/', GetUser)
router.post('/login', LoginUser);
router.post('/update', EditUser);
router.post('/register', RegisterUser);
router.delete('/remove/:id', RemoveUser);
export default router;
