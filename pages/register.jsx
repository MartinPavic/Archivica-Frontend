import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'
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


const theme = createTheme();

const SignUpContainer = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

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
          <Image src="/assets/images/logo.png" height={100} width={150} />
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            Sign up
          </Typography>
          <form noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onRegister)}>
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
                  error={errors.firstName}
                  helperText={errors.firstName?.message}
                  {
                    ...register("firstName", 
                      {
                      required: "First name is required", 
                    })
                  }
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
                  error={errors.lastName}
                  helperText={errors.lastName?.message}
                  {
                    ...register("lastName", 
                      {
                      required: "Last name is required", 
                    })
                  }
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error= {errors.password}
                  helperText = {errors.password?.message}
                  {
                    ...register("password", {
                      required: "Password is required", 
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                      }
                  })
                  }
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm assword"
                  type="confirmPassword"
                  id="confirmPassword"
                  error= {errors.confirmPassword}
                  helperText = {errors.confirmPassword?.message}
                  {...register("confirm_password", {
                    required: true,
                    validate: (val) => {
                      if (watch('password') != val) {
                        console.log("test")
                        return "Your passwords do no match";
                      }
                    },
                   })}
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={errors.email || errors.password || errors.email || errors.password}
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
  register,
}

export default connect(undefined, mapDispatchToProps)(SignUpContainer)