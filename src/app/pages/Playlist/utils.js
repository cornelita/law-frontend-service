import { YOUTUBE_VIDEOS } from 'app/pages/Homepage/constants';

const dummyPlaylistData = [];

for (let i = 0; i <= 100; i += 1) {
  dummyPlaylistData.push({
    id: i,
    name: `Playlist-${i}`,
    videos: YOUTUBE_VIDEOS,
  });
}

export const getAllPlaylist = () => {
  return dummyPlaylistData;
};
