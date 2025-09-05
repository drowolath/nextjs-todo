# nextjs-todo

Application de gestion de tâches construite avec Next.js et TypeScript.
Permet d'ajouter, filtrer, rechercher et gérer des todos avec sélection multiple.

## Déploiement

```bash
npm install
npm run dev
```

L'application sera accessible sur http://localhost:3000.


## Hierarchie des composants

```
<TodoProvider>
    <AddTodoForm />
    <SearchBar />
    <FilterTabs />
    <SelectionControls />
    <TodoList />
</TodoProvider>
```
