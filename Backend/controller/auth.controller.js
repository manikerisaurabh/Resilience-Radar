import bcrypt from 'bcryptjs';
import axios from 'axios';
import User from '../models/user.js';
import { getLocationData } from '../utils/getLocation.js';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'
export const signup = async (req, res) => {
    try {
        let { userName, latitude, longitude, email, password, confirmPassword, gender } = req.body;

        //verifing password
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not matches" });
        }


        let user = await User.findOne({ userName });

        //checking whether the username already exists or not
        if (user) {
            return res.status(400).json({ error: "username already exists" });
        }


        //getting the actual address of user using latitude and longitude
        let address = await getLocationData(latitude, longitude);

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //assigning avatar according their gender
        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const gitlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;


        const newUser = new User({
            userName: userName,
            address: {
                village: address.village,
                county: address.county,
                district: address.state_district,
                state: address.state,
                country: address.country
            },
            email: email,
            password: hashedPassword,
            gender: gender,
            profilepic: gender == "male" ? boyProfilepic : gitlProfilepic
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                profilepic: newUser.profilepic
            });
        } else {
            res.status(400).json({ error: "Invalid user Data" });
        }
    } catch (error) {
        console.log("Error in signup controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        let { userName, password } = req.body;
        let user = await User.findOne({ userName });
        let isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res);
        return res.status(201).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            profilepic: user.profilepic,
            address: user.address
        });

    } catch (error) {
        console.log("Error in login controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in login controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};