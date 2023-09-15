import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from 'commons/store/selectors';
import { add as addAction } from 'commons/store/reducers';
import { Todo } from 'commons/store/state';
import useQuery from 'commons/utils/useQuery';
import TasksList from 'components/tasksList/TasksList';
import NavigationBar from 'components/navigationBar/NavigationBar';
import TabPanel from 'components/tabPanel/TabPanel';
import EntryField from 'components/entryField/EntryField';
import 'App.css';

export enum PanelIndex {
  ALL,
  COMPLITED,
  ACTIVE,
}

const Tabs = [
  {
    index: PanelIndex.ALL,
    label: 'Все',
  },
  {
    index: PanelIndex.COMPLITED,
    label: 'Выполненные',
  },
  {
    index: PanelIndex.ACTIVE,
    label: 'Активные',
  },
];

/**
 * Фильтрует задачи.
 * @returns массивы со всеми задачами, активными задачами и выполненными задачами.
 */
const useTasks = () => {
  const tasks = useSelector(selectTodos);
  const completedTasks: Todo[] = [];
  const activeTasks: Todo[] = [];
  for (const task of tasks) {
    if (task.isCompleted) completedTasks.push(task);
    else activeTasks.push(task);
  }

  return [tasks, activeTasks, completedTasks] as const;
};

const App = () => {
  const [value, setValue] = useState(PanelIndex.ALL);
  const handleChange = (newValue: PanelIndex) => {
    setValue(newValue);
  };
  const [tasks, activeTasks, complitedTasks] = useTasks();
  const add = useQuery(addAction);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>todos</h1>
      </header>
      <main>
        <EntryField onEnter={add} />

        <TabPanel index={PanelIndex.ALL} value={value}>
          <TasksList tasks={tasks} fallbackString='Задач нет' />
        </TabPanel>
        <TabPanel index={PanelIndex.COMPLITED} value={value}>
          <TasksList
            tasks={complitedTasks}
            fallbackString='Выполненных задач нет'
          />
        </TabPanel>
        <TabPanel index={PanelIndex.ACTIVE} value={value}>
          <TasksList tasks={activeTasks} fallbackString='Активных задач нет' />
        </TabPanel>

        <NavigationBar
          selectedValue={value}
          items={Tabs}
          onChange={handleChange}
        />
      </main>
    </div>
  );
};

export default App;
