import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

const Profile = () =>{
    return <>
        <AccountWrapper>
            <CenteredWrapper>
                <h1>Profile Page</h1>
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