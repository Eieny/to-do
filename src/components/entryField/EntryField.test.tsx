import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import EntryField from './EntryField';

describe('Тестирование компонента EntryField', () => {
  it('Рендер компонента', () => {
    const entry = jest.fn();
    const { getByPlaceholderText, unmount } = render(
      <EntryField onEnter={entry} />
    );
    expect(
      getByPlaceholderText('Начните вводить задачу...')
    ).toBeInTheDocument();
    unmount();
  });

  it('Проверка отправки данных из формы', () => {
    const entry = jest.fn();
    const { getByPlaceholderText } = render(<EntryField onEnter={entry} />);
    const input = getByPlaceholderText('Начните вводить задачу...');

    fireEvent.change(input, { target: { value: 'Test Text' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(entry.mock.calls[0][0]).toBe('Test Text');

    fireEvent.change(input, { target: { value: 'Test Text_Blur' } });
    fireEvent.blur(input);
    expect(entry.mock.calls[1][0]).toBe('Test Text_Blur');
  });

  it('Должен изменить данные в компоненте', () => {
    const entry = jest.fn();
    const { getByPlaceholderText } = render(<EntryField onEnter={entry} />);
    const input = getByPlaceholderText('Начните вводить задачу...');

    fireEvent.change(input, { target: { value: 'Test Text' } });
    expect((input as HTMLTextAreaElement).value).toBe('Test Text');
  });
});
