import React from 'react'
import { useRouter } from 'next/router'
import { Box,Toolbar,Link,List,ListItem,ListItemButton,ListItemText,ListItemIcon, Divider } from '@mui/material';
import {
  // Home as HomeIcon, Login as LoginIcon, AppRegistration as AppRegistrationIcon,
  Inbox as InboxIcon, Mail as MailIcon,
Settings as SettingsIcon, Person as PersonIcon, LocalShipping as AddressIcon, ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material/';

const drawerWidth = "240";

export const SideMenu = () => {
  const router = useRouter();

  const activeRoute = (routeName:string, currentRoute:string) => {
      return routeName === currentRoute? true : false;
  }

  const routes = [
      {
        id: 1,
        label:'Account',
        path: '/account',
        icon: <SettingsIcon />
      },
      {
        id: 2,
        label: 'Profile',
        path: '/account/profile',
        icon: <PersonIcon />
      },
      {
        id: 3,
        label: 'Addresses',
        path: '/account/addresses',
        icon: <AddressIcon />
      },
      {
        id: 4,
        label: 'Orders',
        path: '/account/orders',
        icon: <ShoppingBagIcon />
      },
  ];



  const trueDrawerWindow = (
    <div className='truedrawer_div'>
        <Toolbar />
        {/* <Divider /> */}
        <List>
            {routes.map((route, index) => (
                <Link href={route.path} key={route.id} sx={{ textDecoration: 'none' }}>
                    {/* <MenuItem selected={activeRoute(route.path, router.pathname)}> */}
                        <ListItem  disablePadding
                            sx={{
                                // background: activeRoute(route.path, router.pathname)? "var(--primary_bar_color)": "none",
                                color: activeRoute(route.path, router.pathname)? "var(--primary_bar_color)": "#333",
                                // borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                                // borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText primary={route.label} sx={{ '& > span':{fontWeight: "600"} }} />
                            </ListItemButton>
                        </ListItem>
                    {/* </MenuItem> */}
                </Link>
            ))}
        </List>
        <Divider />
    </div>
  );



  return (<>
      <Box
          component="nav"
          sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              position: "relative",
          }}
          aria-label="mailbox folders"
      >
          {trueDrawerWindow}
    </Box>
  </>)
}
