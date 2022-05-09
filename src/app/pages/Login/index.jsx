import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { View, Text } from 'react-native-web';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginUser } from 'app/reducers/auth/api';
import styles from 'app/pages/styles';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await loginUser(
      {
        username: data.get('username'),
        password: data.get('password'),
      },
      dispatch,
    );

    if (response instanceof Error) {
      console.log(response);
      setSnackbarMessage(response.message);
      setShowSnackbar(true);
      return;
    }

    navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
    setShowSnackbar(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Welcome to Kami Random!</Text>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login to Kami Random
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{ width: '80vw', bottom: 448 }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </View>
  );
}

export default Login;
