const router = require("express").Router();
const { addCustomer, getCustomers } = require("../controllers/customerController");

router.post("/", addCustomer);
router.get("/", getCustomers);

module.exports = router;
