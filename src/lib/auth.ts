import NextAuth from "next-auth/next";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";

import { redirect } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/router';

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
            }
        })
    ]
}

export async function loginIsRequiredServer(){
    const session = getServerSession(authConfig);
    if(!session) return signIn();
    // if(!session) return redirect("/");
}

// export async function loginIsRequiredClient(){
//     if(typeof window !== "undefined"){
//         const session = useSession();
//         const router = useRouter();
//         if(!session) router.push("/");
//     }
// }