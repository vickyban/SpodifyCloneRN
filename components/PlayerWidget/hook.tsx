import { useContext } from 'react';
import { PlayerContext, PlayerActionContext } from './Context';

const usePlayerWidget = () => {
  const state = useContext(PlayerContext);
  const actions = useContext(PlayerActionContext);
  return {
    ...state,
    ...actions
  };
};

export const usePlayerWidgetActions = () => {
  return useContext(PlayerActionContext);
}

export default usePlayerWidget;