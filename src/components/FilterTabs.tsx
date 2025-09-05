'use client';

import React from 'react';
import { useTodo } from '../context/TodoContext';
import { FilterStatus } from '../types/todo';

const FilterTabs: React.FC = () => {
  const { filterStatus, setFilterStatus, todos } = useTodo();

  const handleFilterChange = (status: FilterStatus): void => {
    setFilterStatus(status);
  };

 
  const allCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  const tabs = [
    {
      key: 'tout' as FilterStatus,
      label: 'Toutes',
      count: allCount,
      icon: '📋',
      color: 'blue'
    },
    {
      key: 'en cours' as FilterStatus,
      label: 'En cours',
      count: pendingCount,
      icon: '⏳',
      color: 'orange'
    },
    {
      key: 'fait' as FilterStatus,
      label: 'Terminées',
      count: completedCount,
      icon: '✅',
      color: 'green'
    }
  ];

  return (
    <div className="mb-4">
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const isActive = filterStatus === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => handleFilterChange(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? `bg-white shadow-sm text-${tab.color}-700 ring-1 ring-${tab.color}-200`
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-label={`Afficher les tâches : ${tab.label.toLowerCase()}`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                  isActive
                    ? `bg-${tab.color}-100 text-${tab.color}-700`
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-2 text-sm text-gray-600 text-center">
        {filterStatus === 'tout' && `Affichage de toutes les tâches (${allCount})`}
        {filterStatus === 'en cours' && `Affichage des tâches en cours (${pendingCount})`}
        {filterStatus === 'fait' && `Affichage des tâches terminées (${completedCount})`}
        {allCount === 0 && ' - Aucune tâche pour le moment'}
      </div>
    </div>
  );
};

export default FilterTabs;