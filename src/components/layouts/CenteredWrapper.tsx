import React from 'react';
import { Grid } from '@mui/material'

export default function CenteredWrapper({children}:any){
    return (
        <Grid container
            mt={5}
            direction="column"
            alignItems="center"
            sx={{
                margin: '1rem auto',
                width: "60%",
                minheight: "100vh",
                // backgroundColor: "#fff"
            }}
        >
            <Grid
                // // container
                // // spacing={2}
                // justifyContent="space-between"
                // alignItems="flex-start"
                // ml={0}
                sx={{
                    width: "100%",
                    height: "100%",
                    // backgroundColor: '#f0f0f0',
                    // '& > *':{
                    //     marginTop: "1.5rem"
                    // }
                }}
            >
                {children}
            </Grid>
        </Grid>
    );

}