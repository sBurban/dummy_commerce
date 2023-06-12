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

import { GridHeader } from '@/components/GridHeader';
import { FormReadOnly } from '@/components/forms/FormReadOnly';
import { Box, Typography, Button } from '@mui/material';

type AddressDetailsProps = {
  user_address: AddressType,
  props?:any
}

export const addressDetails = ({user_address, ...props}:AddressDetailsProps) => {

  if(!user_address){
    return <div>Address not found</div>
  }

  const data = Object.keys(user_address).map( (objkey:string) => {
      return {title: objkey, value: user_address[objkey as keyof AddressType] }
  });
  const formReadOnlyElems = <FormReadOnly data={data} />

  const detailsElem = <Box>
    <GridHeader >
      <Typography component="span" variant="h5" >
          Address Details
      </Typography>
      <Button variant="outlined" sx={{ marginRight: '0.5rem' }}
          // onClick={() => setIsEdit(!isEdit)}
      >
        Edit
          {/* {!isEdit? "Edit" : "Cancel"} */}
      </Button>
    </GridHeader>

    {formReadOnlyElems}

  </Box>

  return (<>
    <AccountWrapper>
      <CenteredWrapper>

        {/* <div>Address Details</div> */}
        {detailsElem}

      </CenteredWrapper>
    </AccountWrapper>
  </>)
}

export default addressDetails;


export async function getServerSideProps(context:GetServerSidePropsContext) {
  const check = await isLoginRequiredServer(context);
  if (!check.session) return check;
  const {session} = check;

  console.log("🚀 ~ file: [...detailsId].tsx:66 ~ getServerSideProps ~ context:", context.params)

  try {
      const detailsId = context?.params?.detailsId as string || "";
      if(!detailsId) throw new Error("Unexpected params format.")
      const addressId = parseInt(detailsId[0]);

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
      console.log(`[${TABLE_USER_ADDRESS}] ERROR FETCHING DATA FROM SERVER`);
  }

  return {
      props: {
        session: session
      },
  };
}