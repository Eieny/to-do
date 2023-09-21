import React from 'react';
import { Todo } from 'commons/store/state';
import {
  remove as removeAction,
  toggle as toggleAction,
  update as updateAction,
} from 'commons/store/reducers';
import useQuery from 'commons/utils/useQuery';
import Task from '../task/Task';
import css from './TasksList.module.css';

type Props = {
  /**
   * Список задач.
   */
  tasks: Todo[];
  /**
   * Текст, который будет отображаться, если список пуст.
   */
  fallbackString: string;
};

/**
 * Список задач.
 */
const TasksList = (props: Props) => {
  const { tasks, fallbackString } = props;
  const toggle = useQuery(toggleAction);
  const remove = useQuery(removeAction);

  // TODO: прикрутить возможность редактировать задачи.
  // const update = useQuery(updateAction);

  if (tasks.length === 0) {
    return <span className={css['fallback']}>{fallbackString}</span>;
  }

  return (
    <ul className={css['list']}>
      {tasks.map(x => (
        <Task
          key={`${x.name}-${x.id}`}
          {...x}
          onToggle={toggle}
          onRemove={remove}
        />
      ))}
    </ul>
  );
};

export default TasksList;
