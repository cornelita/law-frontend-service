import React from 'react';
import { View, Text } from 'react-native-web';
import { Grid } from '@mui/material';

import styles from 'app/pages/styles';
import ProcessStatus from 'app/components/ProcessStatus';
import { getAllProcess } from './utils';

function Process() {
  const allProcess = getAllProcess();

  return (
    <View>
      <Text style={styles.pageTitle}>Background Process</Text>
      <Grid container columnSpacing={8} rowSpacing={2.5}>
        {allProcess.map(({ id, data, progress }) => (
          <Grid item xs={6} key={id}>
            <ProcessStatus idVideo={data} progress={progress} />
          </Grid>
        ))}
      </Grid>
    </View>
  );
}

export default Process;
