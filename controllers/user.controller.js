const User =require("../models/user.model");
const bcrypt = require("bcrypt")
module.exports.signup = async (req, res) => {
    try {
        const { email, name, mobileNo, password } = req.body;
        //Checking if all fields are present

        if (!email || !password || !name || !mobileNo) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            })
        }
        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
       // console.log(hashedPassword);
        const currentUser = await User.create({
            email: email,
            password: hashedPassword,
            name:name,
            mobileNo: mobileNo
        })
        //Sending response
        return res.status(200).json({
            message: "User created successfully..!",
            user: currentUser
        });

    } catch (err) {
        //Handling error
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

};

module.exports.login = async (req, res) => {
    const {email,password}=req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist."

            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                message: "Invalid Credentials",

            })
        }
        return res.status(200).json({
            message: "User logged in successfully..",
            user: user
        })

    } catch (err) {
        //Handling error
        return res.status(500).json({
            message: "Internal Server Error..!"
        })
    }
}