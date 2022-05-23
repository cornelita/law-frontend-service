import React, { useState } from 'react';
import { View, Text } from 'react-native-web';
import { Button } from '@mui/material';
import { LibraryAdd } from '@mui/icons-material';

import { generateRandomVideo } from './utils';
import styles from 'app/pages/styles';
import VideoFrame from 'app/components/VideoFrame';
import AddToPlaylist from 'app/components/AddToPlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { download } from 'app/api/download';
import { addDownload } from 'app/reducers/download';

function Homepage() {
  const dispatch = useDispatch();

  const [idVideo, setIdVideo] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { username } = useSelector((state) => state.auth.value);

  const handleGenerateRandomVideo = () => {
    setIdVideo(generateRandomVideo());
  };

  const handleDownloadVideo = async () => {
    // api call to download video
    const response = await download(idVideo);
    if (response instanceof Error) {
      alert(response.message);
    } else {
      dispatch(addDownload(response.downloadId));
      alert(`Success: ${response.downloadId}`);
    }
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
      {username !== undefined && username !== '' && (
        <Button
          variant="contained"
          startIcon={<LibraryAdd />}
          onClick={handleAddToPlaylist}
          disabled={idVideo === ''}
        >
          Add to Playlist
        </Button>
      )}

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
