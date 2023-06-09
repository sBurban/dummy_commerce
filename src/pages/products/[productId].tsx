

import React from 'react'


import { fetchProductsFromDB } from '@/lib/productApi';
import { fetchProductById } from '@/lib/productApi';
import { ProductType } from '@/common/Types';


type ProductDetailsProps = {
    product: ProductType
}

export default function ProductDetails({product}:ProductDetailsProps) {

  console.log("🚀 ~ file: [productId].tsx:16 ~ ProductDetails ~ product:", product)

  if(!product){
    return <>
        <h2>Error fetching the product to display</h2>
    </>
  }

  const {image,title,price,description,category,rating}=product;

  return (<>
    <div>ProductDetails</div>
        <div
            style={{
                border: "1px solid black",
                margin: "0.5rem"
            }}
        >
            <p>{title}</p>
            <p>{price}</p>
            <p>{description}</p>
            <p>{category}</p>
            <p>{image}</p>
            <p>{rating.rate}</p>
            <p>{rating.count}</p>
        </div>
  </>)
}


export async function getStaticPaths(){
    try{
        const fieldsFilter = {fields:{id:true}};
        const response = await fetchProductsFromDB();
        const products = response.data;
        const staticPaths = products.map((prod) => {
            if(prod) return { params:{ productId: ""+prod.id } }
        }).filter(r => r !== undefined? true: false);
        console.log("🚀 ~ file: [productId].tsx:35 ~ getStaticPaths ~ staticPaths:", staticPaths)

        return {
            fallback: true,
            paths: staticPaths
        }
    }catch(error){
        console.log("🚀 ~ file: [productId].tsx:21 ~ getStaticPaths ~ error:", error)
        // throw error;
    }
    return{
        fallback: true,
        paths:[]
    }
}

export async function getStaticProps(){
    try {
        const productId = "1";
        const response = await fetchProductById(productId);
        const product = response.data;
        // console.log("🚀 ~ file: [productId].tsx:35 ~ getStaticProps ~ product:", product)

        return {
            props:{
                product: product,
                // product: {},
            },
            revalidate: 3600
        }
    } catch (error) {
        return{
            props:{
                product: null,
                revalidate: 3600
            }
        }
    }
}