import CenteredWrapper from '@/components/layouts/CenteredWrapper';

import React, {useState} from 'react';
import Link from 'next/link';

import { ProductType } from '@/lib/common/Types';
import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';
import capitalizeFirst from '@/lib/utils/capitalizeFirst';

import { Grid, Typography } from '@mui/material';
import { ListCard } from '@/components/cards/list/ListCard';
import { TwoColumns } from '@/components/cards/list/TwoColumns';


import {InputLabel, Select, MenuItem, List,ListItemButton,ListItemText} from '@mui/material';

type ProductsPageProps = {
    products: ProductType[] | []
    categories: string[]
}

enum Operations {
    Lower = "lower_than_number",
    Between = "between_two_numbers",
    Higher = "higher_than_number"
}

export default function Products({products=[], categories=[]}:ProductsPageProps){

    const [filteredProducts, setFilteredProducts] = useState(products);

    const [category, setCategory] = useState<string>("");
    const handleCategory = (e:any) => {
        const target = e.target;
        // console.log(target);
        setCategory(target.value);
        const filtered:ProductType[] = products.filter(product => (product.category === target.value) );
        setFilteredProducts(filtered);
    }

    const [priceOption1,priceOption2] = [20,50];// PriceRangeOptions
    const [price_range, setPrice_range] = useState("");
    const handlePrice_range = (action:string) => {
        let filtered:ProductType[] = products;
        if(action == Operations.Lower){
            filtered = products.filter(product => (product.price < priceOption1) );
        }else if(action == Operations.Between){
            filtered = products.filter(product => (product.price > priceOption1 && product.price < priceOption2) );
        }else if(action == Operations.Higher){
            filtered = products.filter(product => (product.price > priceOption2) );
        }

        setPrice_range(action);
        setFilteredProducts(filtered);
    }

    // return;
    // const categories:string[]=[];
    const optionsList:React.JSX.Element[] = categories.map((category,idx) => {
        return <MenuItem key={idx}  value={category}>
            {capitalizeFirst(category)}
        </MenuItem >;
    });

    const productsList:React.JSX.Element[] = [];
    filteredProducts.forEach( (product,i) => {
        const listCard = <ListCard key={""+product.id}
            sx={{
                marginBottom: '0.5rem'
             }}
        >
            <TwoColumns product={product} />
        </ListCard>;
        productsList.push(listCard);
    });



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
                    sx={{ background: 'var(--mycolors_white)' }}
                >
                    {optionsList}
                </Select>
            </Grid >
            <Grid item container direction="column" mb={3} >
                <InputLabel htmlFor="price_range_select_label">Price Range</InputLabel>
                <List
                    id="price_range_select"
                >
                    <ListItemButton
                        id={Operations.Lower as string}
                        onClick={(e:any) => handlePrice_range(Operations.Lower as string)}
                    >
                        <ListItemText>Until ${priceOption1}</ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        id={Operations.Between as string}
                        onClick={(e:any) => handlePrice_range(Operations.Between as string)}
                    >
                        <ListItemText>From ${priceOption1} until ${priceOption2}</ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        id={Operations.Higher as string}
                        onClick={(e:any) => handlePrice_range(Operations.Higher as string)}
                    >
                        <ListItemText>Over ${priceOption2}</ListItemText>
                    </ListItemButton>
                </List>
            </Grid >
        </Grid >
    </Grid>;



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
        //A 'categories' table might be nice to control this
        const categories:string[]=[];
        products.forEach(prod =>{
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