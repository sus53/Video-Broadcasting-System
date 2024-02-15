import User from "../models/User.js";
import bcrypt from 'bcrypt';
import Watch from '../models/Watch.js'

export const GetUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const RegisterUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = new User({
            username: user.username,
            password: user.password,
            email: user.email,
            phone: user.phone,
            isAdmin: "No"
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(401).json(error);
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
    const user = req.body;
    try {
        const userDB = await User.findOne({ email: user.email, password: user.password })
        if (!userDB) return res.status(404).json(false);
        res.status(201).json(userDB);
    } catch (error) {
        res.status(401).json(false);
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