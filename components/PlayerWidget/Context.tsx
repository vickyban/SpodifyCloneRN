import React, { createContext } from 'react';
import { Song } from '../../types';

const PlayerContext = createContext<{
  selectedSong: null | Song,
  isPlaying: boolean,
  selectSong: (song: Song) => void,
  setPlaySong: (v: boolean) => void,
} | null>(null);

export default PlayerContext;