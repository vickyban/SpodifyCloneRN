import { Theme } from "components/theme";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  AlbumDetail: undefined;
  SearchAlbumSong: undefined;
  SongDetail: undefined;
};

export type TabTwoParamList = {
  AllGenre: undefined;
  AlbumsByGenre: undefined;
  Search: undefined;
};

export type Album = {
  id: string;
  imageUri: string;
  artistsHeadline: string;
}

export type Song = {
  id: string;
  imageUri: string;
  title: string;
  artist: string;
}

export type AlbumDetail = Album & {
  name: string;
  by: string;
  songs: Song[];
}

export type Category = {
  id: string;
  name: string;
  backgroundColor: keyof Theme['colors'];
  imageUri: string;
  subType?: 'playlists' | 'subGenre';
}