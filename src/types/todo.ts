export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    completedAt: Date;
}


export interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    clearAllTodos: () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredTodos: Todo[];
}