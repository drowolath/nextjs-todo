'use client';

import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const SelectionControls: React.FC = () => {
  const { 
    selectedTodos,
    selectAll, 
    clearSelection, 
    deleteSelected, 
    filteredTodos
  } = useTodo();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleSelectAll = (): void => {
    if (selectedTodos.length === filteredTodos.length && filteredTodos.length > 0) {
      clearSelection(); // Si tout est sélectionné, on désélectionne
    } else {
      selectAll(); // Sinon on sélectionne tout
    }
  };

  const handleDeleteSelected = (): void => {
    deleteSelected();
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (): void => {
    setShowDeleteConfirm(false);
  };

  // Si pas de todos, on n'affiche rien
  if (filteredTodos.length === 0) {
    return null;
  }

  const allSelected = selectedTodos.length === filteredTodos.length && filteredTodos.length > 0;
  const hasSelection = selectedTodos.length > 0;

  if (showDeleteConfirm) {
    return (
      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-800 mb-3">
          Êtes-vous sûr de vouloir supprimer {selectedTodos.length} tâche{selectedTodos.length > 1 ? 's' : ''} sélectionnée{selectedTodos.length > 1 ? 's' : ''} ?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteSelected}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm"
          >
            Supprimer
          </button>
          <button
            onClick={handleCancelDelete}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3">
        {/* Checkbox "Tout sélectionner" */}
        <button
          onClick={handleSelectAll}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
            allSelected
              ? 'bg-blue-500 border-blue-500' 
              : hasSelection
                ? 'bg-blue-200 border-blue-500'  // État intermédiaire
                : 'border-gray-300 hover:border-blue-500'
          }`}>
            {allSelected && (
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {hasSelection && !allSelected && (
              <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
            )}
          </div>
          <span>
            {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
          </span>
        </button>

        {/* Compteur de sélection */}
        {hasSelection && (
          <span className="text-sm text-gray-600">
            {selectedTodos.length} / {filteredTodos.length} sélectionnée{selectedTodos.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Actions pour la sélection */}
      {hasSelection && (
        <div className="flex items-center gap-2">
          <button
            onClick={clearSelection}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Supprimer ({selectedTodos.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectionControls;