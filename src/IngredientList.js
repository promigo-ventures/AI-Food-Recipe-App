import React from "react";
import Main from "./Main";

const IngredientList = (props) => {
  const ingredientListItems = props.newIngredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  return (
    <div>
      {props.newIngredients.length > 0 && (
        <section>
          <h1>Ingredients on hand:</h1>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientListItems}
          </ul>
          {props.newIngredients.length > 3 && (
            <div className="get-recipe-container" ref={props.ref}>
              <div className="generate-container">
                <h1>Ready for a recipe?</h1>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={props.getRecipe}>Get a recipe</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default IngredientList;
