import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import declensionCountable from 'commons/l10n/declension';
import { selectLeftCount } from 'commons/store/selectors';
import useQuery from 'commons/utils/useQuery';
import { removeCompleted as removeCompletedAction } from 'commons/store/reducers';
import NavigationTab from 'components/navigation-tab/NavigationTab';
import css from './NavigationBar.module.css';

type TabItem = { label: string; index: number | string };

type Props<T extends TabItem> = {
  selectedValue: number | string;
  items: T[];
  onChange: (value: number | string) => void;
};

/**
 * Склоняет строку в зависимости от числительного.
 */
const useDeclinedString = (count: number) => {
  const [declensionNoun, changeDeclensionNoun] = useState('');
  useEffect(() => {
    const noun = declensionCountable(count, {
      nominative: `Осталась ${count} задача`,
      genitiveSingle: `Осталось ${count} задачи`,
      genitivePlural: `Осталось ${count} задач`,
    });
    changeDeclensionNoun(noun);
  }, [count]);
  return count > 0 ? declensionNoun : 'Нет невыполненных задач';
};

/**
 * Получает кол-во активных задач из стора и возвращает склонённую строку.
 */
const useGetCompletedCountString = () => {
  const leftCount = useSelector(selectLeftCount);
  const leftCountString = useDeclinedString(leftCount);
  return leftCountString;
};

/**
 * Навигационная панель.
 */
const NavigationBar = <T extends TabItem>(props: Props<T>) => {
  const { items, selectedValue, onChange } = props;

  const leftCountString = useGetCompletedCountString();
  const removeCompleted = useQuery(removeCompletedAction);
  const handleClick = () => {
    removeCompleted();
  };
  const getIndex = (x: T) => x.index;
  const getLabel = (x: T) => x.label;

  return (
    <div className={css['bar']}>
      <span className={css['status-bar']}>{leftCountString}</span>
      <div className={css['tabs']}>
        {items.map(x => (
          <NavigationTab
            isSelected={selectedValue === x.index}
            key={`${getLabel(x)}-${getIndex(x)}`}
            value={getIndex(x)}
            onClick={onChange}
          >
            {getLabel(x)}
          </NavigationTab>
        ))}
      </div>
      <button className={css['delete-button']} onClick={handleClick}>
        Удалить выполненные
      </button>
    </div>
  );
};

export default NavigationBar;
