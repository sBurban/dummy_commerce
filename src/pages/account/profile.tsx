import React, {useState} from 'react';
import axios from 'axios'


import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { UserPageProps } from "@/lib/common/Types";


import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";
import { GridHeader } from "@/components/GridHeader";
import { Box, Typography, Button, Alert, AlertTitle } from "@mui/material";


import { FormReadOnly } from '@/components/forms/FormReadOnly';
import { ProfileForm } from '@/components/forms/ProfileForm';

import { ProfileFormData } from '@/lib/common/Types';
import { AlertState, StatusOptions } from '@/lib/common/Types';


const initAlert = {
    status: StatusOptions.ERROR,
    message: "",
    isDisplay: false,
}
const alertTimer = 1000;

const Profile = ({user, ...props}:UserPageProps) =>{

    const [alert, setAlert] = useState<AlertState>(initAlert);
    const [isEdit, setIsEdit] = useState(false);
    const [userSnapshot, setUserSnapshot] = useState(user);

    console.log("🚀 ~ file: profile.tsx:27 ~ Profile ~ userSnapshot:", userSnapshot)

    const {username, first_name, last_name, telephone} = userSnapshot;
    const data = [
        {title: "Username", value: username},
        {title: "First Name", value: first_name},
        {title: "Last Name", value: last_name},
        {title: "Telephone", value: telephone},
    ];
    const formReadOnlyElems = <FormReadOnly data={data} />

    const handleSubmit = async (formData:ProfileFormData) => {
        try {
            const response = await axios.post('/api/forms/profile', {
                id: user.id, ...formData
            });
            console.log("🚀 ~ file: profile.tsx:36 ~ handleSubmit ~ response:", response.data.message);

            setUserSnapshot({...userSnapshot, ...formData});
            setAlert({status: StatusOptions.SUCCESS, message: response.data.message, isDisplay: true});
            setIsEdit(false);
        } catch (error) {
            console.log("🚀 ~ file: profile.tsx:40 ~ handleSubmit ~ error:", error)
        }
    }

    const formElem = <ProfileForm user={userSnapshot} handleSubmit={handleSubmit} />

    const alertElem = alert.isDisplay? <Alert severity={`${alert.status}`}
        onClose={ () => setAlert(initAlert) }
    >
        <AlertTitle>{alert.message}</AlertTitle>
    </Alert> : <></>;


    return <>
        <AccountWrapper>
            <CenteredWrapper>
                <Box>

                    <GridHeader >
                        <Typography component="span" variant="h5" ml={2} >
                            Profile
                        </Typography>
                        <Button variant="outlined" sx={{ marginRight: '0.5rem' }}
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {!isEdit? "Edit" : "Cancel"}
                        </Button>
                    </GridHeader>

                    {alertElem}

                    {isEdit? formElem : formReadOnlyElems}

                </Box>
            </CenteredWrapper>
        </AccountWrapper>
    </>
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
    const check = await isLoginRequiredServer(context);
    if (!check.session) return check;
    const {session} = check;

    try {
        const userEmail = session?.user?.email || "";
        //Get User full object
        const res1 = await fetchUserByEmail(userEmail);
        const user = res1.data;

        return {
            props:{
                user: user,
                session: session
            },
        }

    } catch (error) {
        console.log("[PROFILE_PAGE] ERROR FETCHING DATA FROM SERVER");
    }

    return {
        props: {
          session: session
        },
    };
}

export default Profile;