import React, { useCallback, useState } from 'react'
import { Song } from 'types';
import PlayerContext from './Context';

const PlayerProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState<null | Song>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectSong = useCallback((song: Song) => {
    setSelectedSong(song);
  }, [setSelectedSong]);

  const setPlaySong = useCallback((v: boolean) => {
    setIsPlaying(v);
  }, [setIsPlaying]);
  return (
    <PlayerContext.Provider value={{ selectedSong, selectSong, isPlaying, setPlaySong }}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider;
