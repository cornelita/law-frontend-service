const dummyPlaylistData = []

for (let i = 0; i <= 100; i += 1) {
  dummyPlaylistData.push({
    id: i,
    name: `Playlist-${i}`
  })
}

export const getAllPlaylistByUser = () => {
  return dummyPlaylistData;
}