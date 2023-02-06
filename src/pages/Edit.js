import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { People } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddDetailsMutation } from '../redux/features/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useWilayasMutation } from '../redux/features/authApiSlice';
import { selectCurrentToken } from '../redux/features/authSlice';

export default function Content() {
  const useRef = React.useRef();
  const errRef = React.useRef();
  const [errorMsg, setErrorMsg] = React.useState();
  const navigate = useNavigate();
  const [wilayaDta, setWilayaData] = React.useState([]);
  const [kataData, setKataData] = React.useState([]);
  const [mtaaData, setMtaaData] = React.useState([]);
  const [firstname, setFirstName] = React.useState();
//   const [userInfo, setUserInfo] = React.useState({});
  const [userInfo, setUserInfo] = React.useState({});
  const token = useSelector(selectCurrentToken);


  const [addDetails, { isLoading }] = useAddDetailsMutation();
  const dispatch = useDispatch();

    
  React.useEffect(() => {
    // const params = useParams()

    // console.log(params);
  
    fetch("http://127.0.0.1:8000/app/citizen/" + "1", {
      method:"GET",
      headers:{
        "content-type":"application/json",
        // "authorization":`Bearer ${token}`
      }
    }).then((res) => res.json()).then(
        (data) => {
        //   setCitizens(data)
            setUserInfo(data)
            setFirstName(data.firstname)
          console.log(data);
          getWilaya()
        }
      )
   
  }, [])
  const getWilaya = () => {
    fetch("http://127.0.0.1:8000/app/wilaya", {
    method:"GET",
      headers:{
        "content-type":"application/json",
        // "authorization":`Bearer ${token}`
      }
    }).then((res) => res.json()).then(
      (data) => {
        setKataData(data.kata)
        console.log(data);
        console.log(userInfo);
        console.log(firstname);
      }
    )
  }
  const getKata = (wilaya_id) => {
    fetch("http://127.0.0.1:8000/app/kata/" + wilaya_id, {
    method:"GET",
      headers:{
        "content-type":"application/json",
        // "authorization":`Bearer ${token}`
      }
    }).then((res) => res.json()).then(
      (data) => {
        setKataData(data.kata)
        console.log(data);
      }
    )
  }

  const getMtaa = (kata_id) => {
    fetch("http://127.0.0.1:8000/app/mtaa/" + kata_id, {
    method:"GET",
      headers:{
        "content-type":"application/json",
        // "authorization":`Bearer ${token}`
      }
    }).then((res) => res.json()).then(
      (data) => {
        setMtaaData(data.mtaa)
        console.log(data);
      }
    )
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let nida = data.get('nida');
    let firstname = data.get('firstname');
    let lastname = data.get('lastname');
    let mtaa =  data.get('mtaa');
    let kata = data.get('kata');
    let wilaya = data.get('wilaya');
    const gender = data.get('gender');
    const phone_no = data.get('phonenumber');
    const house_no = data.get('housenumber')
    const email = data.get('email')
    console.log(mtaa);
    const payload = {
        nida: data.get('nida'),
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        mtaa:  data.get('mtaa'),
        kata: data.get('kata'),
        wilaya: data.get('wilaya'),
        gender: data.get('gender'),
        phone_no: data.get('phonenumber'),
        house_no: data.get('housenumber'),
        email: data.get('email')
    }
    
    fetch("http://127.0.0.1:8000/app/citizen", {
        method:"POST",
        data: payload,
        headers:{
          "content-type":"application/json",
          // "authorization":`Bearer ${token}`
        }
      }).then((res) => res.json()).then(
        (data) => {
          setWilayaData(data)
          console.log(data);
        }
      )

  };
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
      </AppBar>
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
            <People />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add up your details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nida"
                  label="Nida Number"
                  name="nida"
                  type="number"
                  defaultValue={userInfo.nida}
                  autoComplete="Nida Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  defaultValue={firstname}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} >
                <FormControl sx={{ display: "flex" }}>
                  <Typography id="demo-row-radio-buttons-group-label" sx={{ textAlign: "left" }}>Gender</Typography>
                  <RadioGroup required
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                  >
                    <FormControlLabel value="F" control={<Radio />} label="Female" />
                    <FormControlLabel value="M" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phonenumber"
                  label="Phone Number"
                  type="tel"
                  id="phonenumber"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl >
                  <InputLabel id="demo-simple-select-autowidth-label">District</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{ width: "400px" }}
                    name="wilaya"
                    label="Distsrict"
                    onChange={(e) => {
                      console.log(e);
                      getKata(e.target.value)
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {wilayaDta?.map((i) => {
                      return <MenuItem value={i.id}>{i.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl >
                  <InputLabel id="demo-simple-select-autowidth-label">Ward</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{ width: "400px" }}
                    label="Ward"
                    name="kata"
                    onChange={(e) => {
                      console.log(e);
                      getMtaa(e.target.value)
                    }}
                  >
                    {kataData?.map((i) => {
                      return <MenuItem value={i.id}>{i.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl >
                  <InputLabel id="demo-simple-select-autowidth-label">Street Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{ width: "400px" }}
                    label="StreetName"
                    name="mtaa"
                  >
                    {mtaaData?.map((i) => {
                      return <MenuItem value={i.id}>{i.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="housenumber"
                  label="House Number"
                  name="housenumber"
                  type="number"
                  autoComplete="house-number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add details
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
