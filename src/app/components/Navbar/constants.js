export const NAVBAR_SECTIONS = [
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

export const NAVBAR_SECTIONS_WITH_LOGIN = NAVBAR_SECTIONS.concat([
  {
    title: 'Sign Up',
    path: 'signup',
  },
  {
    title: 'Login',
    path: 'login',
  },
]);

export const NAVBAR_SECTIONS_WITH_LOGOUT = NAVBAR_SECTIONS.concat([
  {
    title: 'Logout',
    path: 'logout',
  },
]);