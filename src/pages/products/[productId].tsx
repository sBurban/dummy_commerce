
import React from 'react'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';
import { fetchProductById } from '@/lib/mongoDB/productQueries';
import { ProductType } from '@/lib/common/Types';

import { ProductDetails } from '@/components/pageComponentsProducts/DetailsBox';

export type ProductDetailsProps = {
    product: ProductType|null
}

export async function getStaticPaths(){
    try{
        const fieldsFilter = {fields:{id:true}};
        const response = await fetchProductsFromDB(fieldsFilter);
        const products = response.data;
        const staticPaths = products.map((prod) => {
            if(prod) return { params:{ productId: ""+prod.id } }
        }).filter(r => r !== undefined? true: false);

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

export async function getStaticProps(context:GetStaticPropsContext){
    try {
        // const productId = "1";
        const productId = context?.params?.productId as string || "";
        if(!productId) throw new Error("Unexpected params format.")

        const response = await fetchProductById(productId);
        const product = response.data;

        return {
            props:{
                product: product,
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

export default function DetailsPage({product}:ProductDetailsProps) {

  return (
    <ProductDetails
        {...{
            product
        }}
    />
  )
}


