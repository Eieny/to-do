import React, { memo } from 'react';
import clsx from 'clsx';
import deleteIcon from 'assets/delete.svg';
import css from './Task.module.css';

type Props = {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

/**
 * Компонент, отображающий таску.
 */
const Task = (props: Props) => {
  const { id, name, isCompleted, onToggle, onRemove } = props;

  const handleEnter = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      onToggle(id);
    }
  };

  const handleToggle = () => {
    onToggle(id);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onRemove(id);
    // Останавливаем всплытие клика, иначе сработает `onToggle`
    e.stopPropagation();
  };

  return (
    <li
      className={clsx(css['item'], { [css['completed']]: isCompleted })}
      onClick={handleToggle}
      onKeyDown={handleEnter}
      tabIndex={0}
    >
      <div className={css['content']}>
        <input
          id={`task-${id}`}
          type='checkbox'
          checked={isCompleted}
          onChange={handleToggle}
        />
        <label htmlFor={`task-${id}`} className={css['checkbox']} />
        <span>{name}</span>
      </div>
      <button onClick={handleRemove}>
        <img src={deleteIcon} />
      </button>
    </li>
  );
};

const memoTask = memo(Task);
export default memoTask;
