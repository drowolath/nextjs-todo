'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, TodoContextType } from '../types/todo';


const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');


    // Charger les todos depuis localStorage au démarrage
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            try {
                const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
                ...todo,
                createdAt: new Date(todo.createdAt)
                }));
                setTodos(parsedTodos);
            } catch (error) {
                console.error('Erreur lors du chargement des todos:', error);
            }
        }
    }, []);

    // Sauvegarder les todos dans localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Ajouter une todo à la liste
    const addTodo = (text: string): void => {
        if (text.trim() === '') return;
        
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: text.trim(),
            completed: false,
            createdAt: new Date()
        };
        
        setTodos(prevTodos => [newTodo, ...prevTodos]);
    };

    // Changer le status d'une todo
    const toggleTodo = (id: string): void => {
        setTodos(prevTodos =>
        prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        );
    };

    // Effacer toutes les todos
    const clearAllTodos = (): void => {
        setTodos([]);
    };

    // Filtrer les todos simplement
    const filteredTodos = todos.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const value : TodoContextType = {
        todos,
        addTodo,
        toggleTodo,
        clearAllTodos,
        searchTerm,
        setSearchTerm,
        filteredTodos
    };
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}