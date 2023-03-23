const expires = require("express");
const admins = require("../controllers/admins.controller");

const router = expires.Router();

router.route("/register")
    .post(admins.create);

module.exports = router;