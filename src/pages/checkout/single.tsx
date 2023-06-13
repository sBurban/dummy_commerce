import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from "next";
import { isLoginRequiredServer } from '@/lib/auth';
import { fetchUserByEmail } from '@/lib/mongoDB/userQueries';
import { getSessionData, SingleCheckoutBody } from '@/lib/utils/singleCheckout';
import { TABLE_USER_ADDRESS } from '@/lib/common/dbTables';
import { dbFindFromCollection } from '@/lib/mongoDB/mongoQueries';
import useProducts from '@/hooks/useProducts';
import { ProductType } from '@/lib/common/Types';

import axios from 'axios';
import { ROUTE_PRODUCTS_API } from '@/lib/common/Constants';

import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { Box } from '@mui/material';
import CenteredWrapper from '@/components/layouts/CenteredWrapper';

import { CheckoutOrderItem } from '@/components/forms/CheckoutForm';

export default function SingleCheckout({session, user, address}:any) {
    const router = useRouter();
    const [listProducts, setListProducts] = useState<CheckoutOrderItem[]>([]);
    console.log("🚀 ~ file: single.tsx:29 ~ SingleCheckout ~ listProducts:", listProducts)

    const getProducts = async (id:number) => {
      try {
          if(!id){
          }
          let extraParams = "?id="+id;
          const result = await axios.get( ROUTE_PRODUCTS_API + extraParams );

          const singleProduct = result.data.products[0];
          const orderItem:CheckoutOrderItem = {
            product_id: id,
            quantity: 1,
            product: singleProduct
          }
          setListProducts([orderItem])
      } catch (error) {
          setListProducts([]);
      }
    }

    useEffect(() => {
      const data = getSessionData();
      if(!data) router.push('/');
      else if(data){
        const body = JSON.parse(data as string);
        getProducts(body.product_id);
      }
    }, [])

    const displayElem = listProducts.length == 0? <div>Loading...</div>
    : <CheckoutForm itemlist={listProducts}
        user={user} address={address} paymentMethod={null}
      />

    return (
      <CenteredWrapper mySize='full' >
          {/* <h1>SingleCheckout Page</h1> */}
          {displayElem}
      </CenteredWrapper>
    )
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

        let selectedAddress = null;
        if(userAddresses.length > 0){
          const defaultAddress = userAddresses.filter( user_address => user_address.isDefault)
          selectedAddress = defaultAddress.length > 0? defaultAddress[0] : userAddresses[0];
        }

        return {
            props:{
                user: user,
                session: session,
                address: selectedAddress,
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