import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from 'commons/store/reducers';

type Props = {
  children: JSX.Element;
};

const TestWrapper = (props: Props) => {
  const { children } = props;
  const store = configureStore({
    reducer: reducers,
    preloadedState: {
      todos: [
        {
          id: 0,
          isCompleted: false,
          name: 'Test-1',
        },
        {
          id: 1,
          isCompleted: false,
          name: 'Test-2',
        },
        {
          id: 2,
          isCompleted: false,
          name: 'Test-3',
        },
      ],
      todosLeft: 3,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default TestWrapper;
