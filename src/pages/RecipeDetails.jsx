import { useContext } from "react";
import RecipeDetailsContext from "../context/RecipeDetailsContext";

function RecipeDetails() {
  const { recipeDetails } = useContext(RecipeDetailsContext)
  console.log(recipeDetails);
  return (
    <>Hello</>
  );
}

export default RecipeDetails;
