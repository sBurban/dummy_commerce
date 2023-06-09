import AccountWrapper from "@/components/layouts/AccountWrapper";

import { authConfig } from "@/lib/auth";
// import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { ROUTE_LOGIN } from "@/lib/common/Constants";


const Orders = () =>{
    return <>
    <AccountWrapper>
        <h1>Orders Page</h1>
    </AccountWrapper>
    </>
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authConfig);
    // const session = await getServerSession(context.req, context.res, authOptions);
    console.log("🚀 ~ file: orders.tsx:19 ~ getServerSideProps ~ session:", session);



    // If the user is not authenticated, redirect to the login page
    if (!session) {
      return {
        props:{},
        // redirect: {
        //   destination: ROUTE_LOGIN,
        //   permanent: false,
        // },
      };
    }

    // Fetch additional session-related data using the session object
    // const user = await fetchUserData(session.user.id);

    return {
      props: {
        // user,
      },
    };
}

export default Orders;


