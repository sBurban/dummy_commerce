import React from 'react'
import { Grid } from '@mui/material'

export const GridHeader = ({children, ...props}:any) => {
  return (
    <Grid container spacing={2} ml={0} mt={2} justifyContent="space-between" alignItems="flex-start"
        sx={{
            maxWidth: "100%",
            maxHeight: 80,
            backgroundColor: "var(--mycolors_white_alt)",
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            border: "1px solid var(--mycolors_white_alt)",
            padding: "0.5rem 0",
        }}
        {...props}
    >
        {children}
    </Grid>
  )
}
