import React from 'react';
import css from './TabPanel.module.css';

type Props = {
  children?: JSX.Element;
  value: string | number;
  index: string | number;
};

/**
 * Панель отображения вкладки.
 */
const TabPanel = (props: Props) => {
  const { children, value, index } = props;
  
  if (value === index) return <div className={css['panel']}>{children}</div>;
  return null;
};

export default TabPanel;
