import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

const s = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 13,
    boxShadow: '0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
  }
});

function Footer() {
  return (
    <View style={s.footer}>
      <Text style={{ textAlign: 'center', font: 'inherit' }}>© Copyright 2022 Kami Random</Text>
    </View>
  )
}

export default Footer;