import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { dbFindFromCollection } from "@/lib/mongoDB/mongoQueries";
import { TABLE_USER_ADDRESS } from "@/lib/common/dbTables";
import { AddressType, UserPageProps } from "@/lib/common/Types";

import { Addresses } from "@/components/pageComponentsAccount/Addresses";


export type AddressesPageProps = {
    userAddressList: AddressType[] | [],
} & UserPageProps

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


export default function AddressesPage({userAddressList, user, ...props }: AddressesPageProps){

    return <>
        <AccountWrapper>
            <CenteredWrapper mySize="long">
                <Addresses
                    {...{
                        userAddressList,
                        user,
                    }}
                />
            </CenteredWrapper>
        </AccountWrapper>
    </>
}

