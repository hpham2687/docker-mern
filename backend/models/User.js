const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    kssg: {
        type: Number,
        require: true
    },
    diagnose: {
        type: Boolean,
        require: true
    }
});

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    images: {
        type: [imagesSchema],
        require: true
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 30,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    admin: {
        type: Boolean,
        default: false
    },
    patients: {
        type: [patientSchema],
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);