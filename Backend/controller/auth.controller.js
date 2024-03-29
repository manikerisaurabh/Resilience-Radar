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
        const gitlProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;


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
                fullName: newUser.fullName,
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