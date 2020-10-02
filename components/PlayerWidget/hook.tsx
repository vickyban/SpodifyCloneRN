import { useContext } from 'react';
import PlayerContext from './Context';

const usePlayerWidget = () => {
  const context = useContext(PlayerContext);
  return context;
};

export default usePlayerWidget;