import React from 'react';
import { render } from '@testing-library/react';
import TestWrapper from 'commons/utils/test-utils';
import NavigationBar from './NavigationBar';

describe('Тестирование компонента NavigationBar', () => {
  it('Рендер компонента', () => {
    const change = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <NavigationBar
          items={[
            { index: 0, label: 'Test Selected Tab' },
            { index: 1, label: 'Test Tab' },
          ]}
          onChange={change}
          selectedValue={0}
        />
      </TestWrapper>
    );
    expect(getByText('Test Selected Tab')).toBeInTheDocument();
    expect(getByText('Test Tab')).toBeInTheDocument();
  });
});
