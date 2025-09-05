'use client';

import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { filteredTodos, searchTerm } = useTodo();

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {searchTerm ? (
          <>
            <p className="mb-2">Aucune tâche trouvée pour "{searchTerm}"</p>
            <p className="text-sm">Essayez avec d'autres mots-clés</p>
          </>
        ) : (
          <>
            <p className="mb-2">Aucune tâche pour le moment</p>
            <p className="text-sm">Commencez par ajouter votre première tâche !</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;