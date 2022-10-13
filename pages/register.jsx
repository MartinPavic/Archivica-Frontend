import React, { useState } from 'react';
import { connect } from 'react-redux';
import Image from 'next/image'
import Link from 'next/link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import style from '../styles/Sign.module.scss';
import Copyright from '../components/UI/copyright';
import { register } from '../store/actions/authActions';

import Logo from '../assets/images/logo.png';

const theme = createTheme();

const SignUpContainer = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  })

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    })
  } 

  const onRegister = (registerForm) => {
    props.register(registerForm)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="register" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src={Logo} width={100} height={86}/>
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={state.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={state.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={handleChange}
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
                  value={state.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onRegister(state)} 
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" >
                  <a className={style.link}>Already have an account? Sign in</a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ authState }) => ({
  authState
})

const mapDispatchToProps = {
  register,
}

export default connect(undefined, mapDispatchToProps)(SignUpContainer)