import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/recipes/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the recipe');
                }
                return res.json();
            })
            .then(data => {
                // Clean the image URL if it still has the prefix
                if (data.image) {
                    data.image = data.image.replace('image/upload/', ''); // Clean the image URL
                }
                setRecipe(data);
                console.log(data.image);  // Log the cleaned image URL
            })
            .catch((error) => console.error('Error fetching data', error));
    }, [id]);

    // Check if recipe or image is available
    if (!recipe || !recipe.image) return <p>Loading...</p>;

    return (
        <div className='p-5 bg-gray-100 w-full h-full'>
            <h1 className='text-center text-3xl font-bold underline'>{recipe.name}</h1>
            <div className='grid grid-cols-2 grid-rows-1'>
                <div className='flex justify-center align-center'>
                    <img src={recipe.image} alt={recipe.name} className='w-5/6 h-5/6 center object-cover my-10' />
                </div>
                <div className='p-10'>
                    <h3 className='text-left text-xl font-bold mb-2'>Serving</h3>
                    <p className='text-x font-semibold'>For {recipe.serving} People</p>
                    <h3 className='text-left text-xl font-bold mb-2'>Preparation time</h3>
                    <p className='text-x font-semibold'>{recipe.prep_time}</p>
                    <h3 className='text-left text-xl font-bold mb-2'>Ingredients</h3>
                    <ul className='list-disc ml-5 mb-4'>
                        {recipe.ingredients && recipe.ingredients.split(',').map((ingredient, index) => (
                            <li key={index} className='text-x font-semibold'>{ingredient}</li>
                        ))}
                    </ul>
                    <h3 className='text-left text-xl font-bold mb-2'>Procedure</h3>
                    <p className='text-x font-semibold'>{recipe.procedure}</p>
                    <h3 className='text-left text-xl font-bold mb-2'>Secret to tasty</h3>
                    <p className='text-x font-semibold'>{recipe.secret}</p>
                    <button 
                        className='mt-4 p-2 bg-blue-500 text-white rounded'
                        onClick={() => navigate(`/recipe/${id}/edit`)}
                    >
                        Edit Recipe
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;
