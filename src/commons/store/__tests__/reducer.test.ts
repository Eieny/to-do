import reducer, {
  add,
  remove,
  removeCompleted,
  toggle,
  update,
} from '../reducers';
import AppState from '../state';

it('Должен вернуть начальное состояние', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    todos: [],
    todosLeft: 0,
  });
});

describe('Тестирование экшена добавления', () => {
  it('Должен добавить тудушку в пустой список', () => {
    const state: AppState = {
      todos: [],
      todosLeft: 0,
    };

    expect(reducer(state, add('Тест'))).toEqual({
      todos: [{ id: 0, name: 'Тест', isCompleted: false }],
      todosLeft: 1,
    });
  });

  it('Должен добавить тудушку в непустой список', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    };

    expect(reducer(state, add('Тест_1'))).toEqual({
      todos: [
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
      ],
      todosLeft: 2,
    });
  });
});

describe('Тестирование экшена обновления', () => {
  it('Должен обновить существующую тудушку', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    };

    expect(
      reducer(
        state,
        update({
          id: 0,
          name: 'Тест_Updated',
        })
      )
    ).toEqual({
      todos: [{ id: 0, name: 'Тест_Updated', isCompleted: false }],
      todosLeft: 1,
    });
  });

  it('Должен оставить список с несуществующей тудушкой без изменений', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    };

    expect(
      reducer(
        state,
        update({
          id: 1,
          name: 'Тест_Updated',
        })
      )
    ).toEqual({
      todos: [{ id: 0, name: 'Тест', isCompleted: false }],
      todosLeft: 1,
    });
  });
});

describe('Тестирование экшена удаления', () => {
  it('Должен удалить существующую тудушку', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 2,
    };

    expect(reducer(state, remove(1))).toEqual({
      todos: [{ id: 0, name: 'Тест', isCompleted: false }],
      todosLeft: 1,
    });
  });

  it('Должен оставить список с несуществующей тудушкой без изменений', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 2,
    };

    expect(reducer(state, remove(3))).toEqual({
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 2,
    });
  });

  it('Должен оставить список пустым', () => {
    const state: AppState = {
      todos: [],
      todosLeft: 0,
    };

    expect(reducer(state, remove(1))).toEqual({
      todos: [],
      todosLeft: 0,
    });
  });
});

describe('Тестирование экшена переключения поля idCompleted', () => {
  it('Должен изменить булевое поле isCompleted с false на true существующей тудушки', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: true,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    };

    expect(reducer(state, toggle(1))).toEqual({
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: true,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: true,
        },
      ],
      todosLeft: 0,
    });
  });

  it('Должен изменить булевое поле isCompleted с true на false существующей тудушки', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: true,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    };

    expect(reducer(state, toggle(0))).toEqual({
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 2,
    });
  });

  it('Должен оставить список с несуществующей тудушкой без изменений', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: true,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    };

    expect(reducer(state, toggle(3))).toEqual({
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: true,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    });
  });

  it('Должен оставить список пусты', () => {
    const state: AppState = {
      todos: [],
      todosLeft: 0,
    };

    expect(reducer(state, toggle(0))).toEqual({
      todos: [],
      todosLeft: 0,
    });
  });
});

describe('Тестирование экшена удаления всех выполненных тудушек', () => {
  it('Должен удалить все выполненные тудушки', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: true,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
        {
          id: 2,
          name: 'Тест_2',
          isCompleted: true,
        },
      ],
      todosLeft: 1,
    };

    expect(reducer(state, removeCompleted())).toEqual({
      todos: [
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
      ],
      todosLeft: 1,
    });
  });

  it('Должен оставить список, не имеющий выполненных тудушек, без изменений', () => {
    const state: AppState = {
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
        {
          id: 2,
          name: 'Тест_2',
          isCompleted: false,
        },
      ],
      todosLeft: 3,
    };

    expect(reducer(state, removeCompleted())).toEqual({
      todos: [
        {
          id: 0,
          name: 'Тест',
          isCompleted: false,
        },
        {
          id: 1,
          name: 'Тест_1',
          isCompleted: false,
        },
        {
          id: 2,
          name: 'Тест_2',
          isCompleted: false,
        },
      ],
      todosLeft: 3,
    });
  });
});
