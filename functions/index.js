const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors")({ origin: true });

exports.scoopRecipe = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const url = req.query.url;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title = $("h1").text();

      const ingredients = [];
      $(".ingredient").each((index, element) => {
        ingredients.push($(element).text());
      });

      res.json({ title, ingredients });
    } catch (error) {
      console.error("Error scraping the recipe:", error);
      res.status(500).send("Error scraping the recipe.");
    }
  });
});
