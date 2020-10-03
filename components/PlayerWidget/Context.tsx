import { createContext } from 'react';
import { Song } from '../../types';

export const PlayerContext = createContext<{
  selectedSong: null | Song,
  isPlaying: boolean,
}>({
  selectedSong: null,
  isPlaying: false,
});


export const PlayerActionContext = createContext<{
  selectSong?: (song: Song) => void,
  togglePlay: () => void,
}>({
  togglePlay: () => { }
});