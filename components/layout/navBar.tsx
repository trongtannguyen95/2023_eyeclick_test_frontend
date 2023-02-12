import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { useState } from 'react';
import { selectAuthState, selectUserProfile, logout } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
export default function NavBar() {
  const dispatch = useDispatch()
  const router = useRouter()
  const authState = useSelector(selectAuthState)
  const userProfile = useSelector(selectUserProfile)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () =>{
    handleCloseUserMenu()
    dispatch(logout())
    router.push('/')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => { router.push('/') }}>Home</Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {
            !authState && (

              <Button color="inherit" onClick={() => { router.push('/auth/login') }}>Login</Button>

            )
          }
          {
            authState && userProfile && (
              <div>
                <Button color="inherit" onClick={handleOpenUserMenu}>Hi {userProfile.name}</Button>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  <MenuItem key={'Logout'} onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>

            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}