import React from 'react';
import FoodDisplay from '/src/assets/Images/food display.jpg';

function About() {
    return (
        <>
            <div className='flex items-center justify-center bg-gray-100 min-h-screen p-4'>
                <div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center'>
                    
                    <div className='md:w-1/2 p-4'>
                        <h1 className='text-3xl font-bold mb-4 underline'>ABOUT US</h1>
                        <p className='text-xl font-semibold'>
                            Welcome to our culinary journey! We are passionate about sharing delicious recipes and cooking tips 
                            that inspire home cooks and food enthusiasts alike. Our mission is to make cooking accessible and 
                            enjoyable for everyone. Join us as we explore flavors and create memorable meals together!
                        </p>
                    </div>

                    
                    <div className='md:w-1/2 flex justify-center p-4'>
                        <img 
                            src={FoodDisplay} 
                            alt='About Us' 
                            className='rounded-full shadow-lg max-w-full h-auto' 
                        />
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className='bg-gray-200 p-10'>
                <h2 className='text-3xl font-bold text-center mb-6'>Contact Us</h2>
                <p className='text-lg text-center mb-4'>
                    We would love to hear from you! Whether you have a question, feedback, or just want to say hi, feel free to reach out to us.
                </p>
                <div className='text-center mt-5'>
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 mb-5 rounded'>
                        Write Your Review
                    </button>
                </div>

                {/* Add Reviews Section */}
                <div className='bg-white p-5 rounded-md shadow-md max-w-md mx-auto'>
                    <h3 className='text-2xl font-semibold mb-3'>Add Your Review</h3>
                    <textarea
                        rows="4"
                        className='w-full p-2 border border-gray-300 rounded-md mb-4'
                        placeholder='Write your review here...'
                    ></textarea>
                    <button className='bg-green-500 text-white font-bold py-2 px-4 rounded'>
                        Submit Review
                    </button>
                </div>
                
            </div>
        </>
    );
}

export default About;
