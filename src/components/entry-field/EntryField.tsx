import React, { useState } from 'react';
import css from './EntryField.module.css';

type Props = {
  onEnter: (str: string) => void;
};

/**
 * Поле ввода.
 */
const EntryField = (props: Props) => {
  const { onEnter } = props;
  const [state, setState] = useState('');

  const handleChageState = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!newValue.trim()) return;
    if (newValue.length >= 200) {
      setState(newValue.slice(0, 199));
    } else {
      setState(newValue);
    }
  };

  const addTodo = () => {
    if (state.trim()) {
      onEnter(state);
    }
  };

  const handleBlur = () => {
    addTodo();
    setState('');
  };

  const handleEnterTask = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      addTodo();
      setState('');
    }
  };

  return (
    <div className={css['field']}>
      <textarea
        value={state}
        onChange={handleChageState}
        onBlur={handleBlur}
        onKeyDown={handleEnterTask}
        rows={3}
        placeholder='Начните вводить задачу...'
        maxLength={200}
      />
    </div>
  );
};

export default EntryField;
