import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleCheckAllFoods = () => {
        navigate('/gallery');
    }
    return (
        <div className='flex items-center justify-center pt-10 bg-gray-100 min-h-screen'>
            <div className='max-w-5xl mx-auto p-4'>
                <div className='flex flex-col justify-center items-center h-screen'>
                    {/* Welcome Message */}
                    <h1 className='text-4xl font-bold mb-4 text-center'>Tasty recipes from the <br /> perfect kitchen</h1>
                    <p className='text-lg mb-8 text-center'>Discover delicious recipes and share your culinary creations with others!</p>
                    <button onClick={handleCheckAllFoods} className='mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition ease-in-out duration-300 mb-10'> Check All Foods </button>

                    {/* Food Examples */}
                    <div className='grid grid-cols-2 gap-4 mb-8 w-full'>
                        <div className='flex flex-col items-center'>
                            <img 
                                src='/src/assets/Images/plate 1.jpg' 
                                alt='Pasta with meatballs' 
                                className='w-full object-cover rounded mb-2' 
                            />
                            <p className='mt-2 font-bold'>Pasta with meatballs</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <img 
                                src='/src/assets/Images/plate 2.jpg' 
                                alt='Grilled Chicken Salad' 
                                className='w-full object-cover rounded mb-2' 
                            />
                            <p className='mt-2 font-bold'>Grilled Chicken Salad</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <img 
                                src='/src/assets/Images/plate 3.jpg' 
                                alt='Pork fried and Vegetables' 
                                className='w-full object-cover rounded mb-2' 
                            />
                            <p className='mt-2 font-bold'>Pork fried and Vegetables</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <img 
                                src='/src/assets/Images/plate 4.jpg' 
                                alt='Peach Blueberry, arugula salad' 
                                className='w-full object-cover rounded mb-2' 
                            />
                            <p className='mt-2 font-bold'>Peach Blueberry, arugula salad</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
