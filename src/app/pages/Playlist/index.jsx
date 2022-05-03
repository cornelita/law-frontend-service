import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native-web';
import { Button, Grid } from '@mui/material';

import cStyles from 'app/commons/styles';
import styles from 'app/pages/styles';
import PlaylistCard from 'app/components/PlaylistCard';
import { getAllPlaylist } from './utils';

function Playlist() {
  const allPlaylist = getAllPlaylist();
  const [visibleDetailPlaylist, setVisibleDetailPlaylist] = useState(null);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: '60%' }}>
        <Text style={styles.pageTitle}>Playlist</Text>
        <ScrollView style={{ height: '58vh' }}>
          <Grid container spacing={2.5}>
            {allPlaylist.map((data) => (
              <Grid item xs={6} key={data.id}>
                <PlaylistCard
                  playlistData={data}
                  onClickDetail={setVisibleDetailPlaylist}
                />
              </Grid>
            ))}
          </Grid>
        </ScrollView>
      </View>
      <View
        style={{ paddingLeft: 32, backgroundColor: '#e7e7e7', width: '40%' }}
      >
        <Text style={styles.pageTitle}>Detail Playlist</Text>
        {visibleDetailPlaylist === null && (
          <View>
            <Text style={cStyles.body1}>
              Click "Detail" to see the detail of a playlist
            </Text>
          </View>
        )}
        {visibleDetailPlaylist !== null && (
          <>
            <ScrollView style={{ maxHeight: '44vh' }}>
              <Text style={cStyles.h2}>{visibleDetailPlaylist.name}</Text>
              <View style={{ marginTop: 20 }}>
                <Text style={cStyles.body1}>Video:</Text>
                {visibleDetailPlaylist.videos.map((value, index) => (
                  <Text style={cStyles.body1} key={`video-${index}`}>{`${
                    index + 1
                  }. ${value}`}</Text>
                ))}
              </View>
            </ScrollView>
            <Button
              variant="contained"
              sx={{ width: 'fit-content', marginTop: 2.5 }}
            >
              Download All
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

export default Playlist;
