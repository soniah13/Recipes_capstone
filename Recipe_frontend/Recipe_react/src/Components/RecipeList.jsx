import React from 'react'
import RecipeCard from './RecipeCard'

function RecipeList({recipes, handleDelete, onImageClick}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-4 gap-6 grid-rows-5 bg-silver-200" >
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} handleDelete={handleDelete}  onImageClick={onImageClick} /> 
            ))}
      </div>
    </>
  );
}

export default RecipeList