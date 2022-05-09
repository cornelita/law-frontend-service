import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Text } from 'react-native-web';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { runLogoutTimer } from 'app/reducers/auth';
import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';
import { Homepage, Playlist, Process, SignUp, Login } from 'app/pages';

const s = StyleSheet.create({
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  main: {
    paddingTop: 96,
    paddingBottom: 32,
    paddingHorizontal: 48,
    backgroundColor: '#F9F9F9',
    flex: '1 0 auto',
  },
});

function App() {
  const dispatch = useDispatch();
  const { token, expiry } = useSelector((state) => state.auth.value);

  runLogoutTimer(dispatch, expiry);
  axios.defaults.headers.common.Authorization = `Token ${token}`;

  return (
    <View style={s.bodyContainer}>
      <Navbar isUserLoggedIn={token !== ''} />
      <View style={s.main}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/process" element={<Process />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Text>Page Not Found!</Text>} />
        </Routes>
      </View>
      <Footer />
    </View>
  );
}

export default App;
