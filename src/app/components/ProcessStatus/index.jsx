import React from 'react';
import { Text } from 'react-native-web';
import { Button, Grid, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';

import cStyles from 'app/commons/styles';
import { getBulkDownload } from 'app/api/bulkDownload';
import { useDispatch } from 'react-redux';
import { removeBulkDownload } from 'app/reducers/download';

function ProcessStatus(props) {
  const { idVideo, data, progress } = props;
  const dispatch = useDispatch();

  const getDownloadData = async () => {
    const response = await getBulkDownload(idVideo);
    if (response instanceof Error) {
      alert(response.message);
    } else {
      dispatch(removeBulkDownload(idVideo));
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Text style={cStyles.body1}>{data}</Text>
      </Grid>
      <Grid item xs={4}>
        {progress === '100' && (
          <Button variant="contained" onClick={getDownloadData}>
            Download
          </Button>
        )}
      </Grid>
      <Grid item xs={11} sx={{ marginTop: 1.25 }}>
        <LinearProgress variant="determinate" value={parseInt(progress)} />
      </Grid>
      <Grid item xs={1}>
        <Text>{`${progress}%`}</Text>
      </Grid>
    </Grid>
  );
}

ProcessStatus.propTypes = {
  idVideo: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default ProcessStatus;
