import React from 'react'
import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from '@/lib/auth';
import { fetchUserByEmail } from '@/lib/mongoDB/userQueries';

export default function SingleCheckout() {
  return (
    <div>SingleCheckout Page</div>
  )
}

// export async function getServerSideProps(context:GetServerSidePropsContext) {
//     const check = await isLoginRequiredServer(context);
//     if (!check.session) return check;
//     const {session} = check;

//     try {
//         const userEmail = session?.user?.email || "";
//         //Get User full object
//         const res1 = await fetchUserByEmail(userEmail);
//         const user = res1.data;

//         // const res2 =

//         return {
//             props:{
//                 user: user,
//                 session: session
//             },
//         }

//     } catch (error) {
//         console.log("[PROFILE_PAGE] ERROR FETCHING DATA FROM SERVER");
//     }

//     return {
//         props: {
//           session: session
//         },
//     };
// }