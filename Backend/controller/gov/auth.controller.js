import bcrypt from 'bcryptjs';
import GovernmentEmployee from "../../models/govermentEmployee.js";
import generateTokenAndSetCookie from '../../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    try {
        let { employeeId, name, department, email, phoneNumber, password, confirmPassword, gender } = req.body;

        // Check if all required fields are provided
        if (!employeeId || !name || !department || !email || !phoneNumber || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate gender field
        if (gender !== "male" && gender !== "female") {
            return res.status(400).json({ error: "Invalid gender value. Gender must be 'male' or 'female'" });
        }

        // Check if password matches confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if email is already registered
        let employee = await GovernmentEmployee.findOne({ email });
        if (employee) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Assign profile pic based on gender
        const profilePic = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${name}` : `https://avatar.iran.liara.run/public/girl?username=${name}`;

        // Create new employee
        const newEmployee = new GovernmentEmployee({
            employeeId,
            name,
            department,
            email,
            phoneNumber,
            password: hashedPassword,
            gender,
            profilePic,
            isGovEmp: true
        });

        // Save new employee to database
        await newEmployee.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(newEmployee._id, res);

        return res.status(201).json({
            _id: newEmployee._id,
            employeeName: newEmployee.name,
            profilepic: newEmployee.profilePic,
            isGovEmp: newEmployee.isGovEmp,
            department: newEmployee.department
        });

    } catch (error) {
        console.log("Error in gov --> signup controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        console.log("login encountered")
        let { email, password } = req.body;
        console.log(email, password);
        const employee = await GovernmentEmployee.findOne({ email });
        let isPasswordCorrect = await bcrypt.compare(password, employee.password || "");

        //comparing both the password (provided by employee and acutual present in db)
        if (!employee || !isPasswordCorrect) {
            return res.status(400).json({ error: "invalid email or password" })
        }
        generateTokenAndSetCookie(employee._id, res);

        return res.status(201).json({
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            profilepic: employee.profilePic,
            isGovEmp: employee.isGovEmp,
            department: employee.department
        });

    } catch (error) {
        console.log("Error in gov --> signup controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in login controller : " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}