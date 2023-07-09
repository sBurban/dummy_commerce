import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useRouter } from 'next/router';

import CenteredWrapper from '@/components/layouts/CenteredWrapper'
import { Grid, Typography, Link as Muilink } from '@mui/material'
import { Carrousel } from '@/components/commons/Carrousel'
import capitalizeFirst from '@/lib/utils/capitalizeFirst'
import { ROUTE_ABOUT_US } from '@/lib/common/Constants';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();


  const categories = ["men's clothing", "jewelery", "electronics", "women's clothing",]
  const elems = categories.map( category => {
    return Carrousel({title: capitalizeFirst(category), category: category});
  })

  return (
    <>
    <CenteredWrapper mySize='long'>
      <Grid container direction="column" justifyContent={"space-between"}
        sx={{
          '& > .MuiGrid-item':{
            margin: '2rem 0'
          }
         }}
      >
        <Typography component="div" variant="h3" >Welcome!</Typography>
        <Typography component="div" variant="h6" >
            Would you like to know more about us?
          <Muilink href={ROUTE_ABOUT_US} >Click here!</Muilink>
        </Typography>

        {elems}
      </Grid>

    </CenteredWrapper>
    </>
  )

}


// import { useSession, signIn, signOut } from "next-auth/react"
// const { data: session } = useSession();
// if(session){
//   console.log("Signed In: ", session);
//   return <>
//     Signed in as {session.user?.email || "Nobody"} <br />
//     <button onClick={() => signOut()}> Sign Out</button>
//   </>
// }
{/* Not signedin <br />
<button onClick={() => signIn()}>Sign In</button> */}