import React from 'react';
import { AppBar, Toolbar, Avatar, Button } from '@mui/material';
import { View, Text } from 'react-native-web'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from 'app/commons/styles';

import { NAVBAR_SECTIONS_WITH_LOGIN, NAVBAR_SECTIONS_WITH_LOGOUT } from './constants';

function Navbar(props) {
  const { isUserLoggedIn } = props;

  const NAVBAR_SECTIONS = isUserLoggedIn ? NAVBAR_SECTIONS_WITH_LOGOUT : NAVBAR_SECTIONS_WITH_LOGIN;

  return (
    <AppBar sx={{ backgroundColor: '#FFF', paddingLeft: 3, paddingRight: 3 }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar sx={{ marginRight: 2 }}>KR</Avatar>
            <NavLink to="/" style={{ textDecoration: 'unset' }}>
              <Text style={styles.h2}>
                Kami Random
              </Text>
            </NavLink>
          </View>

          <View style={{ flexDirection: 'row' }}>
            {NAVBAR_SECTIONS.map((page) => (
              <NavLink
                key={page.path}
                to={`/${page.path}`}
                style={{ textDecoration: 'unset' }}
              >
                <Button sx={{ fontWeight: '700 '}}>{ page.title }</Button>
              </NavLink>
            ))}

            {isUserLoggedIn && <Button sx={{ fontWeight: '700' }}>Hello, Name 👋</Button>}
          </View>
      </Toolbar>
    </AppBar>
  )
}

Navbar.defaultProps = {
  isUserLoggedIn: false,
};

Navbar.propTypes = {
  isUserLoggedIn: PropTypes.bool,
};

export default Navbar;