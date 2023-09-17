import React from 'react';
import { render } from '@testing-library/react';
import TestWrapper from 'commons/utils/test-utils';
import TasksList from './TasksList';

describe('Тестирование компонента TasksList', () => {
  it('Рендер компонента', () => {
    const { getByText } = render(
      <TestWrapper>
        <TasksList
          tasks={[
            { id: 0, isCompleted: false, name: 'Test' },
            { id: 1, isCompleted: false, name: 'Test-2' },
            { id: 2, isCompleted: false, name: 'Test-3' },
          ]}
          fallbackString='Test Fallback'
        />
      </TestWrapper>
    );
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByText('Test-2')).toBeInTheDocument();
    expect(getByText('Test-3')).toBeInTheDocument();
  });

  it('Рендер фолбека компонента', () => {
    const { getByText } = render(
      <TestWrapper>
        <TasksList tasks={[]} fallbackString='Test Fallback' />
      </TestWrapper>
    );
    expect(getByText('Test Fallback')).toBeInTheDocument();
  });
});
