import React from 'react'
import { useRouter } from 'next/router'
import { ROUTE_ACCOUNT,ROUTE_ACCOUNT_ACCESS,ROUTE_ACCOUNT_ADDRESSES,ROUTE_ACCOUNT_ORDERS } from '@/lib/common/Constants';
import { Box,Toolbar,Link,List,ListItem,ListItemButton,ListItemText,ListItemIcon, Divider } from '@mui/material';
import {
  // Home as HomeIcon, Login as LoginIcon, AppRegistration as AppRegistrationIcon,
  Inbox as InboxIcon, Mail as MailIcon,
Settings as SettingsIcon, Person as PersonIcon, LocalShipping as AddressIcon, ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material/';

const drawerWidth = "240";
const BASE_PATH = "account";
const removeLastChar = (path:string) => {
  return path.slice(0,-1);
};

export const SideMenu = () => {
  const router = useRouter();
  console.log("🚀 ~ file: SideMenu.tsx:15 ~ SideMenu ~ router:", router.pathname)

  const activeRoute = (routeName:string, currentRoute:string) => {
    if(routeName === currentRoute) return true;

    // split by 'account/'
    const extraParams = currentRoute.split("/");
    if(extraParams.length < 3) return false; //Only 'account' matches, and should've being catched earlier

    const mainPath = extraParams[2];
    console.log("🚀 ~ file: SideMenu.tsx:29 ~ activeRoute ~ mainPath:", mainPath)
    if(routeName.indexOf(mainPath) > -1) return true; //Path option includes the 2nd param of Current route
    return false;
  }

  const routes = [
      {
        id: 1,
        label:'Profile',
        path: removeLastChar(ROUTE_ACCOUNT),
        icon: <PersonIcon />
      },
      {
        id: 2,
        label: 'Settings',
        path: removeLastChar(ROUTE_ACCOUNT_ACCESS),
        icon: <SettingsIcon />
      },
      {
        id: 3,
        label: 'Addresses',
        path: removeLastChar(ROUTE_ACCOUNT_ADDRESSES),
        icon: <AddressIcon />
      },
      {
        id: 4,
        label: 'Orders',
        path: removeLastChar(ROUTE_ACCOUNT_ORDERS),
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
                                // background: activeRoute(route.path, router.pathname)? "var(--mycolors_primary)": "none",
                                color: activeRoute(route.path, router.pathname)? "var(--mycolors_primary)": "#333",
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
        {/* <Divider /> */}
    </div>
  );



  return (<>
      <Box className='SideMenu'
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
