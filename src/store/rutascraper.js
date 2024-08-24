import axios from "axios";
import * as cheerio from "cheerio"; // Import everything from cheerio as a namespace

async function scoopRecipe(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data); // Use cheerio.load correctly

    const title = $("h1").text();

    const ingredients = [];
    $(".ingredient").each((index, element) => {
      ingredients.push($(element).text());
    });

    return { title, ingredients };
  } catch (error) {
    console.error("Error scraping the recipe:", error);
    return null;
  }
}

async function fetchRecipe(url) {
  try {
    const response = await fetch(
      `https://us-central1-rutabaga-d932a.cloudfunctions.net/scoopRecipe?url=${encodeURIComponent(url)}`
    );
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

export default fetchRecipe;
