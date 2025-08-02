import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useRef } from "react";
import PromigoRecipe from "./PromigoRecipe";
import IngredientList from "./IngredientList";
import { getRecipeFromMistral } from "./Ai";

const Main = () => {
  const [newIngredients, setNewIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);
  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null);

  const addIngredient = (formData) => {
    const ingredients = formData.get("ingredient");

    if (ingredients.trim() !== "") {
      setNewIngredients((prevNewIngredients) => [
        ...prevNewIngredients,
        ingredients,
      ]);
    }
  };

  const getRecipe = async () => {
    if (newIngredients === 0) {
      alert("Please add at least one ingredient");
      return;
    }
    setRecipeShown(true);
    setRecipe("Loading recipe.....");

    try {
      const aiRecipe = await getRecipeFromMistral(newIngredients);
      setRecipe(aiRecipe);
    } catch (error) {
      setRecipe("Error fetching recipe. Please try again.");
      console.error("Recipe fetch error", error);
    }
  };
  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button>
          <FontAwesomeIcon icon={faPlus} /> Add ingredient
        </button>
      </form>
      <IngredientList newIngredients={newIngredients} getRecipe={getRecipe} />
      {recipeShown && <PromigoRecipe recipe={recipe} ref={recipeSection} />}
    </main>
  );
};

export default Main;
