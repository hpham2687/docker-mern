const User = require("../models/User");

const userController = {
    // add patient
    addPatient: async(req, res) => {
        try {
            const newPatient = {
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                images: []
            };

            const user = await User.findById(req.params.id);

            const newPatients = [...user.patients, newPatient];

            User.findByIdAndUpdate(
                req.params.id,
                {$set: {
                    patients: newPatients
                }},
                {new: true},
                (err, data) => {
                    if(err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json(data.patients);
                    }
                }
            )
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // get patients
    getPatients: async(req, res) => {
        try {
            const user = await User.findById(req.params.id);

            return res.status(200).json(user.patients);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // get patient
    getPatient: async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const patients = user.patients;
            var patient;
            for(var i = 0; i < patients.length; i++) {
                if(patients[i]._id == req.params.pid) {
                    patient = patients[i];
                    break;
                }
            }

            return res.status(200).json(patient);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // get image
    getImage: async(req, res) => {
        try {
            const newImage = {
                name: req.body.name,
                url: req.body.url,
                time: req.body.time,
                kssg: req.body.kssg,
                diagnose: req.body.diagnose
            };

            const user = await User.findById(req.params.id);
            const patients = user.patients;
            var patient;
            for(var i = 0; i < patients.length; i++) {
                if(patients[i]._id == req.params.pid) {
                    patients[i].images = [...patients[i].images, newImage];
                    patient = patients[i];
                }
            }

            User.findByIdAndUpdate(
                req.params.id,
                {$set: {
                    patients: patients
                }},
                {new: true},
                (err, data) => {
                    if(err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json(patient.images);
                    }
                }
            )
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = userController;