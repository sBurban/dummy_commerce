
import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { UserPageProps } from "@/lib/common/Types";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import { GridHeader } from "@/components/GridHeader";
import { FormReadOnly } from "@/components/forms/FormReadOnly";

const Account = ({user, ...props}:UserPageProps) =>{

    const {email, password, image} = user;

    const data = [
        {title: "Email", value: email},
        {title: "Password", value: password.split("").map(pwd => '*')},
        {title: "Profile Image", value: image},
    ];
    const formReadOnlyElems = <FormReadOnly data={data} />

    return <>
        <AccountWrapper>
            <CenteredWrapper>
                {/* <h1>Account Page</h1> */}

                <Box>
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

export default Account;