export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type FilterStatus = 'tout' | 'fait' | 'en cours';

export interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredTodos: Todo[];
    selectedTodos: string[];
    toggleSelection: (id: string) => void;
    selectAll: () => void;
    clearSelection: () => void;
    deleteSelected: () => void;
    filterStatus: FilterStatus;
    setFilterStatus: (status: FilterStatus) => void;
}