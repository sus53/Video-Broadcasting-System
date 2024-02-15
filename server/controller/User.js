import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';
import nodemailer from 'nodemailer';

export const GetUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const RegisterUser = async (req, res) => {

    let user = req.body;
    let logWithToken = false;
    try {
        if (user.ctoken) {
            user = jwtDecode(user.ctoken);
            logWithToken = true;
        }

        let userdb = await User.findOne({ email: user.email });

        if (userdb)
            return res.status(200).json({ message: "User already registered" });

        const salt = await bcrypt.genSalt(5);
        let newUser = "";

        if (logWithToken) {
            const hashedPassword = await bcrypt.hash(user.sub, salt);
            newUser = new User({
                username: user.name,
                password: hashedPassword,
                email: user.email,
                phone: "-----------",
                isAdmin: "No"
            });
        } else {
            const hashedPassword = await bcrypt.hash(user.password, salt);
            newUser = new User({
                username: user.username,
                password: hashedPassword,
                email: user.email,
                phone: user.phone,
                isAdmin: "No"
            });
        }


        await newUser.save();
        delete newUser.password;

        res.status(201).json({ message: "User Registered sucessfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const EditUser = async (req, res) => {
    const user = req.body;

    try {
        await User.findOneAndUpdate({ _id: user._id }, { username: user.username, email: user.email, phone: user.phone, password: user.password, isAdmin: user.isAdmin });
        res.status(200).json(true);
    } catch (error) {
        res.status(401).json(error);
    }
}

export const LoginUser = async (req, res) => {
    let user = req.body;
    let logWithToken = false;
    try {
        if (user.ctoken) {
            user = jwtDecode(user.ctoken);
            logWithToken = true;
        }

        let userDB = await User.findOne({ email: user.email });

        if (!userDB)
            return res.status(404).json({ message: "account not found" });

        if (!logWithToken) {
            const validPassword = await bcrypt.compare(
                user.password,
                userDB.password
            );
            delete userDB.password;
            if (!validPassword) return res.status(404).json({ message: "Invalid credentials" });
        }



        res.status(201).json(userDB);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const RemoveUser = async (req, res) => {
    const _id = req.params.id;
    try {
        await User.findOneAndRemove({ _id })
        res.status(201).json(true);
    } catch (error) {
        res.status(401).json(false);
    }
}

export const ForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.mailer_gmail,
                pass: process.env.app_code,
            },
        });

        let mailOptions = {
            from: {
                name: "Fun Olympics",
                address: "Fun Olympics@gmail.com",
            },
            to: email,
            subject: "Reset Password",
            text: `Click this link to reset your password : http://localhost:5173/resetpassword/${user._id}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(200).json(user);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const ResetPassword = async (req, res) => {
    try {
        const { _id, password } = req.body;
        if (!(await User.findOne({ _id }))) {
            return res.status(400).json({ message: "User is missing" });
        }
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedPassword = await User.findByIdAndUpdate(
            { _id },
            { password: hashedPassword }
        );

        delete updatedPassword.password;
        res.status(200).json({
            message: "User password updated sucessfully",
            user: updatedPassword,
        });
    } catch (error) {
        console.error("error updating user", error);
        res
            .status(500)
            .json({ message: "Error updating user", error: error.message });
    }
};

