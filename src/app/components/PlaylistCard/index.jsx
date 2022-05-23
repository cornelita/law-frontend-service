import React from 'react';
import { Text } from 'react-native-web';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import PropTypes from 'prop-types';

import cStyles from 'app/commons/styles';

function PlaylistCard(props) {
  const { playlistData, onClickDetail, handleOnClickDownloadAll } = props;

  const handleOnClickDetail = () => {
    onClickDetail(playlistData);
  };

  return (
    <Card>
      <CardHeader
        title={<Text style={cStyles.h2}>{playlistData.playlist_name}</Text>}
      />
      <CardContent>
        <Text style={cStyles.body1}>{playlistData.videos.length} videos</Text>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleOnClickDetail}>
          Detail
        </Button>
        <Button
          variant="contained"
          onClick={() => handleOnClickDownloadAll(playlistData.videos)}
        >
          Download All
        </Button>
      </CardActions>
    </Card>
  );
}

PlaylistCard.propTypes = {
  playlistData: PropTypes.shape({
    id: PropTypes.string,
    playlist_name: PropTypes.string,
    videos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClickDetail: PropTypes.func.isRequired,
  handleOnClickDownloadAll: PropTypes.func.isRequired,
};

export default PlaylistCard;
