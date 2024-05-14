const sharp = require("sharp");
const fetch = require("node-fetch");
const { v4: uuid } = require("uuid");
// const { removeBackground } = require("@imgly/background-removal-node");

const resizeImage = async (url, dimension, removeBg) => {
  let buffer;
  // if (removeBg) {
  //   const blob = await removeBackground(image_url);
  //   buffer = Buffer.from(await blob.arrayBuffer());
  // }
  // else{
    console.log("Downloading image: ", url)
    const res = await fetch(url);
    buffer = Buffer.from(await res.arrayBuffer())
  // }


  const sharpImage = sharp(buffer);

  const resized = await sharpImage
    .resize({
      width: dimension[0], // [1]
      height: dimension[1], // [2]
      fit: "fill",
    })
    .jpeg()
    .toBuffer();

  console.log("Resized image: ")

  //save the image to the file system
  const filename = uuid() + ".jpg";

  await sharp(resized).toFile(`public/images/${filename}`);

  return "http://localhost:3000/images/" + filename;
};

module.exports = { resizeImage };
