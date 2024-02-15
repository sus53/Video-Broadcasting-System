import express from "express";
import { EditUser, ForgotPassword, GetUser, LoginUser, RegisterUser, RemoveUser, ResetPassword } from "../controller/User.js";

const router = express.Router();

router.get('/', GetUser)
router.post('/login', LoginUser);
router.post('/update', EditUser);
router.post('/register', RegisterUser);
router.delete('/remove/:id', RemoveUser);
router.post("/resetpassword", ResetPassword);
router.post("/forgotpassword", ForgotPassword);
export default router;
