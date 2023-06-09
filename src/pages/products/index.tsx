import React from 'react';
import Link from 'next/link';

import { ProductType } from '@/lib/common/Types';
import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';

// import { ResponseFromServer } from '@/lib/productApi';

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
            <h1>Products Page</h1>
            {productsList}
        </div>
    );
};



export async function getStaticProps(){
    try {
        // const products = await getProducts();
        const response = await fetchProductsFromDB();
        const products = response.data;
        // let responseFromServer:ResponseFromServer = await products;//.json();
        console.log("🚀 ~ file: index.tsx:20 ~ getStaticProps ~ products:", products.length)
        return {
            props:{
                products: products
                // products: []
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

async function getProducts(id?:string){
    const baseUrl = 'https://fakestoreapi.com/products/';
    const res = await fetch(`${baseUrl}${id || ""}`);
    return res.json();
}