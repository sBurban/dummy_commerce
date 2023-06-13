import React from 'react'
import StyledImg from '@/components/StyledImg'
import { Typography, Grid } from '@mui/material'
import storytext from '../data/aboutUsStory';
import CenteredWrapper from '@/components/layouts/CenteredWrapper';

export default function AboutUs() {

    const textElems = storytext.map( (text,i) => {
        return <Typography component="div" variant="body2" key={i} >
            {text}
        </Typography>;
    })

    return (<>
    <CenteredWrapper>

        <Typography component="div" variant="h4" textAlign={"center"}
            sx={{ marginBottom:'2rem' }}
        >
            About us
        </Typography>
        <Grid container direction="column" spacing={2} >
            <Grid item > {textElems[0]} </Grid>
            <Grid item > {textElems[1]} </Grid>
            <Grid item > {textElems[2]} </Grid>
        </Grid>
        <Grid container spacing={2} >
            <Grid item md={6}>
                <StyledImg src={"/clueless.png"} alt="owner" />
            </Grid>
            <Grid item container md={6} direction="column" spacing={2} >
                <Grid item > {textElems[3]} </Grid>
                <Grid item > {textElems[4]} </Grid>
                <Grid item > {textElems[5]} </Grid>
            </Grid>
        </Grid>
        <Grid container direction="column" spacing={2} >
            <Grid item > {textElems[6]} </Grid>
            <Grid item > {textElems[7]} </Grid>
            <Grid item > {textElems[8]} </Grid>
        </Grid>
    </CenteredWrapper>
    </>)
}
