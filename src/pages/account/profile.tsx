import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

import { GridHeader } from "@/components/GridHeader";
import { Box, Grid, Typography, Button } from "@mui/material";

const Profile = () =>{
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

                        sx={{

                        }}
                    >
                        <Grid item container direction="column" >

                        </Grid>
                        <Grid item container direction="column" >

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

    return {
        props: {
          session: session
        },
    };
}

export default Profile;