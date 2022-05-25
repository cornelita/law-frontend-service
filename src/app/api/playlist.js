import config from 'app/config';
import axios from 'axios';

export const createPlaylist = async (playlistName, video, username) => {
  console.log(
    `Call createPlaylist with playlistName=${playlistName}, video=${video}`,
  );
  try {
    const response = await axios.post(
      `${config.API_PLAYLIST_URL}/api/playlist/`,
      {
        playlist_name: playlistName,
        videos: video,
        username,
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Failed creating playlist, please try again later!'
    }`;
    return new Error(message);
  }
};

export const getPlaylistById = async (id) => {
  console.log(`Call getPlaylistById with id=${id}`);
  try {
    const response = await axios.get(
      `${config.API_PLAYLIST_URL}/api/playlist/`,
      {
        params: {
          id,
        },
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Failed retrieving playlist, please try again later!'
    }`;
    return new Error(message);
  }
};

export const addVideoToPlaylist = async (id, video) => {
  console.log(`Call addVideoToPlaylist with id=${id}, video=${video}`);
  try {
    const response = await axios.put(
      `${config.API_PLAYLIST_URL}/api/playlist/`,
      {
        id,
        videos: video,
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Failed to add video, please try again later!'
    }`;
    return new Error(message);
  }
};

export const deletePlaylist = async (id) => {
  console.log(`Call deletePlaylist with id=${id}`);
  try {
    const response = await axios.delete(
      `${config.API_PLAYLIST_URL}/api/playlist/`,
      {
        params: {
          id,
        },
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Failed to delete playlist, please try again later!'
    }`;
    return new Error(message);
  }
};

export const deleteVideoFromPlaylist = async (id, video) => {
  console.log(`Call deleteVideoFromPlaylist with id=${id}, video=${video}`);
  try {
    const response = await axios.post(
      `${config.API_PLAYLIST_URL}/api/playlist/`,
      {
        id,
        video,
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Failed to delete video, please try again later!'
    }`;
    return new Error(message);
  }
};

export const getAllPlaylistByUser = async (username) => {
  console.log(`Call getAllPlaylistByUser with username=${username}`);
  try {
    const response = await axios.get(
      `${config.API_PLAYLIST_URL}/api/playlist/`,
      {
        params: {
          username,
        },
      },
    );
    return { data: response.data };
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Failed retrieving playlist, please try again later!'
    }`;
    return new Error(message);
  }
};
