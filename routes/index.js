const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get("/", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "index.ejs"));
});


router.get("/create", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "create.ejs"));
});

router.post("/create", urlencodedParser,async (req, res) => {
    console.log(JSON.stringify(req.body));
    // const {email, password } = req.body;
    
    res.render(path.join(__dirname, "..", "views", "login.ejs"),{errors: "TEst"});
});



router.get("/login", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "login.ejs"));
});

router.post("/login", urlencodedParser,async (req, res) => {
    console.log(JSON.stringify(req.body));
    // const {email, password } = req.body;
    
    res.render(path.join(__dirname, "..", "views", "login.ejs"),{errors: "TEst"});
});


module.exports = router;