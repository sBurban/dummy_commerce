import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { UserPageProps } from "@/lib/common/Types";

import { GridHeader } from "@/components/GridHeader";
import { Box, Grid, Typography, Button } from "@mui/material";



const Profile = ({user, ...props}:UserPageProps) =>{
    console.log("🚀 ~ file: profile.tsx:15 ~ Profile ~ user:", user)
    const {username, first_name, last_name, telephone} = user;

    return <>
        <AccountWrapper>
            <CenteredWrapper>
                <h1>Profile Page</h1>

                <Box>

                    <GridHeader >
                        <Typography component="span" variant="h5" ml={2} >
                            Profile
                        </Typography>
                        <Button variant="outlined" sx={{ marginRight: '0.5rem' }}>
                            Edit
                        </Button>
                    </GridHeader>

                    <Grid className="profile_read_only" container
                        direction="column"
                        sx={{

                        }}
                    >


                        <Grid item container>
                            <Grid item container md={6} >
                                <Typography component="span" variant="subtitle1">
                                    Username
                                </Typography>
                                <Typography component="span" variant="subtitle1">
                                    First Name
                                </Typography>
                                <Typography component="span" variant="subtitle1">
                                    Last Name
                                </Typography>
                                <Typography component="span" variant="subtitle1">
                                    Telephone
                                </Typography>
                            </Grid>
                            <Grid item container md={6} >
                                <Typography component="span" variant="body2">
                                    {username}
                                </Typography>
                                <Typography component="span" variant="body2">
                                    {first_name}
                                </Typography>
                                <Typography component="span" variant="body2">
                                    {last_name}
                                </Typography>
                                <Typography component="span" variant="body2">
                                    {telephone}
                                </Typography>
                            </Grid>
                        </Grid>


                    </Grid>

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