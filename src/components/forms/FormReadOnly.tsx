import React from 'react'

import { Box, Grid, Typography, Button } from "@mui/material";

type DataRow = {
    title: string,
    value: any
}
interface ReadOnlyProps{
    data: DataRow[],
    props?: any
}

export const FormReadOnly = ({data, ...props}:ReadOnlyProps) => {



    const rowElems = data.map((row,idx) => {

        return (
            <Grid className='form_body__row' item container key={idx}
                py={1} ml={0}
                sx={{
                    borderBottom: data.length!=idx+1? '1px solid var(--mycolors_white_alt)' : 'unset',
                    overflowWrap: "break-word",
                }}
            >
                <Grid item className='form_body__row title_wrap'
                    sm={6} md={5} sx={{ ml:{md:1} }}
                >
                    <Typography component="p" variant="subtitle1">
                        {row.title}
                    </Typography>
                </Grid>
                <Grid item className='form_body__row value_wrap'
                    sm={6} md={5}
                >
                    <Typography component="p" variant="body1">
                        {row.value}
                    </Typography>
                </Grid>
            </Grid>
        )
    });


    return (
    <Grid className='form_body form_read_only' item container direction="column"
        py={2}
        sx={{
            backgroundColor: '#fff',
            borderBottomLeftRadius:'0.5rem',
            borderBottomRightRadius:'0.5rem',
            px:{ xs:2, md:4 }
        }}
    >
        {rowElems}
    </Grid>
    )
}
