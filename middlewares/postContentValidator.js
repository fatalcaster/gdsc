const bodyParser = require("body-parser");

module.exports = function (req, res) {
  const { title, body } = req.body;
  const errors = [];
  console.log(JSON.stringify(req.data));
  console.log(`TIPOVI ${typeof title} ${typeof body}`);
  if (typeof title !== "string" || title.length < 5)
    errors.push({ field: "title", value: title, msg: "Title is too short" });
  if (typeof body !== "string" || body.length < 10)
    errors.push({ field: "body", value: body, msg: "Body is too short" });
  if (errors.length !== 0) {
    console.log(JSON.stringify(errors));
    res.status(400).render("create", { errors });
    return;
  }
};
