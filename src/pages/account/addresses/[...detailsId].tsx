import React from 'react'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import AccountWrapper from '@/components/layouts/AccountWrapper';
import CenteredWrapper from '@/components/layouts/CenteredWrapper';
import { AddressType } from '@/lib/common/Types';
import { isLoginRequiredServer } from '@/lib/auth';
// import { dbFindFromCollection } from '@/lib/mongoDB/mongoQueries';
import { dbFindOneFromCollection } from '@/lib/mongoDB/mongoQueries';
import { TABLE_USER_ADDRESS } from '@/lib/dbTables';
import { fetchUserByEmail } from '@/lib/mongoDB/userQueries';

type AddressDetailsProps = {
  user_address: AddressType[] | null,
  props?:any
}

export const addressDetails = ({user_address, ...props}:AddressDetailsProps) => {
  return (<>
    <AccountWrapper>
      <CenteredWrapper>
        <div>Address Details</div>
      </CenteredWrapper>
    </AccountWrapper>
  </>)
}

export default addressDetails;


export async function getServerSideProps(context:GetServerSidePropsContext) {
  const check = await isLoginRequiredServer(context);
  if (!check.session) return check;
  const {session} = check;

// console.log(context.params);
//   return {props: {
//     session: session
//   },};
  try {
      const addressId = context?.params?.detailId as string || "";
      if(!addressId) throw new Error("Unexpected params format.")

      // const userEmail = session?.user?.email || "";
      // //Get User full object
      // const res1 = await fetchUserByEmail(userEmail);
      // const user = res1.data;

      //Get the address by id
      const queryFilter = { query:{ id:addressId } };
      const res2 = await dbFindOneFromCollection(TABLE_USER_ADDRESS, queryFilter)
      const user_address = res2.data;

      return {
          props:{
              user_address: user_address,
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