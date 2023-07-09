import React from 'react'
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import { GridHeader } from "@/components/commons/GridHeader";

import { UserPageProps } from "@/lib/common/Types";

import { FormReadOnly } from "@/components/forms/FormReadOnly";


export const Settings = ({user, ...props}:UserPageProps) => {
    const {email, password, image} = user;

    const data = [
        {title: "Email", value: email},
        {title: "Password", value: password.split("").map(pwd => '*')},
        {title: "Profile Image", value: image},
    ];
    const formReadOnlyElems = <FormReadOnly data={data} />


    return (<Box>
        <GridHeader >
            <Typography component="span" variant="h5" ml={2} >
                Account Settings
            </Typography>
            <Button variant="outlined" sx={{ marginRight: '0.5rem' }}
                // onClick={() => setIsEdit(!isEdit)}
            >
                Edit
                {/* {!isEdit? "Edit" : "Cancel"} */}
            </Button>
        </GridHeader>

        {/* {isEdit? formElem : formReadOnlyElems} */}
        {formReadOnlyElems}
    </Box>)
}
