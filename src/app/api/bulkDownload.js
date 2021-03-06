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
    let responseMessage;
    if (err.response?.data) {
      responseMessage = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(JSON.parse(e.target.result));
        };

        reader.onerror = reject;
        reader.readAsText(err.response.data);
      });
    }
    const message = `Error: ${
      responseMessage?.detail ||
      'Get Bulk Download failed, please try again later!'
    }`;
    return new Error(message);
  }
};
