import CenteredWrapper from '@/components/layouts/CenteredWrapper';

import React, {useState} from 'react';
import Link from 'next/link';

import { ProductType } from '@/lib/common/Types';
import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';

import { Grid, Typography } from '@mui/material';
import { ListCard } from '@/components/cards/list/ListCard';
import { TwoColumns } from '@/components/cards/list/TwoColumns';


import {InputLabel, Select, MenuItem} from '@mui/material';

type ProductsPageProps = {
    products: ProductType[] | []
}

export default function Products({products}:ProductsPageProps){

    const [category, setCategory] = useState<string>("");
    const handleCategory = (e:any) => {
        const target = e.target;
        // console.log(target);
        setCategory(target.value)
    }

    const filtersColumn = <Grid
        container
        direction="column"
        px={3}
    >
        <Grid item container direction="column" mb={3} >
            <p>{"My_Search"}</p>
            <p>{10} results</p>
        </Grid >
        <Grid item container direction="column" mb={3} >
            <p>{"By category"}</p>
            <Grid item container direction="column" mb={3} >
                <InputLabel id="category_select_label" >Filter by Category</InputLabel>
                <Select
                    id="category_select" labelId='category_select_label'
                    value={category}
                    onChange={handleCategory}
                >
                    <MenuItem  value="jewelry">jewelry</MenuItem >
                    <MenuItem  value="clothing">clothing</MenuItem >
                </Select>
            </Grid >
            <Grid item container direction="column" mb={3} >
                <InputLabel htmlFor="price_range"></InputLabel>
                <ul id="price_range">
                    <li>Until $20</li>
                    <li>From $20 until $50</li>
                    <li>Over $50</li>
                </ul>
            </Grid >
        </Grid >
    </Grid>;

    // return;
    const productsList = products.map(prod => {
        return <ListCard key={""+prod.id}
            sx={{
                marginBottom: '0.5rem'
             }}
        >
            <TwoColumns product={prod} />
        </ListCard>
    })

    return (
        <Grid container
            direction="row"
            pt={2}
        >

            <Grid item md={3}
                sx={{ marginTop:{ xs:'0', md:'3rem'} }}
            >
                {filtersColumn}
            </Grid>

            <Grid item md={8} >
                <Typography gutterBottom variant="h5" component="div">
                    Results
                </Typography>
                {productsList}
            </Grid>

        </Grid>
    );
            // <CenteredWrapper>
            // </CenteredWrapper>
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