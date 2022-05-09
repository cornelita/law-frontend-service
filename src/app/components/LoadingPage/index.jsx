import React from 'react';
import { Text } from 'react-native-web';

import { Box, CircularProgress } from '@mui/material';

import styles from 'app/commons/styles';

function LoadingPage() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(210, 214, 237, 0.2)',
      }}
    >
      <Text style={styles.h1}>Please Wait</Text>
      <CircularProgress sx={{ marginTop: 4 }} color="inherit" />
    </Box>
  );
}

export default LoadingPage;
