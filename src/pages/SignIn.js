import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginAuth } from '../redux/features/authSlice';
import { useLoginMutation } from '../redux/features/authApiSlice';


function SignIn() {
  //const useRef = React.useRef();
  const errRef = React.useRef();
  const [errorMsg, setErrorMsg] = React.useState();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('username');
    let password = data.get('password')
    console.log(username);
    console.log(password);
    try {
      const userData = await login({ username, password }).unwrap();
      console.log(userData);
      dispatch(loginAuth({ ...userData, username }))
      username = "";
      password = "";
      if (userData.msg==="Invalid username or password") {
        navigate('/SignIn');
      } else {
        localStorage.setItem('is_admin', userData.user.is_staff)
        localStorage.setItem('user_id', userData.user.id)
        localStorage.setItem('citizen_id', userData.user.citizen)
        navigate('/Dashboard');
      }
    } 
    catch (error) {
      if (!error?.respose) {
        setErrorMsg("No server respose try again later");
      } else if (error.respose?.status === 401) {
        setErrorMsg("incorrect password or email ");
      } else {
        setErrorMsg("login failed try again later");
      }

      errRef.current.focus();
    }

  };

  return (
    isLoading ? <h3>Loading....</h3> : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Leader Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Signing In is only for the leaders with official details
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  ))
}
export default SignIn