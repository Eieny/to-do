import React from 'react';
import clsx from 'clsx';
import css from './NavigationTab.module.css';

type Props = {
  children: string;
  value: string | number;
  isSelected?: boolean;
  onClick?: (value: string | number) => void;
};

/**
 * Вкладка.
 */
const NavigationTab = (props: Props) => {
  const { children, value, onClick, isSelected = true } = props;

  const handleClick = () => {
    if (!onClick) return;
    onClick(value);
  };

  return (
    <button
      className={clsx(css['tab'], { [css['tab_selected']]: isSelected })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default NavigationTab;
