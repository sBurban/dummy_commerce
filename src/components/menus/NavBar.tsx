import {useState} from 'react'
import { Box,Typography,Toolbar,Link,IconButton,Badge,Paper,InputBase } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import {
    // Menu as MenuIcon, Mail as MailIcon, Notifications as NotifyIcon,
    AccountCircle, Search as SearchIcon, MoreVert as MoreIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import Image from 'next/image';
import { styled, alpha } from '@mui/material/styles';

const SearchParent = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '600px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    // width: 'auto',
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Img = styled('img')({
    // margin: 'auto',
    // display: 'block',
    // maxWidth: '100%',
    // maxHeight: '100%',
    // borderRadius: "50%",
    // backgroundColor: "#fff",
});

export const NavBar = ({onSearchSubmit, ...props}:any) => {
  const [searchText, setSearchText] = useState("");
  const handleText = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    // console.log("🚀 ~ file: NavBar.tsx:73 ~ handleText ~ target:", target.value)
    setSearchText(target.value);
  }

// console.log("🚀 ~ file: NavBar.tsx:15 ~ NavBar ~ props:", props)
    const router = useRouter();
    const { data: session, status } = useSession();
    // console.log("🚀 ~ file: NavBar.tsx:31 ~ NavBar ~ session:", session)

    const [anchorElemem, setAnchorElemem] = useState<any|null>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<any|null>(null);
    const isMenuOpen = Boolean(anchorElemem);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMenuClose = () => {
        setAnchorElemem(null);
    };
    const handleProfileMenuOpen = (event:any) => {
        setAnchorElemem(event.currentTarget);
    };
    const handleMobileMenuOpen = (event:any) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const handleAccountButton = () => {
        router.push('/account');
        handleMenuClose();
    }
    const handleProfileButton = () => {
        router.push('/account/profile');
        handleMenuClose();
    }


    const profileElement = !session? <AccountCircle />
    : <Paper sx={{ width: '3rem', height: '3rem' }}>
      <Img alt="profile image" src={session?.user?.image || "#"} />
    </Paper>


    const menuId = 'navbar-account-menu';
    const renderProfileMenu = (
        <Menu
          anchorEl={anchorElemem}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleAccountButton}>Account</MenuItem>
          <MenuItem onClick={handleProfileButton}>Profile</MenuItem>
          {session?
            <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
            :<MenuItem onClick={() => signIn()}>Sign In</MenuItem>
          }

        </Menu>
    );



    const mobileMenuId = 'navbar-account-menu-mobile';
    const renderMobileProfileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >

          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 4 items in cart"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Shopping Cart</p>
          </MenuItem>

          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              {profileElement}
            </IconButton>
            <p>Profile</p>
          </MenuItem>


        </Menu>
      );




    return (
        <Box sx={{ flexGrow: 1 }} className='Navbar' >
          <AppBar position="static">
            <Toolbar>

                {/* Left side of the NavBar */}

                <Link href={"/"}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', color: '#fff' } }}
                    >
                        Duhmmerce
                    </Typography>
                </Link>

                <SearchParent className='search_box_parent'>
                    {/* <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper> */}
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchText}
                        onChange={handleText}
                    />
                    <IconButton
                        // size="large"
                        aria-label="searchbar button"
                        sx={{
                          backgroundColor: "#febd69",
                          color: "#333",
                          borderRadius: "unset",
                          '&:hover':{
                            backgroundColor: "#f3a847"
                          }
                        }}
                        onClick={() => onSearchSubmit(searchText)}
                    >
                      <SearchIcon />
                    </IconButton>
                </SearchParent>


                {/* Creates space between left and right of the NavBar */}
                <Box sx={{ flexGrow: 1 }} />


                {/* Right-side of NavBar. Starts here */}

                {/* Box displayed on bigger screen sizes. Controls normal menu*/}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                        size="large"
                        aria-label="show 4 items in cart"
                        color="inherit"
                    >
                        <Badge badgeContent={4} color="error">
                        <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        {profileElement}
                    </IconButton>
                </Box>

                {/* Box displayed on smaller screen sizes. Controls Mobile Menu */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </Box>

            </Toolbar>
          </AppBar>
          {renderMobileProfileMenu}
          {renderProfileMenu}
        </Box>
    );
}
