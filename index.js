if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const multer = require("multer");

const mongoose = require('mongoose');


const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
  });

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



mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// Server
app.listen(process.env.PORT || 3000);
