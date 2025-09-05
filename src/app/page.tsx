'use client';

import React from 'react';
import { TodoProvider } from '../context/TodoContext';
import SearchBar from '../components/SearchBar';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import FilterTabs from '../components/FilterTabs';
import SelectionControls from '@/components/SelectionControls';

export default function Home() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ma Todo List
            </h1>
            <p className="text-gray-600">
              Organisez vos tâches efficacement
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <AddTodoForm />
            <SearchBar />
            <FilterTabs />
            <SelectionControls />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}