import config from 'app/config';
import axios from 'axios';

const FileDownload = require('js-file-download');

export const download = async (videoId) => {
  try {
    const response = await axios.post(
      `${config.API_DOWNLOAD_URL}/download/video`,
      {
        videoId,
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.description ||
      'Download failed, please try again later!'
    }`;
    return new Error(message);
  }
};

export const getDownload = async (videoId) => {
  try {
    const response = await axios.get(
      `${config.API_DOWNLOAD_URL}/download/video`,
      {
        params: {
          videoId,
        },
      },
      {
        responseType: 'blob',
      },
    );
    FileDownload(response.data, `video-${Date.now()}.zip`);
    return response;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.description ||
      'Get Download failed, please try again later!'
    }`;
    return new Error(message);
  }
};
