import { YOUTUBE_VIDEOS } from './constants';

export const generateRandomVideo = () => {
  return YOUTUBE_VIDEOS[Math.floor(Math.random() * YOUTUBE_VIDEOS.length)];
};
