import React from 'react';
import { Grid } from '@mui/material'

enum WidthSize {
    "normal" = "60%",
    "long" = "80%",
    "full" = "100%"
}

interface WrapperProps{
    children?: any,
    mySize?: keyof typeof WidthSize,
}

export default function CenteredWrapper({ mySize, children }:WrapperProps){
    const wrapperWidth = mySize? WidthSize[mySize] : WidthSize.normal;

    return (
        <Grid className='CenteredWrapper'
            container
            mt={5}
            direction="column"
            alignItems="center"
            sx={{
                margin: '1rem auto 0 auto',
                width: `${wrapperWidth}`,
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