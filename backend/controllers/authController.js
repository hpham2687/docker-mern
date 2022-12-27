const bcrypt = require("bcrypt");
const User = require("../models/User");

const authController = {
    // register
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                email: req.body.email,
                password: hashed,
                patient: [],
            });

            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // login
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if(!user) {
                return res.status(404).json(["Sai email", ""]);
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if(!validPassword) {
                return res.status(404).json(["", "Sai mật khẩu"]);
            }

            if(user && validPassword) {
                return res.status(200).json(user);
            }
        } catch (err) {
            return res.status(200).json(err);
        }
    }
};

module.exports = authController;