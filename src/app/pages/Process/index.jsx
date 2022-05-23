import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native-web';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from 'app/pages/styles';
import ProcessStatus from 'app/components/ProcessStatus';
import { getAllBulkDownload } from 'app/api/bulkDownload';

function Process() {
  const [allBulkDownload, setAllBulkDownload] = useState([]);
  const [allDownload, setAllDownload] = useState([]);

  const { download, bulkDownload } = useSelector(
    (state) => state.download.value,
  );

  useEffect(() => {
    const getData = async () => {
      const response = await getAllBulkDownload(bulkDownload);
      if (response instanceof Error) {
        alert(response.message);
      } else {
        setAllBulkDownload(response.data);
      }
    };
    getData();
  }, [download, bulkDownload]);

  return (
    <>
      <View>
        <Text style={styles.pageTitle}>Background Process - Bulk Download</Text>
        <Grid container columnSpacing={8} rowSpacing={2.5}>
          {allBulkDownload.map(({ id, data, progress }) => (
            <Grid item xs={6} key={id}>
              <ProcessStatus
                idVideo={id}
                data={data}
                progress={progress}
                type="bulk"
              />
            </Grid>
          ))}

          {allBulkDownload.length === 0 && (
            <Grid item xs={12}>
              <Text>No Background Process for Bulk Download</Text>
            </Grid>
          )}
        </Grid>
      </View>

      <View>
        <Text style={styles.pageTitle}>Background Process - Download</Text>
        <Grid container columnSpacing={8} rowSpacing={2.5}>
          {allDownload.map(({ id, data, progress }) => (
            <Grid item xs={6} key={id}>
              <ProcessStatus
                idVideo={id}
                data={data}
                progress={progress}
                type="download"
              />
            </Grid>
          ))}

          {allDownload.length === 0 && (
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
