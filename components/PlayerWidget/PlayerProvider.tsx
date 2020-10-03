import React, { useCallback, useEffect, useState } from 'react'
import { Song } from 'types';
import { PlayerContext, PlayerActionContext } from './Context';

const PlayerProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState<null | Song>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectSong = useCallback((song: Song) => {
    setSelectedSong(song);
  }, [setSelectedSong]);

  const togglePlay = useCallback(() => {
    setIsPlaying(v => !v);
  }, [setIsPlaying]);

  useEffect(() => {
    if (selectedSong === null) return;
    setIsPlaying(true);
  }, [selectedSong, setIsPlaying])
  return (
    <PlayerContext.Provider value={{ selectedSong, isPlaying }}>
      <PlayerActionContext.Provider value={{ selectSong, togglePlay }}>
        {children}
      </PlayerActionContext.Provider>
    </PlayerContext.Provider>
  )
}

export default PlayerProvider;
