export const NAVBAR_SECTIONS_GENERAl = [
  {
    title: 'Home',
    path: '',
  },
  {
    title: 'Playlist',
    path: 'playlist',
  },
  {
    title: 'Process',
    path: 'process',
  },
];

export const NAVBAR_SECTIONS_WITH_LOGIN = NAVBAR_SECTIONS_GENERAl.concat([
  {
    title: 'Sign Up',
    path: 'signup',
  },
  {
    title: 'Login',
    path: 'login',
  },
]);
