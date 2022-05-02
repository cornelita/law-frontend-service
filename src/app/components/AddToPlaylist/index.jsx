import React from 'react';
import PropTypes from 'prop-types';
import { Add, Close } from '@mui/icons-material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, TextField } from '@mui/material';
import { getAllPlaylistByUser } from './utils';
import { View } from 'react-native-web';

function AddToPlaylist(props) {
  const { isOpen, onCloseModal } = props;
  const allPlaylist = getAllPlaylistByUser();

  const handleCheckboxClick = (event) => {
    // Notes: Does it change playlist when user check/uncheck it? Will it cause too much API call?
    if (event.target.checked) {
      // Add to playlist
      // console.log(event.target.checked)
      // console.log(event.target.value)
    } else {
      // Remove from playlist
      // console.log("uncheck")
    }
  }

  return (
    <Dialog
      open={isOpen}
    >
      <DialogTitle display={'flex'} justifyContent={'space-between'}>
        Add to playlist
        <IconButton onClick={onCloseModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent>
        <View>
          {allPlaylist.map(({id, name}) => (
            <FormControlLabel key={`playlist-${id}`} control={<Checkbox />} label={`${id}-${name}`} value={id} onChange={handleCheckboxClick} />
          ))}
        </View>
      </DialogContent>
      <Divider sx={{ borderWidth: 8 }} />

      <DialogTitle>
        Create a new playlist
      </DialogTitle>
      <Divider />

    <DialogContent sx={{ minHeight: 120 }}>
        <TextField
          label='Playlist Name'
          variant='standard' 
          sx={{ minWidth: '320px' }}
        />
        <DialogActions sx={{ padding: 0, paddingTop: 2.5 }}>
          <Button
            variant='contained'
            startIcon={<Add />}
          >
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

AddToPlaylist.propTypes = {
  idVideo: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default AddToPlaylist;
