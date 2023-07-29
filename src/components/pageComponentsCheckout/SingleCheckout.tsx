import axios from 'axios';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';

import {
  CheckoutForm,
  CheckoutOrderItem,
} from '@/components/forms/CheckoutForm';
import { ROUTE_PRODUCTS_API } from '@/lib/common/Constants';
import { AddressType, UserType } from '@/lib/common/Types';
import { getSessionData } from '@/lib/utils/singleCheckout';

export type CheckoutProps = {
  session: Session;
  user: UserType;
  address: AddressType;
};

export const SingleCheckout = ({ session, user, address }: CheckoutProps) => {
  const router = useRouter();
  const [listProducts, setListProducts] = useState<CheckoutOrderItem[]>([]);
  console.log(
    '🚀 ~ file: single.tsx:29 ~ SingleCheckout ~ listProducts:',
    listProducts
  );

  const getProducts = async (id: number) => {
    try {
      // if (!id) {
      // }
      const extraParams = `?id=${id}`;
      const result = await axios.get(ROUTE_PRODUCTS_API + extraParams);

      const singleProduct = result.data.products[0];
      const orderItem: CheckoutOrderItem = {
        product_id: id,
        quantity: 1,
        product: singleProduct,
      };
      setListProducts([orderItem]);
    } catch (error) {
      setListProducts([]);
    }
  };

  useEffect(() => {
    const data = getSessionData();
    if (!data) router.push('/');
    else if (data) {
      const body = JSON.parse(data as string);
      getProducts(body.product_id);
    }
  }, []);

  const displayElem =
    listProducts.length === 0 ? (
      <div>Loading...</div>
    ) : (
      <CheckoutForm
        itemlist={listProducts}
        user={user}
        address={address}
        paymentMethod={null}
      />
    );

  return displayElem;
};
