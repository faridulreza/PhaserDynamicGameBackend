var express = require("express");
const { environment_prompt } = require("./constants");
var router = express.Router();

const OpenAI = require("openai");
const { resizeImage } = require("./util");
const openai = new OpenAI();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/get_environment", async function (req, res, next) {
  let { description } = req.body;

  const final_prompt = environment_prompt.replace("[description]", description);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: final_prompt,
        },
      ],
    });

    const response = completion.choices[0].message.content;

    const [_, bird, pipes, background] = response
      .split("-")
      .map((x) => x.trim());

    res.json({ bird, pipes, background });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

router.post("/get_image_url", async function (req, res, next) {
  const { description, dimension, removeBg } = req.body;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: description,
      n: 1,
      size: "1024x1024",
    });
    image_url = response.data[0].url;

    const resized_image_url = await resizeImage(image_url, dimension, removeBg);

    res.json({ image_url: resized_image_url });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

module.exports = router;
