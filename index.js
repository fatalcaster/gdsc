if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index");

// Express use
app.use(expressLayouts);
app.use(methodOverride("_method"));

app.use(cookieParser());

// Express set
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(express.static('public'));

// Routes
app.use("/", indexRouter);

// 404
app.get('*', function(req, res){
    res.status(404).render( __dirname + "/views/404.ejs", { errCode: 404, errMessage: "Page not found" });
});

// Server
app.listen(process.env.PORT || 3000);
