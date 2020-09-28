export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  AlbumDetail: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
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