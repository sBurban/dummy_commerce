import AccountWrapper from "@/components/layouts/AccountWrapper";
import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from "@/lib/auth";

const Addresses = () =>{
    return <>
        <AccountWrapper>
            <h1>Addresses Page</h1>
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

export default Addresses;