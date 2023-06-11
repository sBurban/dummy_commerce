import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession();
  if(session){
    console.log("Signed In: ", session);
    return <>
      Signed in as {session.user?.email || "Nobody"} <br />
      <button onClick={() => signOut()}> Sign Out</button>
    </>
  }

  return (
    <>
      Not signedin <br />
      <button onClick={() => signIn()}>Sign In</button>
    </>
  )

}
