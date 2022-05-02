import React from 'react';
import { StyleSheet, View, Text } from 'react-native-web';
import { Route, Routes } from 'react-router';

import Navbar from 'app/components/Navbar';
import Footer from 'app/components/Footer';
import { Homepage, Playlist, Process, SignUp, Login} from 'app/pages'

const s = StyleSheet.create({
  main: {
    paddingTop: 96,
    paddingBottom: 32,
    paddingHorizontal: 48,
    backgroundColor: '#F9F9F9',
  }
});

function App() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default App;