import React, { useState } from 'react';
import { View, Text } from 'react-native-web';
import { Button } from '@mui/material';
import { LibraryAdd } from '@mui/icons-material';

import { generateRandomVideo } from './utils';
import styles from 'app/pages/styles';
import VideoFrame from 'app/components/VideoFrame';
import AddToPlaylist from 'app/components/AddToPlaylist';

function Homepage() {
  const [idVideo, setIdVideo] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleGenerateRandomVideo = () => {
    setIdVideo(generateRandomVideo());
  };

  const handleDownloadVideo = () => {
    // api call to download video
  };

  const handleAddToPlaylist = () => {
    // Show modal and api call to add video to playlist
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Random Video Generator</Text>

      <VideoFrame idVideo={idVideo} />

      <View style={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ marginRight: 2.5 }}
          onClick={handleGenerateRandomVideo}
        >
          Generate
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadVideo}
          disabled={idVideo === ''}
        >
          Download
        </Button>
      </View>
      <Button
        variant="contained"
        startIcon={<LibraryAdd />}
        onClick={handleAddToPlaylist}
        disabled={idVideo === ''}
      >
        Add to Playlist
      </Button>

      {isOpenModal && (
        <AddToPlaylist
          idVideo={idVideo}
          isOpen={isOpenModal}
          onCloseModal={onCloseModal}
        />
      )}
    </View>
  );
}

export default Homepage;
