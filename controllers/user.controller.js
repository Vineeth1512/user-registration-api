const User = require("../models/user.model");
const bcrypt = require("bcrypt")
module.exports.signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        //Checking if all fields are present

        if (!email || !password || !name) {
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
            name: name,

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
    const { email, password } = req.body;
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
module.exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            users: users
        })

    } catch (err) {
        console.log(err);
    }

}


module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({
                message: "User not found..!"
            });
        }
        return res.status(200).json({
            message: "User deleted successfully..!"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

