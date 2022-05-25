import React from 'react';
import { View, Text } from 'react-native-web';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from 'app/pages/styles';
import ProcessStatus from 'app/components/ProcessStatus';

function Process() {
  const { download, bulkDownload } = useSelector(
    (state) => state.download.value,
  );

  return (
    <>
      <View>
        <Text style={styles.pageTitle}>Background Process - Bulk Download</Text>
        <Grid container columnSpacing={8} rowSpacing={2.5}>
          {bulkDownload.map((id) => (
            <Grid item xs={6} key={id}>
              <ProcessStatus idVideo={id} type="bulk" />
            </Grid>
          ))}

          {bulkDownload.length === 0 && (
            <Grid item xs={12}>
              <Text>No Background Process for Bulk Download</Text>
            </Grid>
          )}
        </Grid>
      </View>

      <View>
        <Text style={styles.pageTitle}>Background Process - Download</Text>
        <Grid container columnSpacing={8} rowSpacing={2.5}>
          {download.map((id) => (
            <Grid item xs={6} key={id}>
              <ProcessStatus idVideo={id} type="download" />
            </Grid>
          ))}

          {download.length === 0 && (
            <Grid item xs={12}>
              <Text>No Background Process for Download</Text>
            </Grid>
          )}
        </Grid>
      </View>
    </>
  );
}

export default Process;
