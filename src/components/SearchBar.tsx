'use client';

import React from 'react';
import { useTodo } from '../context/TodoContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useTodo();

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher parmi les tâches..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;