
import React, {useState} from 'react';
import { ProductType } from '@/lib/common/Types';
import capitalizeFirst from '@/lib/utils/capitalizeFirst';

import { Grid, Typography } from '@mui/material';
import {InputLabel, Select, MenuItem, List,ListItemButton,ListItemText} from '@mui/material';

import { ListCard } from '@/components/commons/ListCard';
import { TwoColumns } from '@/components/cards/list/TwoColumns';

import { ProductsPageProps } from '@/pages/products';

enum Operations {
    Lower = "lower_than_number",
    Between = "between_two_numbers",
    Higher = "higher_than_number"
}

export const ProductsList = ({products=[], categories=[]}:ProductsPageProps) => {
    const [filteredProducts, setFilteredProducts] = useState(products);

    const [category, setCategory] = useState<string>("");
    const handleCategory = (e:any) => {
        const target = e.target;
        // console.log(target);
        const filtered:ProductType[] = products.filter(product => (product.category === target.value) );
        setPrice_range('');
        setCategory(target.value);
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

        setCategory('');
        setPrice_range(action);
        setFilteredProducts(filtered);
    }

    const activeRoute = (textval:string, stateval:string) => {
        return textval === stateval;
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
            mystyle={{
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
                        selected={activeRoute(Operations.Lower as string, price_range)}
                    >
                        <ListItemText>Until ${priceOption1}</ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        id={Operations.Between as string}
                        onClick={(e:any) => handlePrice_range(Operations.Between as string)}
                        selected={activeRoute(Operations.Between as string, price_range)}
                    >
                        <ListItemText>From ${priceOption1} until ${priceOption2}</ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        id={Operations.Higher as string}
                        onClick={(e:any) => handlePrice_range(Operations.Higher as string)}
                        selected={activeRoute(Operations.Higher as string, price_range)}
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
  )
}
