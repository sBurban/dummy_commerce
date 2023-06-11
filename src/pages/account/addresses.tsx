import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { dbFindFromCollection } from "@/lib/mongoDB/mongoQueries";
import { TABLE_USER_ADDRESS } from "@/lib/dbTables";
import { AddressType, UserPageProps } from "@/lib/common/Types";

import { Box, Typography } from "@mui/material";
import { GridHeader } from "@/components/GridHeader";
import { FormReadOnly } from "@/components/forms/FormReadOnly";
import Link from "next/link";

type AddressesPageProps = {
    userAddressList: AddressType[],
} & UserPageProps

const Addresses = ({userAddressList, user, ...props }: AddressesPageProps) =>{


    const addressList= userAddressList.map( (user_address,idx) => {
        const objData = Object.keys(user_address).map( (objkey:string) => {
            return {title: objkey, value: user_address[objkey as keyof AddressType] }
        });
        // return objData;
        return <Box key={idx}>
            <GridHeader>
                <Typography component="span" variant="h5" ml={2} >
                    Address: {user_address.address1}
                </Typography>
                <Link href={"/account/addresses/"+user_address.id}>More Details</Link>
            </GridHeader>
            <FormReadOnly data={objData} />
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

    return <>
        <AccountWrapper>
            <CenteredWrapper>
                <h1>Addresses Page</h1>
                {addressList}
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

        //Get Orders belonging to the connected User
        const queryFilter = { query:{ user_id:user.id } };
        const res2 = await dbFindFromCollection(TABLE_USER_ADDRESS, queryFilter)
        const userAddresses = res2.data;

        return {
            props:{
                user: user,
                userAddressList: userAddresses,
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

export default Addresses;