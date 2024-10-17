import React from 'react';


function RecipeCard({ recipe, handleDelete, onImageClick }) {
    return (
        <>
            <div className='bg-gray-200 rounded-md shadow-lg'>
                <h2 className='font-bold text-xl text-center py-2'>{recipe.name}</h2>
                <img src='https://res.cloudinary.com/ddqkfdqy8/image/upload/v1729161327/kdx5eina3m3vs4s7vkd0.png' alt={recipe.name} onClick={() => onImageClick(recipe.id)} className='cursor-pointer w-full h-96 object-cover rounded-lg m-2' />

                <button onClick={() => handleDelete(recipe.id)} className='bg-red-300 text-white items-center rounded-md p-3'>Delete</button>
            </div>
        </>
    );
}

export default RecipeCard;
