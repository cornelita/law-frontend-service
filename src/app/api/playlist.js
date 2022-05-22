// import config from "app/config";
import { YOUTUBE_VIDEOS } from 'app/pages/Homepage/constants';
// import axios from "axios";

const dummiesResponse = {
  data: {
    data: [
      {
        id: 'playlist-1',
        playlist_name: 'Playlist 1',
        videos: YOUTUBE_VIDEOS.slice(0, 1),
      },
      {
        id: 'playlist-2',
        playlist_name: 'Playlist 2',
        videos: YOUTUBE_VIDEOS.slice(0, 2),
      },
      {
        id: 'playlist-3',
        playlist_name: 'Playlist 3',
        videos: YOUTUBE_VIDEOS,
      },
    ],
  },
};

const dummyResponse = {
  data: {
    data: {
      id: 'playlist-1',
      playlist_name: 'Playlist 1',
      videos: YOUTUBE_VIDEOS,
    },
  },
};

const dummyDeletedPlaylistResponse = {
  data: {
    description: 'playlist deleted',
  },
};

const dummyDeletedVideoResponse = {
  data: {
    description: 'video deleted',
  },
};

export const createPlaylist = async (playlistName, video) => {
  console.log(
    `Call createPlaylist with playlistName=${playlistName}, video=${video}`,
  );
  try {
    // const response = await axios.post(`${config.API_PLAYLIST_URL}/api/playlist/create/`,
    //   {
    //     playlist_name: playlistName,
    //     video,
    //   },
    // )
    const response = dummyResponse;
    return response.data;
  } catch (e) {
    alert(
      e.response?.description ||
        'Failed creating playlist, please try again later!',
    );
  }
};

export const getPlaylistById = async (id) => {
  console.log(`Call getPlaylistById with id=${id}`);
  try {
    // const response = await axios.get(`${config.API_PLAYLIST_URL}/api/playlist/`,
    //   {
    //     params: {
    //       id,
    //     }
    //   },
    // )
    const response = dummyResponse;
    return response.data;
  } catch (e) {
    alert(
      e.response?.description ||
        'Failed retrieving playlist, please try again later!',
    );
  }
};

export const addVideoToPlaylist = async (id, video) => {
  console.log(`Call addVideoToPlaylist with id=${id}, video=${video}`);
  try {
    // const response = await axios.post(`${config.API_PLAYLIST_URL}/api/playlist/`,
    //   {
    //     id,
    //     video,
    //   },
    // )
    const response = dummyResponse;
    return response.data;
  } catch (e) {
    alert(
      e.response?.description || 'Failed to add video, please try again later!',
    );
  }
};

export const deletePlaylist = async (id) => {
  console.log(`Call deletePlaylist with id=${id}`);
  try {
    // const response = await axios.delete(`${config.API_PLAYLIST_URL}/api/playlist/`,
    //   {
    //     params: {
    //       id,
    //     }
    //   },
    // )
    const response = dummyDeletedPlaylistResponse;
    return response.data;
  } catch (e) {
    alert(
      e.response?.description ||
        'Failed to delete video, please try again later!',
    );
  }
};

export const deleteVideoFromPlaylist = async (id, video) => {
  console.log(`Call deleteVideoFromPlaylist with id=${id}, video=${video}`);
  try {
    // const response = await axios.post(`${config.API_PLAYLIST_URL}/api/playlist/delete-video/`,
    //   {
    //     id,
    //     video,
    //   },
    // )
    const response = dummyDeletedVideoResponse;
    return response.data;
  } catch (e) {
    alert(
      e.response?.description ||
        'Failed to delete video, please try again later!',
    );
  }
};

export const getAllPlaylistByUser = async (username) => {
  console.log(`Call getAllPlaylistByUser with username=${username}`);
  try {
    // const response = await axios.get(`${config.API_PLAYLIST_URL}/api/playlist/`,
    //   {
    //     params: {
    //       username,
    //     }
    //   },
    // )
    const response = dummiesResponse;
    return response.data;
  } catch (e) {
    alert(
      e.response?.description ||
        'Failed retrieving playlist, please try again later!',
    );
  }
};
