import React, { useEffect, useMemo, useState } from 'react';
import { Text } from 'react-native-web';
import { Button, Grid, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';

import cStyles from 'app/commons/styles';
import { getBulkDownload } from 'app/api/bulkDownload';
import { useDispatch } from 'react-redux';
import { removeBulkDownload, removeDownload } from 'app/reducers/download';
import config from 'app/config';

function ProcessStatus(props) {
  const { idVideo, type } = props;
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const client = useMemo(
    () =>
      new WebSocket(
        `${config.WS_BULK_DOWNLOAD_URL}/ws/bulk-download/${idVideo}/`,
      ),
    [idVideo],
  );

  let idInterval;

  client.onopen = () => {
    client.send(
      JSON.stringify({
        bulkDownloadIds: idVideo,
      }),
    );

    if (idInterval !== undefined) {
      clearInterval(idInterval);
    }

    idInterval = setInterval(() => {
      if (progress === '100') clearInterval(idInterval);
      client.send(
        JSON.stringify({
          bulkDownloadIds: idVideo,
        }),
      );
    }, 5000);
  };

  client.onclose = () => {
    clearInterval(idInterval);
  };

  client.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setProgress(data.message);
  };

  useEffect(() => {
    return () => {
      clearInterval(idInterval);
      client.close();
    };
  });

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
        <Text style={cStyles.body1}>{idVideo}</Text>
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
  type: PropTypes.string.isRequired,
};

export default ProcessStatus;
