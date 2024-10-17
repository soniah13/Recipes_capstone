import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ searchText }); 
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className='flex justify-start items-start px-4'>
      <form onSubmit={handleSubmit} className='flex space-x-4 w-full'>
        <div className='relative w-full'>
          <input
            type='text'
            onChange={handleInputChange}
            value={searchText}
            placeholder='What do you crave?'
            className='border-2 text-black text-xl py-3 px-10 w-full font-bold'
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </form>
    </div>
  );
}

export default Search;
