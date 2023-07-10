import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

import { ROUTE_LOGIN } from '@/lib/common/Constants';

import { Box, Toolbar } from '@mui/material';
import { SideMenu } from './menus/SideMenu';

const AccountWrapper = ({children}:any) => {
    // const { data: session, status } = useSession();
    // const router = useRouter();
    // if(status === "loading"){
    //     return <>
    //         Session is loading. Please wait a moment
    //     </>
    // }
    // if(!session && status === "unauthenticated"){
    //     // router.push('/api/auth/signin');
    //     router.push(ROUTE_LOGIN);
    //     return <>
    //         You are not Logged In
    //     </>;
    // }

    return (
        <Box sx={{ display: 'flex' }} className='AccountWrapper' >
            <SideMenu />
            <Box component="main" sx={{ flexGrow: 1, p:3 }}>
                {/* <Toolbar /> */}
                {children}
            </Box>
        </Box>
    );
}

export default AccountWrapper;