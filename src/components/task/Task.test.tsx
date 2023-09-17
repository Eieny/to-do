import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Task from './Task';

const remove = jest.fn();
const toggle = jest.fn();
const TaskComponent = (
  <Task
    id={0}
    name='Test Task'
    isCompleted={false}
    onRemove={remove}
    onToggle={toggle}
  />
);

describe('Тестирование компонента Task', () => {
  it('Рендер компонента', () => {
    const { getByText, rerender, unmount } = render(TaskComponent);
    expect(getByText('Test Task')).toBeInTheDocument();
    rerender(
      <Task
        id={0}
        name='Rerendered Test Task'
        isCompleted={false}
        onRemove={remove}
        onToggle={toggle}
      />
    );
    expect(getByText('Rerendered Test Task')).toBeInTheDocument();
    unmount();
  });

  it('Проверка кликов компонента', () => {
    const { getByText, getByRole } = render(TaskComponent);
    fireEvent.click(getByText('Test Task'));
    fireEvent.click(getByRole('button'));
    expect(remove.mock.calls[0][0]).toBe(0);
    expect(toggle.mock.calls[0][0]).toBe(0);
  });
});
