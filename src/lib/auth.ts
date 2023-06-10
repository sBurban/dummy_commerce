import NextAuth from "next-auth/next";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";

import { redirect } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { ROUTE_LOGIN } from "./common/Constants";

import { Session } from 'next-auth';
import JWT from 'next-auth'

type CustomSession = Session & {id:number};

export const authConfig:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Sign in",
            credentials:{
                email:{
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                    //Configured so I don't need to manually type each Login attempt while testing
                    value: "test@testing.com"
                },
                password:{
                    label:"Password",
                    type:"password",
                    //Configured so I don't need to manually type each Login attempt while testing
                    value:"password"
                }
            },
            // 'authorize' returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            async authorize(credentials){
                if(!credentials || !credentials.email || !credentials.password){
                    return null;
                }

                try {
                    const response = await fetchUserByEmail(credentials.email);
                    // const user:UserType = response.data;
                    const user = response.data;
                    if(user){
                        return user;
                    }
                } catch (error) {
                    console.log("🚀 ~ file: [...nextauth].ts:37 ~ authorize ~ error:", error)
                    return null;
                }

                return null;
            },

        })
    ],
    // callbacks: {
    //     session: async (params) => {
    //         const session = params.session as any;
    //         console.log("🚀 ~ file: auth.ts:65 ~ session: ~ session:", session)
    //         const user = params.user as any;
    //         console.log("🚀 ~ file: auth.ts:67 ~ session: ~ user:", user)
    //         const token = params.token as any;
    //         console.log("🚀 ~ file: auth.ts:65 ~ session: ~ token:", token)
    //         // Add a new field to the session object
    //         // session.id = user.id;

    //         return Promise.resolve(session);
    //     },
    // },
}

export async function isLoginRequiredServer(context:GetServerSidePropsContext){
    console.log("🚀 ~ file: auth.ts:77 ~ isLoginRequiredServer ~ isLoginRequiredServer:")
    const session = await getServerSession(context.req, context.res, authConfig);
    // If the user is not authenticated, redirect to the login page
    if (!session) {
        return {
            redirect: {
                destination: ROUTE_LOGIN,
                permanent: false,
            },
        };
    }
    return {
        session: session
    };
}

// export async function loginIsRequiredServer(context:GetServerSidePropsContext){
//     const session = getServerSession(context.req, context.res, authConfig);
//     if(!session) return signIn();
//     // if(!session) return redirect("/");
// }

// export async function loginIsRequiredClient(){
//     if(typeof window !== "undefined"){
//         const session = useSession();
//         const router = useRouter();
//         if(!session) router.push("/");
//     }
// }