import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native-web';
import { Button, Grid, Link } from '@mui/material';

import cStyles from 'app/commons/styles';
import styles from 'app/pages/styles';
import PlaylistCard from 'app/components/PlaylistCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylistByUser } from 'app/api/playlist';
import { useNavigate } from 'react-router-dom';
import { bulkDownload } from 'app/api/bulkDownload';
import { addBulkDownload } from 'app/reducers/download';

function Playlist() {
  const { username } = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [allPlaylist, setAllPlaylist] = useState([]);
  const [visibleDetailPlaylist, setVisibleDetailPlaylist] = useState(null);

  useEffect(() => {
    if (username === undefined || username === '') {
      navigate('/');
      return;
    }

    const getData = async () => {
      const response = await getAllPlaylistByUser(username);

      if (response instanceof Error) {
        alert(response.message);
      } else {
        setAllPlaylist(response.data);
      }
    };

    getData();
  });

  const handleOnClickDownloadAll = async (videos) => {
    const response = await bulkDownload(videos);
    if (response instanceof Error) {
      alert(response.message);
    } else {
      dispatch(addBulkDownload(response.bulkDownloadId));
      alert(`Success: ${response.bulkDownloadId}`);
    }
  };

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
                  handleOnClickDownloadAll={handleOnClickDownloadAll}
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
              <Text style={cStyles.h2}>
                {visibleDetailPlaylist.playlist_name}
              </Text>
              <View style={{ marginTop: 20 }}>
                <Text style={cStyles.body1}>Video:</Text>
                {visibleDetailPlaylist.videos.map((value, index) => (
                  <Text style={cStyles.body1} key={`video-${index}`}>
                    {`${index + 1}. `}
                    <Link href={`https://youtu.be/${value}`}>
                      {`https://youtu.be/${value}`}
                    </Link>
                  </Text>
                ))}
              </View>
            </ScrollView>
            <Button
              variant="contained"
              sx={{ width: 'fit-content', marginTop: 2.5 }}
              onClick={() =>
                handleOnClickDownloadAll(visibleDetailPlaylist.videos)
              }
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
