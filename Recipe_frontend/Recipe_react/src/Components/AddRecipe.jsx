import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

function AddRecipe({ recipes, setRecipes }) {
    const [error, setError] = useState("");
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        prep_time: "",
        serving: "",
        ingredients: "",
        procedure: "",
        secret: "",
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setNewRecipe({ ...newRecipe, image: file });
        setImagePreview(URL.createObjectURL(file)); // Preview image before upload
    };

    const addRecipe = async (e) => {
        e.preventDefault();
        const { name, ingredients, procedure, prep_time, serving, secret, image } = newRecipe;

        if (!name || !ingredients || !procedure || !prep_time || !serving || !secret || !image) {
            setError("All fields are required");
            return;
        }

        try {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'recipe'); // Replace with your Cloudinary upload preset

            const cloudinaryResponse = await fetch(
                'https://api.cloudinary.com/v1_1/ddqkfdqy8/image/upload', // Replace with your Cloudinary URL
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!cloudinaryResponse.ok) {
                throw new Error("Cloudinary upload failed");
            }

            const cloudinaryData = await cloudinaryResponse.json();
            const imageUrl = cloudinaryData.secure_url; // Get the image URL from Cloudinary

            const recipeToAdd = {
                id: uuidv4(),
                name,
                prep_time,
                serving,
                ingredients,
                procedure,
                secret,
                image: imageUrl // Store the image URL in the new recipe
            };

            // Send recipe data including the image URL to your API
            const response = await fetch("http://127.0.0.1:8000/api/v1/recipes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeToAdd)
            });

            if (response.ok) {
                const addedRecipe = await response.json();
                setRecipes([...recipes, addedRecipe]); // Assuming your API returns the created recipe
                setNewRecipe({
                    name: "",
                    prep_time: "",
                    serving: "",
                    ingredients: "",
                    procedure: "",
                    secret: "",
                    image: null
                });
                setImagePreview(null);
                setError("");
                alert("New Recipe successfully added");
                navigate('/gallery');
            } else {
                setError("Failed to add new recipe");
            }
        } catch (e) {
            setError("Error occurred while adding: " + e.message);
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
    <div className='m-10 p-10 text-2xl font-semibold border-2 border-solid bg-gray-600 h-full w-1/2 rounded-lg shadow-lg'>
        {error && <div className='text-red-400 font-bold text-xl mb-4'>{error}</div>}
        <h1 className='text-center font-semibold text-white underline mb-6'>ADD YOUR OWN SPECIAL RECIPE</h1>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Name</label>
            <input className='bg-transparent rounded-md border border-2 w-2/3 p-3' value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} required />
        </div>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Preparation Time</label>
            <input className='bg-transparent rounded-md border border-2 w-2/3 p-3' value={newRecipe.prep_time} onChange={(e) => setNewRecipe({ ...newRecipe, prep_time: e.target.value })} required />
        </div>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Serving</label>
            <input className='bg-transparent rounded-md border border-2 w-2/3 p-3' value={newRecipe.serving} onChange={(e) => setNewRecipe({ ...newRecipe, serving: e.target.value })} required />
        </div>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Ingredients</label>
            <input className='bg-transparent rounded-md border border-2 w-2/3 p-2' value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} required />
        </div>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Procedure</label>
            <input className='bg-transparent rounded-md border border-2 w-2/3 p-2' value={newRecipe.procedure} onChange={(e) => setNewRecipe({ ...newRecipe, procedure: e.target.value })} required />
        </div>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Secret Ingredient</label>
            <input className='bg-transparent rounded-md border border-2 w-2/3 p-2' value={newRecipe.secret} onChange={(e) => setNewRecipe({ ...newRecipe, secret: e.target.value })} required />
        </div>

        <div className='flex m-4 p-2'>
            <label className='text-lg font-semibold p-2 w-1/3'>Recipe Image</label>
            <input type='file' className='bg-transparent rounded-md border border-2 w-2/3 p-2' onChange={handleImageUpload} required />
        </div>
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 mx-auto mb-4" />}

        <button className='font-bold text-2xl text-center bg-gray-200 text-black border border-2 rounded-3xl p-3 w-full hover:bg-gray-500 active:scale-[.98] 
            active:duration-75 hover:scale-[1.02] ease-in-out transition-all' type='submit'>Add New Recipe</button>
    </div>
</form>

        </>
    );
}

export default AddRecipe;
