import CenteredWrapper from '@/components/layouts/CenteredWrapper';

import React, {useState} from 'react';

import { ProductType } from '@/lib/common/Types';
import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';

// import Link from 'next/link';
// import capitalizeFirst from '@/lib/utils/capitalizeFirst';
// import { Grid, Typography } from '@mui/material';
// import {InputLabel, Select, MenuItem, List,ListItemButton,ListItemText} from '@mui/material';
// import { ListCard } from '@/components/commons/ListCard';
// import { TwoColumns } from '@/components/cards/list/TwoColumns';

import { ProductsList } from '@/components/pageComponentsProducts/ProductsList';


export type ProductsPageProps = {
    products: ProductType[] | []
    categories: string[]
}

export async function getStaticProps(){
    try {
        const response = await fetchProductsFromDB();
        const products = response.data;
        //A 'categories' table might be nice to control this
        const categories:string[]=[];
        products.map(prod =>{
            if(categories.indexOf(prod.category) === -1){
                categories.push(prod.category);
            }
        })

        return {
            props:{
                products: products,
                categories
            },
            revalidate: 3600
        }
    } catch (error) {
        console.log("🚀 ~ file: index.tsx:27 ~ getStaticProps ~ error:", error)
    }
    return {
        props:{
        },
        revalidate: 3600
    }
}

export default function ProductsPage({products=[], categories=[]}:ProductsPageProps){

    return (
        <ProductsList
            {...{
                products,
                categories
            }}
        />
    );
};



