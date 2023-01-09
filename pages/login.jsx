import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';

import Image from 'next/image'
import Link from 'next/link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import style from '../styles/Sign.module.scss';
import Copyright from '../components/UI/copyright';

import { login } from '../store/actions/authActions';

const theme = createTheme();

const LoginContainer = (props) => {
  const router = useRouter()
  const user = localStorage.getItem('user')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onLogin = (loginForm) => {
    return props.login(loginForm).then(() => {
      if(true) {
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl)
      }
    })
  }
  // check if user is already logged in
  if(user) {
    router.push('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="register" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src="/assets/images/logo.png" width={150} height={100}/>
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onLogin)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errors.email}
              helperText={errors.email?.message}
              {
                ...register("email", 
                  {
                  required: "E-mail address is required", 
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid e-mail address"
                  }
                })
              }
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
              error= {errors.password}
              helperText = {errors.password?.message}
              {
                ...register("password", {required: "Password is required"})
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={errors.email || errors.password}
            >

              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" >
                  <a className={style.link}>Don't have an account? Sign Up</a>
                </Link>
              </Grid>
            </Grid>
          </form>
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
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)