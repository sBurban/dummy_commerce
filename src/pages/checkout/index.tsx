
import React from 'react'
import { getSessionData } from '@/lib/utils/singleCheckout'
import { useRouter } from 'next/router';
import { ROUTE_CHECKOUT_SINGLE } from '@/lib/common/Constants';

export default function CheckoutIndex(){
    const router = useRouter();
    const data = getSessionData();

    if(data){
        router.push(ROUTE_CHECKOUT_SINGLE);
    }

    router.push('/');


    return (
        <div>Loading...</div>
    )
}


// export async function getStaticPaths(){

// }
// export async function getStaticProps(context:GetStaticPropsContext){

// }