const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");
const regionController = require("../controllers/regionController");
const stateController = require("../controllers/stateController");

router.post("/countries", countryController.createCountry); 
router.get("/countries", countryController.getAllCountries);
router.get("/countries/:id", countryController.getCountryById);
router.put("/countries/:id", countryController.updateCountry); 
router.delete("/countries/:id", countryController.deleteCountry); 

router.post("/regions", regionController.createRegion); 
router.get("/regions", regionController.getRegions);
router.get("/regions/:id", regionController.getRegion); 
router.put("/regions/:id", regionController.updateRegion); 
router.delete("/regions/:id", regionController.deleteRegion); 

router.post("/states", stateController.createState); 
router.get("/states", stateController.getStates);
router.get("/states/:id", stateController.getState); 
router.put("/states/:id", stateController.updateState); 
router.delete("/states/:id", stateController.deleteState);

module.exports = router;
