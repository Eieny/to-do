export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface AppState {
  todos: Todo[];
  todosLeft: number;
}

export const initialAppState: AppState = {
  todos: [],
  todosLeft: 0,
};

export default AppState;
