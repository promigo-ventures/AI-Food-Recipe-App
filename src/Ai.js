import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

// Make sure you set an environment variable in Scrimba
// for HF_ACCESS_TOKEN
export const hf = new HfInference(process.env.REACT_APP_HF_API_KEY);
export async function getRecipeFromMistral(ingredientsArr) {
  const apiKey = process.env.REACT_APP_HF_API_KEY;
  const url =
    "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Based on the Ingredients you have in hand, which are: ${ingredientsString}.`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
        },
      }),
    });

    const data = await response.json();
    console.log("API Response:", data); // Log response to see the format

    if (!Array.isArray(data) || !data[0] || !data[0].generated_text) {
      throw new Error("Invalid API response format.");
    }

    return data[0].generated_text; // Correctly access the first item in the array
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return "Error fetching recipe. Please try again.";
  }
}
