'use client';

import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const ClearAllButton: React.FC = () => {
  const { todos, clearAllTodos } = useTodo();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleClearAll = (): void => {
    clearAllTodos();
    setShowConfirm(false);
  };

  const handleCancel = (): void => {
    setShowConfirm(false);
  };

  if (todos.length === 0) {
    return null;
  }

  if (showConfirm) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800 mb-3">
          Êtes-vous sûr de vouloir supprimer toutes les tâches ? Cette action est irréversible.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm"
          >
            Supprimer tout
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors border border-red-200"
      >
        Tout supprimer ({todos.length} tâche{todos.length > 1 ? 's' : ''})
      </button>
    </div>
  );
};

export default ClearAllButton;