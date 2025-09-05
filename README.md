# nextjs-todo

Application de gestion de tâches construite avec Next.js et TypeScript.
Permet d'ajouter, filtrer, rechercher et gérer des todos avec sélection multiple.

## Déploiement

```bash
npm install
npm run dev
```

L'application sera accessible sur http://localhost:3000.


## Fonctionnalités

L'application permet d'ajouter des tâches, les marquer comme faites ou non, les supprimer par lot.
Une barre de recherche et des filtres de base sont implémentés.

Il manque certainement des fonctionnalités comme le temps écoulé depuis la création d'une tâche pour éventuellement avoir des alertes.

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
