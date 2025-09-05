'use client';

import React from 'react';
import { Todo } from '../types/todo';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
    todo: Todo;
}


const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {

    const { toggleTodo } = useTodo();

    const handleToggle = (): void => {
        toggleTodo(todo.id);
    };

    return (
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow">
            <div className="flex items-center flex-1 min-w-0">
                <button
                    className="flex-shrink-0 mr-3"
                    aria-label={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
                >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-500'
                        }`}>
                        {todo.completed && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                </button>

                <span className={`text-sm ${todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                    } truncate`}>
                    {todo.text}
                </span>
            </div>

            <div className="text-xs text-gray-400 ml-4 flex-shrink-0">
                {todo.createdAt.toLocaleDateString('fr-FR')}
            </div>
        </div>
    )
}


export default TodoItem;