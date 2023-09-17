import React from 'react';
import { render, screen } from '@testing-library/react';
import TestWrapper from 'commons/utils/test-utils';
import App from './App';

test('renders App header', () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );
  const header = screen.getByText('todos');
  expect(header).toBeInTheDocument();
});
