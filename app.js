const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routes/index");

const User = require("./models/user");

const initializePassport = require("./utils/passport-config");
initializePassport(
  passport,
  async (email) => await User.findOne({ email: email }),
  async (id) => await User.findById(id)
);

// Express use
app.use(expressLayouts);
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
// Express set
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(express.static("public"));

// Routes
app.use("/", indexRouter);

// 404
app.get("*", function (req, res) {
  res.status(404).render(__dirname + "/views/404.ejs", {
    errCode: 404,
    errMessage: "Page not found",
  });
});

module.exports = app;
