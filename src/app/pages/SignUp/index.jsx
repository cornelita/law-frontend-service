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

import { registerUser } from 'app/reducers/auth/api';
import styles from 'app/pages/styles';

function SignUp() {
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await registerUser({
      first_name: data.get('firstName'),
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
    });

    if (response instanceof Error) {
      setSnackbarMessage(response.message);
      setShowSnackbar(true);
      return;
    }

    navigate('/login');
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
            Let's create an account!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/login">Already have an account? Login</NavLink>
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

export default SignUp;
