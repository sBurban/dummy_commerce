import React, {useState} from 'react';
import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { UserPageProps } from "@/lib/common/Types";

import { GridHeader } from "@/components/GridHeader";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";

import { FormReadOnly } from '@/components/forms/FormReadOnly';

type ProfileFormProps = {
    username: string,
    first_name: string,
    last_name: string,
    telephone: string
}


const Profile = ({user, ...props}:UserPageProps) =>{

    const initValue = {
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        telephone: user.telephone || "",
    }

    const [isEdit, setIsEdit] = useState(false);
    const [profileFormData, setProfileFormData] = useState<ProfileFormProps>(initValue);
    console.log("🚀 ~ file: profile.tsx:31 ~ Profile ~ profileFormData:", profileFormData)
    // setProfileFormData(user);
    const {username, first_name, last_name, telephone} = user;

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        console.log("🚀 ~ file: profile.tsx:41 ~ handleSubmit ~ target:", target)
        console.log("🚀 ~ file: profile.tsx:41 ~ handleSubmit ~ target:", target.username)
    }

    const data = [
        {title: "Username", value: username},
        {title: "First Name", value: first_name},
        {title: "Last Name", value: last_name},
        {title: "Telephone", value: telephone},
    ];
    const formReadOnlyElems = <FormReadOnly data={data} />


    const formElem = <>
        <Grid className='form_body editable' item container direction="column"
            px={4} py={2}
            sx={{
                backgroundColor: '#fff',
            }}
        >
            <form className='profileform' onSubmit={handleSubmit}>


            <Grid className='form_body__row' item container
                p={1}
            >
                <Grid className='form_body__row title_wrap' item
                    md={4} sx={{ ml:{md:1} }}
                >
                    <Typography component="p" variant="subtitle1">
                        {"Username"}
                    </Typography>
                </Grid>
                <Grid className='form_body__row value_wrap' item
                    md={7}
                >
                    <TextField id="field_username" name="field_username" fullWidth variant="outlined"
                        defaultValue={username}
                    />
                </Grid>
            </Grid>

            <Grid className='form_body__row' item container
                p={1}
            >
                <Grid className='form_body__row title_wrap' item
                    md={4} sx={{ ml:{md:1} }}
                >
                    <Typography component="p" variant="subtitle1">
                        {"First Name"}
                    </Typography>
                </Grid>
                <Grid className='form_body__row value_wrap' item
                    md={7}
                >
                    <TextField id="field_first_name" name="field_first_name" fullWidth variant="outlined"
                        required
                        defaultValue={first_name}
                    />
                </Grid>
            </Grid>


            <Grid className='form_body__row' item container
                p={1}
            >
                <Grid className='form_body__row title_wrap' item
                    md={4} sx={{ ml:{md:1} }}
                >
                    <Typography component="p" variant="subtitle1">
                        {"Last Name"}
                    </Typography>
                </Grid>
                <Grid className='form_body__row value_wrap' item
                    md={7}
                >
                    <TextField id="field_last_name" name="field_last_name" fullWidth variant="outlined"
                        required
                        defaultValue={last_name}
                    />
                </Grid>
            </Grid>


            <Grid className='form_body__row' item container
                p={1}
            >
                <Grid className='form_body__row title_wrap' item
                    md={4} sx={{ ml:{md:1} }}
                >
                    <Typography component="p" variant="subtitle1">
                        {"Telephone"}
                    </Typography>
                </Grid>
                <Grid className='form_body__row value_wrap' item
                    md={7}
                >
                    <TextField id="field_telephone" name="field_telephone" fullWidth variant="outlined"
                        required
                        defaultValue={telephone}
                    />
                </Grid>
            </Grid>

            <Grid className='form_body__row' item container
                p={1}
            >
                <Button type="submit">
                    Save!
                </Button>
            </Grid>
            </form>
        </Grid>
    </>

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

                    {isEdit? formElem : formReadOnlyElems}
                    {/* {formReadOnlyElems} */}

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