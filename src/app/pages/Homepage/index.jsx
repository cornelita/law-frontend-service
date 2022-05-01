import React, { useState } from 'react';
import { View, Text } from 'react-native-web';
import { Button } from '@mui/material';
import { LibraryAdd } from '@mui/icons-material';

import styles from './styles';
import { generateRandomVideo } from './utils';
import VideoFrame from './VideoFrame';

function Homepage() {
  const [idVideo, setIdVideo] = useState("");

  const handleGenerateRandomVideo = () => {
    setIdVideo(generateRandomVideo());
  }

  const handleDownloadVideo = () => {
    // api call to download video
  }

  const handleAddToPlaylist = () => {
    // Show modal and api call to add video to playlist
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>
        Random Video Generator
      </Text>

      <VideoFrame idVideo={idVideo} />

      <View style={styles.buttonContainer}>
        <Button 
          variant='contained'
          sx={{ marginRight: 2.5 }}
          onClick={handleGenerateRandomVideo}
        >
          Generate
        </Button>
        <Button
          variant='contained'
          onClick={handleDownloadVideo}
        >
          Download
        </Button>
      </View>
      <Button
        variant='contained'
        startIcon={<LibraryAdd />}
        onClick={handleAddToPlaylist}
      >
        Add to Playlist
      </Button>
    </View>
  )
}

export default Homepage;
