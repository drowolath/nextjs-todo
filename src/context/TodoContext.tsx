'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, TodoContextType } from '../types/todo';


const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = (): TodoContextType => { // just like def get_todo_service() -> TodoService, since I'm a pythonista
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
    return (
        <TodoContext.Provider value={undefined}>
            {children}
        </TodoContext.Provider>
    );
}