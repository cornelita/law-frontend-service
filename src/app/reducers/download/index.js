import { createSlice } from '@reduxjs/toolkit';

export const initialDownloadState = {
  download: [],
  bulkDownload: [],
};

export const downloadSlice = createSlice({
  name: 'download',
  initialState: {
    value: initialDownloadState,
  },
  reducers: {
    addDownload: (state, action) => {
      state.value.download.push(action.payload);
    },
    addBulkDownload: (state, action) => {
      state.value.bulkDownload.push(action.payload);
    },
    removeDownload: (state, action) => {
      const idx = state.value.download.indexOf(action.payload);
      state.value.download.splice(idx, 1);
    },
    removeBulkDownload: (state, action) => {
      const idx = state.value.bulkDownload.indexOf(action.payload);
      state.value.bulkDownload.splice(idx, 1);
    },
  },
});

export const {
  addDownload,
  addBulkDownload,
  removeDownload,
  removeBulkDownload,
} = downloadSlice.actions;

export default downloadSlice.reducer;
