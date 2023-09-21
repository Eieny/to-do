import React from 'react';
import { render } from '@testing-library/react';
import TabPanel from './TabPanel';

describe('Тестирование компонента TabPanel', () => {
  it('Рендер активной панели компонента', () => {
    const { getByText } = render(
      <TabPanel index={1} value={1}>
        <span>Test</span>
      </TabPanel>
    );
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Должен вернуть пустой DOM элемент', () => {
    const { container } = render(
      <TabPanel index={1} value={0}>
        <span>Test</span>
      </TabPanel>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
