import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from 'commons/store/store';
import App from './App';

test('renders App header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const header = screen.getByText('todos');
  expect(header).toBeInTheDocument();
});
