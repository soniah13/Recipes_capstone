import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

function AddRecipe({ recipes, setRecipes }) {
    const [error, setError] = useState("");
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        ingredients: "",
        procedure: ""
    });

    const navigate = useNavigate();

    const addRecipe = async (e) => {
        e.preventDefault();
        const { name, ingredients, procedure } = newRecipe;
        const formValid = name && ingredients && procedure;
        if (!formValid) {
            setError("All fields are required");
            return;
        }

        const recipeToAdd = {
            id: uuidv4(),
            ...newRecipe
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/recipes", recipeToAdd);
            if (response.status === 201) {
                setRecipes([...recipes, recipeToAdd]);
                setNewRecipe({ name: "", ingredients: "", procedure: "" });
                setError("");
                alert("New Recipe successfully added");
                navigate('/gallery');
            } else {
                setError("Failed to add new recipe");
            }
        } catch (e) {
            setError("Error occurred while adding");
            console.error(e);
        }
    };

    return (
        <>
            <div className="flex center justify-center">
                <img src='/src/assets/images/logo.png' className='mx-5 my-5' alt="Logo" />
                <h1 className='my-20 text-center font-bold text-5xl'> Welcome to Alice's Kitchen </h1>
            </div>
            <form onSubmit={addRecipe} className='h-screen w-full pt-36 flex justify-center align-center'>
                <div className='m-10 px-5 text-2xl font-semibold border-2 border-solid bg-yellow-600 h-3/6'>
                    {error && <div className='text-red font-bold text-xl'>{error}</div>}
                    <div className='flex m-5 p-2'>
                        <label className='text-lg font-semibold p-3'>Name</label>
                        <input className='bg-transparent rounded-md border border-2 w-full p-3' value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} required />
                    </div>
                    <div className='flex m-5 p-2'>
                        <label className='text-lg font-semibold p-3'>Ingredients</label>
                        <input className='bg-transparent rounded-md border border-2 w-full p-3' value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} required />
                    </div>
                    <div className='flex m-5 p-2'>
                        <label className='text-lg font-semibold p-3'>Procedure</label>
                        <input className='bg-transparent rounded-md border border-2 w-full p-3' value={newRecipe.procedure} onChange={(e) => setNewRecipe({ ...newRecipe, procedure: e.target.value })} required />
                    </div>
                    <button className='font-bold text-2xl text-center bg-gray-200 text-black border border-2 rounded-3xl mr-10 p-2 w-full hover:bg-gray-500 active:scale-[.98] 
                        active:duration-75 hover:scale-[1.02] ease-in-out transition-all' type='submit'>Add New Recipe</button>
                </div>
            </form>
        </>
    );
}

export default AddRecipe;
