import { Box, Text } from '@components/theme'
import React from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import usePlayerWidget from './hook';
import PlayButton from './PlayButton';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RoundedIcon } from '@components/common';

const { width, height } = Dimensions.get('window');

const FullPlayer = () => {
  const insets = useSafeAreaInsets();
  const { selectedSong, isPlaying, togglePlay } = usePlayerWidget();

  if (selectedSong == null) return null;
  return (
    <Box
      width={width}
      height={height}
      backgroundColor='lavenderBlue'
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }}
    >
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,.9)']}
        style={StyleSheet.absoluteFillObject}
      />
      <Box marginBottom='m'>
        <Text variant='subheader' textAlign='center'>{selectedSong.title}</Text>
      </Box>
      <Box style={styles.cover}>
        <Image source={{ uri: "https://64.media.tumblr.com/2ebd31986bbc7dfdc3e377d0a044eb2a/tumblr_p3ypv2v46H1uee2rto1_1280.png" }} style={styles.img} />
      </Box>
      <Box paddingHorizontal='m' marginTop='m'>
        <Text variant='subheader' >{selectedSong.title}</Text>
        <Text variant='body'>{selectedSong.artist}</Text>
      </Box>
      <Box flexDirection='row' alignItems='center' justifyContent='space-evenly'>
        <RoundedIcon
          size={30}
          name='shuffle'
          IconType={MaterialIcons}
          color='white'
        />
        <RoundedIcon
          size={40}
          name='step-backward'
          IconType={FontAwesome}
          color='white'
        />
        <PlayButton
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playIcon={{
            size: 80,
            name: 'play-circle-filled',
            IconType: MaterialIcons,
            color: 'white'
          }}
          pauseIcon={{
            size: 80,
            name: 'pause-circle-filled',
            IconType: MaterialIcons,
            color: 'white'
          }}
        />
        <RoundedIcon
          size={40}
          name='step-forward'
          IconType={FontAwesome}
          color='white'
        />
        <RoundedIcon
          size={30}
          name='loop'
          IconType={MaterialIcons}
          color='white'
        />
      </Box>
    </Box>
  )
}

export default FullPlayer

const styles = StyleSheet.create({
  cover: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignSelf: 'center'
  },
  img: {
    width: 300,
    height: 300,
  }
})
