import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/recipes/${id}`)
            .then(res => {
                if (!res.ok) throw Error('Could not fetch');
                return res.json();
            })
            .then(data => {
                setRecipe(data);
            })
            .catch(error => console.error('Error fetching data', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`http://localhost:8000/api/v1/recipes/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            if (!response.ok) {
                throw new Error('An error occurred while updating the recipe.');
            }

            navigate(`/recipe/${id}/`);  // Navigate back to the updated recipe details page
        } catch (e) {
            setError("An error occurred. Try again.");
        }
    };

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value,
        });
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className='p-5 bg-green-100'>
            <h1 className='text-center text-3xl font-bold underline'>Edit Recipe</h1>
            {error && <div className='text-red-500 text-center mb-4'>{error}</div>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type="text" name="name"  value={recipe.name} onChange={handleChange} placeholder="Recipe Name" required
                    className='w-full p-2 border border-gray-300'
                />
                <input
                    type="text" name="image" value={recipe.image} onChange={handleChange} placeholder="Image URL" required
                    className='w-full p-2 border border-gray-300'
                />
                <input
                    type="text" name="prep_time" value={recipe.prep_time} onChange={handleChange} placeholder="Preparation Time"  required
                    className='w-full p-2 border border-gray-300'
                />
                <input
                    type="text" name="serving" value={recipe.serving} onChange={handleChange} placeholder="Serving" required
                    className='w-full p-2 border border-gray-300'
                />
                <textarea
                    name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="Ingredients (comma separated)" required
                    className='w-full p-2 border border-gray-300'
                />
                <textarea
                    name="procedure" value={recipe.procedure} onChange={handleChange} placeholder="Procedure" required
                    className='w-full p-2 border border-gray-300'
                />
                <button type="submit" className='bg-green-500 text-white p-2 rounded'>
                    Update Recipe
                </button>
            </form>
        </div>
    );
}

export default EditRecipe;
