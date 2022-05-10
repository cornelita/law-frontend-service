import React from 'react';
import { AppBar, Toolbar, Avatar, Button } from '@mui/material';
import { View, Text } from 'react-native-web';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from 'app/commons/styles';
import { logoutUser } from 'app/reducers/auth/api';

import {
  NAVBAR_SECTIONS_WITH_LOGIN,
  NAVBAR_SECTIONS_GENERAl,
} from './constants';

function Navbar(props) {
  const { isUserLoggedIn } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name } = useSelector((state) => state.auth.value);

  const NAVBAR_SECTIONS = isUserLoggedIn
    ? NAVBAR_SECTIONS_GENERAl
    : NAVBAR_SECTIONS_WITH_LOGIN;

  const handleLogout = async () => {
    const response = await logoutUser(dispatch);
    if (response instanceof Error) {
      alert(response.message);
      return;
    }

    navigate('/login');
  };

  return (
    <AppBar sx={{ backgroundColor: '#FFF', paddingLeft: 3, paddingRight: 3 }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar sx={{ marginRight: 2 }}>KR</Avatar>
          <NavLink to="/" style={{ textDecoration: 'unset' }}>
            <Text style={styles.h2}>Kami Random</Text>
          </NavLink>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {NAVBAR_SECTIONS.map((page) => (
            <NavLink
              key={page.path}
              to={`/${page.path}`}
              style={{ textDecoration: 'unset' }}
            >
              <Button sx={{ fontWeight: '700 ' }}>{page.title}</Button>
            </NavLink>
          ))}

          {isUserLoggedIn && (
            <>
              <Button sx={{ fontWeight: '700 ' }} onClick={handleLogout}>
                Logout
              </Button>
              <Button sx={{ fontWeight: '700' }}>Hello, {name} 👋</Button>
            </>
          )}
        </View>
      </Toolbar>
    </AppBar>
  );
}

Navbar.defaultProps = {
  isUserLoggedIn: false,
};

Navbar.propTypes = {
  isUserLoggedIn: PropTypes.bool,
};

export default Navbar;
