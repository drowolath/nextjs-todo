'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, TodoContextType, FilterStatus } from '../types/todo';


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
    const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('tout');


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

    // Basculer la sélection d'une todo
    const toggleSelection = (id: string): void => {
        setSelectedTodos(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(todoId => todoId !== id)
                : [...prevSelected, id]
        );
    };

    // Sélectionner toutes les todos
    const selectAll = (): void => {
        setSelectedTodos(todos.map(todo => todo.id));
    };

    // Effacer la sélection
    const clearSelection = (): void => {
        setSelectedTodos([]);
    };

    // Supprimer les todos sélectionnées
    const deleteSelected = (): void => {
        setTodos(prevTodos => 
            prevTodos.filter(todo => !selectedTodos.includes(todo.id))
        );
        setSelectedTodos([]);
    };

    // Filtrer les todos selon le status et le terme de recherche
    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'tout' || 
                             (filterStatus === 'fait' && todo.completed) ||
                             (filterStatus === 'en cours' && !todo.completed);
        return matchesSearch && matchesStatus;
    });


    const value : TodoContextType = {
        todos,
        addTodo,
        toggleTodo,
        searchTerm,
        setSearchTerm,
        filteredTodos,
        selectedTodos,
        toggleSelection,
        selectAll,
        clearSelection,
        deleteSelected,
        filterStatus,
        setFilterStatus
    };
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}