import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import RecipeList from "./RecipeList";

function Gallery({ recipes, setRecipes }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/recipes/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error Fetching data", error);
            }
        };

        fetchRecipes();
    }, [setRecipes]);

    function handleClick(id) {
        navigate(`/recipe/${id}`);
    }

    function handleSearch(query) {
        setSearchQuery(query);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error("Error deleting recipe: ", error);
        }
    };

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearchQuery = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearchQuery;
    });

    const addRecipeClick = () => {
        navigate('/addrecipe');
    };

    return (
        <>
            <div className="">
                <h2 className='font-semibold text-2xl underline text-center p-5 text-yellow-700'>What do you want to Cook?</h2>
                <div className="flex justify-center">
                    <Search onSearch={handleSearch} /> 
                    <button className='font-bold text-2xl text-center text-black mx-10 p-2 my-2 hover:bg-gray-300 active:scale-[.98] 
                        active:duration-75 hover:scale-[1.02] ease-in-out transition-all'
                        type='button' onClick={addRecipeClick}>Add New Recipe</button>
                </div>
                <RecipeList recipes={filteredRecipes} handleDelete={handleDelete} onImageClick={handleClick} />
            </div>
        </>
    );
}

export default Gallery;
