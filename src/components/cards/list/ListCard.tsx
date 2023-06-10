import React from 'react'
import { Paper, Grid } from '@mui/material'

// enum Variant {
//     long = "100%",
//     normal = "60%",
// }
interface ListCard {
  // variant?: Variant,
  sx?: any,
  children: any,
  props?: any
}
// export default function ListCard({children,
//     variant=Variant.normal,
// ...props}:ListCard){

export const ListCard = ({sx, children,...props}:ListCard) => {

  return (
    <Paper
        variant="outlined"
        elevation={0}
        square
        sx={{
            p: 2,
            // margin: 'auto',
            // maxWidth: 600,
            flexGrow: 1,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...sx
        }}
    >
        {children}
    </Paper>
  )
}
