import React from 'react';
import { Box } from '@mui/system';

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

import { ROUTE_LOGIN } from '@/lib/common/Constants';
import { WrapperProps } from '@/lib/common/Types';

const AccountWrapper = ({children}:any) => {
// const AccountWrapper = ({children}:WrapperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    // console.log("🚀 ~ file: AccountWrapper.tsx:13 ~ //AccountWrapper ~ status:", status)
    // console.log("🚀 ~ file: AccountWrapper.tsx:12 ~ AccountWrapper ~ session:", session)

    if(status === "loading"){
        return <>
            Session is loading. Please wait a moment
        </>
    }

    if(!session && status === "unauthenticated"){
        // router.push('/api/auth/signin');
        router.push(ROUTE_LOGIN);
        return <>
            You are not Logged In
        </>;
    }

    return (
        <>
            {children}
        </>
    );
}

export default AccountWrapper;