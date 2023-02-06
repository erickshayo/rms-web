import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {useMediaQuery, useTheme} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Header from './Header';



function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
          Resident Management
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
  }

const drawerWidth = 256;

function Layout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
  
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
            />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
              <Outlet/>
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
              <Copyright />
            </Box>
          </Box>
        </Box>
    );
}

export default Layout