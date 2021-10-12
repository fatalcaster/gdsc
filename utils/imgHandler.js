const imgur = require("imgur");
const fs = require("fs");

const uploadImage = async (file) => {
  if (!file) return null;
  try {
    // const url = { link: "https://i.imgur.com/RAilEsi.png" };
    const url = await imgur.uploadFile(`./../uploads/${file.filename}`);
    fs.unlinkSync(`../uploads/${file.filename}`);
    return url.link;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = uploadImage;
