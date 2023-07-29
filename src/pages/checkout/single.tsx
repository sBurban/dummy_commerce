import { GetServerSidePropsContext } from 'next';
import React from 'react';

import CenteredWrapper from '@/components/layouts/CenteredWrapper';
import { SingleCheckout } from '@/components/pageComponentsCheckout/SingleCheckout';
import { isLoginRequiredServer } from '@/lib/auth';
import { TABLE_USER_ADDRESS } from '@/lib/common/dbTables';
import { dbFindFromCollection } from '@/lib/mongoDB/mongoQueries';
import { fetchUserByEmail } from '@/lib/mongoDB/userQueries';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const check = await isLoginRequiredServer(context);
  if (!check.session) return check;
  const { session } = check;

  try {
    const userEmail = session?.user?.email || '';
    // Get User full object
    const res1 = await fetchUserByEmail(userEmail);
    const user = res1.data;

    // Get Orders belonging to the connected User
    const queryFilter = { query: { user_id: user.id } };
    const res2 = await dbFindFromCollection(TABLE_USER_ADDRESS, queryFilter);
    const userAddresses = res2.data;

    let selectedAddress = null;
    if (userAddresses.length > 0) {
      const defaultAddress = userAddresses.filter(
        (userAddress) => userAddress.isDefault
      );
      selectedAddress =
        defaultAddress.length > 0 ? defaultAddress[0] : userAddresses[0];
    }

    return {
      props: {
        user,
        session,
        address: selectedAddress,
      },
    };
  } catch (error) {
    console.log('[PROFILE_PAGE] ERROR FETCHING DATA FROM SERVER');
  }

  return {
    props: {
      session,
    },
  };
}

export default function SingleCheckoutPage({ session, user, address }: any) {
  return (
    <CenteredWrapper mySize='full'>
      <SingleCheckout
        {...{
          session,
          user,
          address,
        }}
      />
    </CenteredWrapper>
  );
}
