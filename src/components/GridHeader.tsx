import React from 'react'
import { Grid } from '@mui/material'

export const GridHeader = ({children, ...props}:any) => {
  const contentJustified = props.justifyContent? props.justifyContent : "space-between";
  const itemAlignment = props.alignItems? props.alignItems : "flex-start";
  const customStyles = props.mystyle? props.mystyle : {};

  return (
    <Grid container spacing={2} ml={0} mt={2} justifyContent={contentJustified} alignItems={itemAlignment}
        sx={{
            maxWidth: "100%",
            maxHeight: 160,
            backgroundColor: "var(--mycolors_white_alt)",
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            border: "1px solid var(--mycolors_white_alt)",
            padding: "0.5rem 0",
            ...customStyles
        }}
        {...props}
    >
        {children}
    </Grid>
  )
}
