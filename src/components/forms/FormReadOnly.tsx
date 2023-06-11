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



    // const titleElems:React.JSX.Element[] = [];
    // const valueElems:React.JSX.Element[] = [];
    const rowElems = data.map((row,idx) => {

        return (
            <Grid className='form_body__row' item container key={idx}
                p={1}
                sx={{
                    borderBottom: data.length!=idx+1? '1px solid var(--mycolors_white_alt)' : 'unset'
                }}
            >
                <Grid className='form_body__row title_wrap' item
                    md={4} sx={{ ml:{md:1} }}
                >
                    <Typography component="p" variant="subtitle1">
                        {row.title}
                    </Typography>
                </Grid>
                <Grid className='form_body__row value_wrap' item
                    md={7}
                >
                    <Typography component="p" variant="body1">
                        {row.value}
                    </Typography>
                </Grid>
            </Grid>
        )
    });

    // {titleElems}
    // {valueElems}
    return (
    <Grid className='form_body read_only' item container direction="column"
        px={4} py={2}
        sx={{
            backgroundColor: '#fff',
        }}
    >
        {rowElems}
    </Grid>
    )
}
