import User from "../Models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ============== USER CONTROLLER ==============

// Register User
export async function Register(req, res) {
    const { name, email, password } = req.body;
    try {
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).send("User already exists");
        }
        
        const userOption = new User({
            name: name,
            email: email,
            password: password, // Plain text
            userType: email === "admin@gmail.com" ? "admin" : "faculity"
        });
        await userOption.save();
        res.status(201).send(userOption);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

// Login User
export async function Login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = password === user.password;
        
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user._id,
                email: user.email,
                role: user.userType,
                name: user.name
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '24h' });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.userType
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}


/// get all user
export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        if (users.length == 0) {
            return res.status(404).send("No users found");
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching users");
    }
}

// Get User by ID
export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        // const user = await User.findById(id);
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send("User not found");
        }   
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching user");
    }
}


/// Update User
export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // No hashing, use plain text
        const user = await User.findByIdAndUpdate({ _id: id }, updateData, { returnDocument: "after" });
        if (!user) {
            return res.status(404).send("something went wrong");
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user");
    }
}

// Delete user

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete({ _id: id},req.body,{returnDocument:"after"});
        if (!user) {
            return res.status(404).send("user delete successfully");
        }   
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error delete user");
    }
}







