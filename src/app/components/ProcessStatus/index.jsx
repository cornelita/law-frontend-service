import React from 'react';
import { Text } from 'react-native-web';
import { Grid, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';

import cStyles from 'app/commons/styles';

function ProcessStatus(props) {
  const { idVideo, progress } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Text style={cStyles.body1}>
          Download {idVideo}
        </Text>
      </Grid>
      <Grid item xs={11} sx={{ marginTop: 1.25 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Grid>
      <Grid item xs={1}>
        <Text>{`${progress}%`}</Text>
      </Grid>
    </Grid>
  )
}

ProcessStatus.propTypes = {
  idVideo: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

export default ProcessStatus;
