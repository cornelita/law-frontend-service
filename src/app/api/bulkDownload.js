import config from 'app/config';
import axios from 'axios';

const FileDownload = require('js-file-download');

export const bulkDownload = async (videoIds) => {
  try {
    const response = await axios.post(
      `${config.API_BULK_DOWNLOAD_URL}/bulk-download/`,
      {
        videoIds,
      },
    );
    return response.data;
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Bulk Download failed, please try again later!'
    }`;
    return new Error(message);
  }
};

export const getBulkDownload = async (bulkDownloadId) => {
  try {
    const response = await axios.get(
      `${config.API_BULK_DOWNLOAD_URL}/bulk-download/`,
      {
        params: {
          bulkDownloadId,
        },
        responseType: 'blob',
      },
    );

    return FileDownload(response.data, `video-${Date.now()}.zip`);
  } catch (err) {
    const message = `Error: ${
      err.response?.data?.detail ||
      'Get Bulk Download failed, please try again later!'
    }`;
    return new Error(message);
  }
};
