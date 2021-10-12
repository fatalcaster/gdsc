if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./app");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected!");
    app.listen(process.env.PORT || 3000);
    console.log("Listening on port 3000");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  // Server
}
main();
