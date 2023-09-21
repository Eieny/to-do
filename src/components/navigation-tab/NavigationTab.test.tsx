import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NavigationTab from './NavigationTab';

describe('Тестирование компонента NavigationTab', () => {
  it('Рендер активного компонента', () => {
    const { getByText, container } = render(
      <NavigationTab isSelected value={0}>
        Test Tab
      </NavigationTab>
    );
    expect(getByText('Test Tab')).toBeInTheDocument();
    expect(container.firstElementChild.classList.contains('tab_selected')).toBe(
      true
    );
  });

  it('Рендер неактивного компонента', () => {
    const { getByText, container } = render(
      <NavigationTab isSelected={false} value={0}>
        Test Tab
      </NavigationTab>
    );
    expect(getByText('Test Tab')).toBeInTheDocument();
    expect(container.firstElementChild.classList.contains('tab_selected')).toBe(
      false
    );
  });

  it('Проверка кликов', () => {
    const click = jest.fn();
    const { getByText, container } = render(
      <NavigationTab isSelected={false} value={0} onClick={click}>
        Test Tab
      </NavigationTab>
    );
    fireEvent.click(getByText('Test Tab'));
    expect(click.mock.calls[0][0]).toBe(0);
  });
});
