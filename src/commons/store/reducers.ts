import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import genId from 'commons/utils/generateId';
import { Todo, initialAppState } from './state';

const todosReducerSlice = createSlice({
  name: 'todo',
  initialState: initialAppState,
  reducers: {
    /**
     * Добавление новой задачи.
     */
    add: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.unshift(action.payload);
        state.todosLeft++;
      },
      prepare: (name: string) => {
        return {
          payload: {
            name,
            id: genId(),
            isCompleted: false,
          },
        };
      },
    },

    /**
     * Обновление имени задачи.
     */
    update: (state, action: PayloadAction<{ name: string; id: number }>) => {
      const payload = action.payload;
      const todo = state.todos.find(x => x.id === payload.id);
      if (todo) {
        todo.name = payload.name;
      }
    },

    /**
     * Удаление задачи.
     */
    remove: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(x => x.id !== action.payload);
      state.todosLeft = state.todos.filter(x => !x.isCompleted).length;
    },

    /**
     * Смена поля задачи выполнена/невыполнена.
     */
    toggle: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(x => x.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        state.todosLeft = todo.isCompleted
          ? state.todosLeft - 1
          : state.todosLeft + 1;
      }
    },

    /**
     * Удаление выполненных задач.
     */
    removeCompleted: state => {
      state.todos = state.todos.filter(x => !x.isCompleted);
    },
  },
});

export default todosReducerSlice.reducer;
export const { add, update, remove, toggle, removeCompleted } =
  todosReducerSlice.actions;
