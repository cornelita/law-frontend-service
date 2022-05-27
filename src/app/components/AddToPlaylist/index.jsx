import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Add, Close } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';
import {
  addVideoToPlaylist,
  createPlaylist,
  deleteVideoFromPlaylist,
  getAllPlaylistByUser,
} from 'app/api/playlist';
import { View, Text } from 'react-native-web';
import { useSelector } from 'react-redux';

function AddToPlaylist(props) {
  const { idVideo, isOpen, onCloseModal } = props;
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const { username } = useSelector((state) => state.auth.value);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllPlaylistByUser(username);
      if (response instanceof Error) {
        alert(response.message);
      } else {
        setAllPlaylist(response.data);
      }
    };

    getData();
  }, [username]);

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const onClickCreatePlaylist = async () => {
    const response = await createPlaylist(playlistName, idVideo, username);

    if (response instanceof Error) {
      alert(response.message);
    } else {
      alert(`Playlist created!`);
    }
    setPlaylistName('');
    onCloseModal();
  };

  const handleCheckboxClick = async (event) => {
    // Notes: Does it change playlist when user check/uncheck it? Will it cause too much API call?
    if (event.target.checked) {
      // Add to playlist
      const response = await addVideoToPlaylist(event.target.value, idVideo);
      if (response instanceof Error) {
        alert(response.message);
      } else {
        alert(`Success add video to playlist with id=${event.target.value}!`);
      }
    } else {
      // Remove from playlist
      const response = await deleteVideoFromPlaylist(
        event.target.value,
        idVideo,
      );
      if (response instanceof Error) {
        alert(response.message);
      } else {
        alert(
          `Success delete video from playlist with id=${event.target.value}!`,
        );
      }
    }
    onCloseModal();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle display={'flex'} justifyContent={'space-between'}>
        Add to playlist
        <IconButton onClick={onCloseModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent>
        <View>
          {allPlaylist.map(({ id, playlist_name, videos }) => (
            <FormControlLabel
              key={`playlist-${id}`}
              control={
                <Checkbox checked={videos.urls.indexOf(idVideo) !== -1} />
              }
              label={playlist_name}
              value={id}
              onChange={handleCheckboxClick}
            />
          ))}
          {allPlaylist.length === 0 && <Text>No playlist</Text>}
        </View>
      </DialogContent>
      <Divider sx={{ borderWidth: 8 }} />

      <DialogTitle>Create a new playlist</DialogTitle>
      <Divider />

      <DialogContent sx={{ minHeight: 120 }}>
        <TextField
          label="Playlist Name"
          variant="standard"
          sx={{ minWidth: '320px' }}
          onChange={handlePlaylistNameChange}
        />
        <DialogActions sx={{ padding: 0, paddingTop: 2.5 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onClickCreatePlaylist}
          >
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

AddToPlaylist.propTypes = {
  idVideo: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default AddToPlaylist;
