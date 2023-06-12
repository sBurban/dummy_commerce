import React from 'react'
import { Paper, Grid } from '@mui/material'

interface ListCard {
  mystyle?: {},
  children: any,
  props?: any
}

export const ListCard = ({mystyle, children,...props}:ListCard) => {
  const customStyles = mystyle? mystyle : {};

  return (
    <Paper className='listcard'
        variant="outlined"
        elevation={0}
        square
        sx={{
            p: 2,
            // margin: 'auto',
            // maxWidth: 600,
            flexGrow: 1,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...customStyles
        }}
    >
        {children}
    </Paper>
  )
}
