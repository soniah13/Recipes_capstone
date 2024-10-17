import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SupriseMe() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRandomRecipe = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/recipes/');
                setRecipe(response.data.recipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRandomRecipe();
    }, []);

    return (
        <div className='m-0 p-0 border border-solid border-2  w-full h-screen'>
            <div className='flex center justify-center'>
            <h1 className='my-20 text-center font-bold text-5xl'> Welcome to Alice's Kitchen </h1>   
            </div>
        {loading ? (
            <p className='text-center font-bold text-2xl my-5 py-10'>Loading...</p>
        ) : recipe ? (
            <div>
                <h1 className='text-center text-3xl font-bold underline'>{recipe.Name}</h1>
                <div className='grid grid-cols-2 grid-rows-1'>
                    <div className='flex justify-center align-center'>
                        <img src={recipe.image} alt={recipe.Name} className='w-5/6 h-5/6 center object-cover my-10' />
                    </div>
                    <div className='p-10'>
                        <p className='text-xl text-left p-2'><strong>Category:</strong> {recipe.category}</p>
                        <p className='text-xl text-left p-2'><strong>Preparation Time:</strong> {recipe.prep}</p>
                        <p className='text-xl text-left p-2'><strong>Serving:</strong> {recipe.serving}</p>
                        <h2 className='text-xl text-left font-bold mb-2 p-2'>Ingredients</h2>
                        <ul className='list-disc ml-5 mb-4 p-2'>
                            {recipe.Ingredients && recipe.Ingredients.split(',').map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h3 className='text-xl text-left font-bold mb-2 p-2'>Procedure</h3>
                        <p>{recipe.Procedure}</p>
                    </div>
                </div>
            </div>
        ) : (
            <p className='text-center font-bold text-2xl my-5 py-10'>Search and we will generate your surprise meal next!</p>
        )}
    </div>
    );
}

export default SupriseMe;
