const apiControllers = require("../controllers/apiControllers");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Router are working");
    res.end();
});
router.post("/login", apiControllers.login);
router.post("/registration", apiControllers.registration);
router.post("/addProducts", apiControllers.authentication, apiControllers.products);
router.get("/getProducts", apiControllers.authentication, apiControllers.getProducts);

module.exports = router; 