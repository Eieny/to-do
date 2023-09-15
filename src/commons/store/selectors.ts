import AppState from './state';

const selectTodos = (state: AppState) => state.todos;
const selectLeftCount = (state: AppState) => state.todosLeft;

export { selectTodos, selectLeftCount };
