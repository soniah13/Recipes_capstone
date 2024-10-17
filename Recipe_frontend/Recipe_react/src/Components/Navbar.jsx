import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            {/* Navbar container */}
            <div className='flex justify-between items-center m-0 p-0 border border-solid border-2'>
                {/* Logo on the left */}
                <div className='pl-4'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>

                {/* Burger menu icon for mobile */}
                <div className='md:hidden pr-4 cursor-pointer'>
                    {/* Correct Font Awesome class for bars icon */}
                    <i className='fas fa-bars' onClick={toggleDropdown} style={{ fontSize: '28px' }}></i>
                </div>

                {/* Navigation Links (hidden on small screens) */}
                <nav className='hidden md:flex font-semibold text-2xl py-3 uppercase space-x-4'>
                    <Link to='/' className='hover:border-b border-3 border-black px-3'>Home</Link>
                    <Link to='/gallery' className='hover:border-b border-3 border-black px-3'>Gallery</Link>
                    <Link to='/addRecipe' className='hover:border-b border-3 border-black px-3'>Add your Recipe</Link>
                    <Link to='/about' className='hover:border-b border-3 border-black px-3'>About Us</Link>
                    <Link to='/suprise' className='hover:border-b border-3 border-black px-3'>Suprise Me</Link>
                </nav>
            </div>

            {/* Dropdown menu for mobile (visible when isDropdownOpen is true) */}
            {isDropdownOpen && (
                <div className='md:hidden bg-gray-400 p-4'>
                    <nav className='flex flex-col space-y-2 text-xl font-semibold'>
                        <Link to='/' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Home</Link>
                        <Link to='/gallery' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Gallery</Link>
                        <Link to='/addRecipe' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Add your Recipe</Link>
                        <Link to='/about' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>About Us</Link>
                        <Link to='/suprise' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Suprise Me</Link>
                        <Link to='/login' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Login</Link>
                        <Link to='/register' onClick={toggleDropdown} className='hover:border-b border-3 border-black'>Register</Link>
                    </nav>
                </div>
            )}
        </>
    );
}

export default Navbar;
