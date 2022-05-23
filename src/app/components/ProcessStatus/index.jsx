import React from 'react';
import { Text } from 'react-native-web';
import { Button, Grid, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';

import cStyles from 'app/commons/styles';
import { getBulkDownload } from 'app/api/bulkDownload';
import { useDispatch } from 'react-redux';
import { removeBulkDownload, removeDownload } from 'app/reducers/download';

function ProcessStatus(props) {
  const { idVideo, data, progress, type } = props;
  const dispatch = useDispatch();

  const getDownloadData = async () => {
    const response = await getBulkDownload(idVideo);
    if (response instanceof Error) {
      alert(response.message);
    } else {
      if (type === 'bulk') dispatch(removeBulkDownload(idVideo));
      else dispatch(removeDownload(idVideo));
    }
  };

  const removeDownloadData = () => {
    if (type === 'bulk') dispatch(removeBulkDownload(idVideo));
    else dispatch(removeDownload(idVideo));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <Text style={cStyles.body1}>{data}</Text>
      </Grid>
      <Grid item xs={3}>
        {String(progress) === '100' ? (
          <Button variant="contained" onClick={getDownloadData}>
            Download
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={removeDownloadData}
          >
            Remove
          </Button>
        )}
      </Grid>
      {String(progress) !== '-1' ? (
        <>
          <Grid item xs={11} sx={{ marginTop: 1.25 }}>
            <LinearProgress variant="determinate" value={parseInt(progress)} />
          </Grid>
          <Grid item xs={1}>
            <Text>{`${String(progress).split('.')[0]}%`}</Text>
          </Grid>
        </>
      ) : (
        <Grid item xs={12} sx={{ marginTop: 1.25 }}>
          <Text>Job failed!</Text>
        </Grid>
      )}
    </Grid>
  );
}

ProcessStatus.propTypes = {
  idVideo: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  type: PropTypes.string.isRequired,
};

export default ProcessStatus;
