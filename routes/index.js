const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get("/", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "index.ejs"));
});

router.get("/login", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "login.ejs"));
});

router.post("/login", urlencodedParser,async (req, res) => {
    const {email, password } = req.body;
    const errors = ["TEst"];
    res.status(404).render("login", {errors: errors});
    res.redirect("/");
});

router.get("/create", async (req, res) => {

    res.render(path.join(__dirname, "..", "views", "create.ejs"));
});

module.exports = router;