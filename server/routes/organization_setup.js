const express = require("express");
const router = express.Router();
const organization_setup = require("../controllers/organizationSetup")
const isAuthenticated = require("../middleware/auth");
const { upload } = require("../lib/upload");

// router.post("/add_organization_setup/:user_id",parser,requireSignin,organization_setup.Create);

router.get("/organization_setup_info/:userId", organization_setup.read);
router.put("/update_organization_setup/:userId",isAuthenticated,upload.single('logo'),organization_setup.update);

// router.get("/orgInfo/:user_id/:orgIid",requireSignin,organization_setup.orgInfo)
// router.delete("/delete_organization_setup/:user_id/:orgIid",requireSignin,organization_setup.remove);

module.exports = router;
