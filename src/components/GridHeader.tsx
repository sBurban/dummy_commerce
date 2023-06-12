import React from 'react'
import { Grid } from '@mui/material'

interface GridHeader {
  justifyContent?: string,
  alignItems?: string,
  mystyle?: {},
  children: any,
  props?: any
}


export const GridHeader = ({
  mystyle,
  justifyContent="space-between", alignItems="center",
  children, ...props
}:GridHeader) => {
  const customStyles = mystyle? mystyle : {};

  return (
    <Grid className='Grid_header'
        container spacing={2} ml={0} mt={2} justifyContent={justifyContent} alignItems={alignItems}
        sx={{
            maxWidth: "100%",
            minHeight: 80,
            maxHeight: 160,
            backgroundColor: "var(--mycolors_white_alt)",
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            border: "1px solid var(--mycolors_white_alt)",
            padding: "0.5rem 0",
            '& > .MuiGrid-item':{
              paddingTop: 0
            },
            '& > *:first-of-type':{ marginLeft: { xs:'0.8rem', md:'2.2rem' } },
            '& > *:last-of-type':{ marginRight: { xs:'0.8rem', md:'2.2rem' } },
            // '& > *:first-child':{ marginLeft: { xs:'0.8rem', md:'2.2rem' } },
            // '& > *:last-child':{ marginRight: { xs:'0.8rem', md:'2.2rem' } },
            ...customStyles
        }}
        {...props}
    >
        {children}
    </Grid>
  )
}
