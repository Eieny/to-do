import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreator } from '@reduxjs/toolkit';

/**
 * Создаёт команду.
 * @returns функция высова команды.
 */
const useQuery = <T extends ActionCreator<any>>(action: T) => {
  const dispatch = useDispatch();
  const dispatchedAction = (...args: Parameters<typeof action>) =>
    dispatch(action(...args));
  return useCallback(dispatchedAction, [dispatch, action]);
};
export default useQuery;
