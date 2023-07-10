import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getSessionData, SingleCheckoutBody } from '@/lib/utils/singleCheckout';

import { ROUTE_PRODUCTS_API } from '@/lib/common/Constants';

import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { CheckoutOrderItem } from '@/components/forms/CheckoutForm';

import { CheckoutProps } from '@/pages/checkout/single';


export const SingleCheckout = ({session, user, address}:CheckoutProps) => {
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
    <div>SingleCheckout</div>
  )
}
