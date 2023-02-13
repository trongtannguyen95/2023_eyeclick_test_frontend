import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { logout, selectAuthState, selectUserProfile } from "../../store/authSlice";
import { setSearch } from '../../store/systemSlice';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function NavBar() {
  const dispatch = useDispatch()
  const router = useRouter()
  const authState = useSelector(selectAuthState)
  const userProfile = useSelector(selectUserProfile)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [search, setSearchState] = useState('')
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const checkSearch = (e: any) => {
    if (e.which === 13) {
      // router.push('/?search=' + encodeURIComponent(search))
      dispatch(setSearch(search))
    }
  }
  const handleLogout = () => {
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
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={search}
            onChange={(e) => { setSearchState(e.target.value) }}
            onKeyUp={checkSearch}
          />
        </Search>
        <Box sx={{ flexGrow: 0, ml: 1 }}>
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

                  <MenuItem key={'ShoppingCart'} onClick={() => { router.push('/shop/shopping-cart') }}>
                    <Typography textAlign="center">Shopping Cart</Typography>
                  </MenuItem>
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