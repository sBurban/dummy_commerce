
import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

import { UserPageProps } from "@/lib/common/Types";

import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { Settings } from "@/components/pageComponentsAccount/Settings";


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


export default function SettingsPage({user, ...props}:UserPageProps){

    return <>
        <AccountWrapper>
            <CenteredWrapper>
                <Settings
                    {...{
                        user
                    }}
                />
            </CenteredWrapper>
        </AccountWrapper>
    </>
}


