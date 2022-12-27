const userController = require("../controllers/userController");


const router = require("express").Router();

// add patient
router.put("/addpatient/:id", userController.addPatient);


// get patients
router.get("/getpatients/:id", userController.getPatients);

// get patient
router.get("/getpatient/:id/:pid", userController.getPatient);

// get image
router.patch("/getimage/:id/:pid", userController.getImage);

module.exports = router;