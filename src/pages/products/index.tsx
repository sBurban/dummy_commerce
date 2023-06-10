import CenteredWrapper from '@/components/layouts/CenteredWrapper';

import React from 'react';
import Link from 'next/link';

import { ProductType } from '@/lib/common/Types';
import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';

type ProductsPageProps = {
    products: ProductType[] | []
}

export default function Products({products}:ProductsPageProps){

    // return;
    const productsList = products.map(prod => {
        return <div key={""+prod.id}
            style={{
                border: "1px solid black",
                margin: "0.5rem"
            }}
        >
            <Link href={"/products/"+prod.id}>Product Details</Link>
            <p>{prod.title}</p>
            <p>{prod.price}</p>
            <p>{prod.description}</p>
            <p>{prod.category}</p>
            <p>{prod.image}</p>
            <p>{prod.rating.rate}</p>
            <p>{prod.rating.count}</p>
        </div>
    })

    return (
        <div>
            <CenteredWrapper>
                <h1>Products Page</h1>
                {productsList}
            </CenteredWrapper>
        </div>
    );
};



export async function getStaticProps(){
    try {
        const response = await fetchProductsFromDB();
        const products = response.data;
        return {
            props:{
                products: products
            },
            revalidate: 3600
        }
    } catch (error) {
        console.log("🚀 ~ file: index.tsx:27 ~ getStaticProps ~ error:", error)
    }
    return {
        props:{
            products:[]
        },
        revalidate: 3600
    }
}