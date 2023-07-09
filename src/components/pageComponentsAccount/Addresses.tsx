import React from 'react'

import { Box, Typography, Grid, Link, Toolbar, Chip } from "@mui/material";
import { Home as HomeIcon, } from "@mui/icons-material";

import { GridHeader } from "@/components/commons/GridHeader";
import { FormReadOnly } from "@/components/forms/FormReadOnly";
import { ListCard } from "@/components/commons/ListCard";

import { ROUTE_ACCOUNT_ADDRESSES } from "@/lib/common/Constants";

import { AddressesPageProps } from '@/pages/account/addresses';
import { AddressType } from '@/lib/common/Types';

export const Addresses = ({userAddressList, user, ...props }: AddressesPageProps) => {
    const addressList= userAddressList.map( (user_address,idx) => {
        const objData = Object.keys(user_address).map( (objkey:string) => {
            return {title: objkey, value: user_address[objkey as keyof AddressType] }
        });
        // return objData;
        return <Box key={idx}>
            <GridHeader
                mystyle={
                    {xs:{marginBottom: '1rem'}}
                 }
            >

                <Grid container item alignItems="center" md={6}
                    sx={{
                        paddingLeft: '0 !important',
                     }}
                >
                    <Grid item pt={0} xs={0} px={0} mx={0} > <HomeIcon /> </Grid>
                    <Grid item pt={0} xs={10} >
                        <Typography component="span" variant="h6" sx={{ ml: { sm: 2 } }} >
                            {user_address.address1}
                        </Typography>
                    </Grid>
                </Grid>

                {user_address.isDefault &&
                    <Grid container item alignItems="center" md={2} >
                        <Chip label="Default" color="primary"
                            sx={{
                                // backgroundColor: "#1cad1c87",
                                // color: "#21c421",
                                // color: "#2e7d32",
                                // color: "#005804",
                                '& > span':{overflow: "visible"}
                            }}
                        />
                    </Grid>
                }

                <Grid item md={2} pt={0} >
                    <Link href={ROUTE_ACCOUNT_ADDRESSES+user_address.id}>More Details</Link>
                </Grid>

            </GridHeader>

            <ListCard
                mystyle={{ borderBottomLeftRadius: "0.5rem", borderBottomRightRadius: "0.5rem", }}
            >
                <Box ml={1}
                    sx={{
                        display: "flex", flexDirection:"column",
                    }}
                >
                    <Typography component="span" variant="subtitle1" ml={2} >
                        {user_address.city}
                    </Typography>
                    <Typography component="span" variant="subtitle1" ml={2} >
                        {user_address.contact_on_site}
                    </Typography>
                </Box>
            </ListCard>
            {/* <FormReadOnly data={objData} /> */}
        </Box>;
    })
    // const elemList = addressList.map( (data,idx) => {

    // })
    // const data = [
    //     {title: "Email", value: email},
    //     {title: "Password", value: password.split("").map(pwd => '*')},
    //     {title: "Profile Image", value: image},
    // ];
    // const formReadOnlyElems = <FormReadOnly data={data} />

    return (<>
        <h1>Your Addresses</h1>
        {addressList}
    </>)
}
