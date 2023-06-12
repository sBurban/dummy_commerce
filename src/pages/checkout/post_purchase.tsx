import React from 'react'
import CenteredWrapper from '@/components/layouts/CenteredWrapper'
import { Alert, AlertTitle, Link as MuiLink, Box } from '@mui/material'
import { StatusOptions } from '@/lib/common/Types'
import { ROUTE_ACCOUNT_ORDERS } from '@/lib/common/Constants'
import { Carrousel } from '@/components/cards/Carrousel'

export default function PostPurchase(){
  return (<>
    <CenteredWrapper>

        {/* <div>PostPurchase</div> */}
        <Box sx={{
            height: "80vh",
            display:"flex", flexDirection:"column", justifyContent:"space-around"
         }}>
            <Alert severity={`${StatusOptions.SUCCESS}`}>
                <AlertTitle>Thank you for your purchase!</AlertTitle>
                Please check your email for confirmation of your purchase. (not implemented)
                <br />
                You can check your Order status on the
                <MuiLink href={ROUTE_ACCOUNT_ORDERS}> Orders page</MuiLink>
                .
            </Alert>
            {Carrousel({title:"You might also be interested in: ", category: "jewelery"})}
        </Box>

    </CenteredWrapper>
  </>)
}
