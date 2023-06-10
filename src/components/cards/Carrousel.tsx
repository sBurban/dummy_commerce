import React, {useState,useEffect} from 'react'
import useProducts from '@/hooks/useProducts'
import { ProductType } from '@/lib/common/Types';
import { StampCard } from './stamps/StampCard';

import { Grid,Box,Typography } from '@mui/material';

type CarrouselProps = {
    category?: string,
    filterId?: number,
    title?: string,
}

// type OptionalFunction = (() => void) | (() => {})
// type OptionalFunction = (() => void) | (({title,category,filterId}:CarrouselProps) => React.JSX.Element[] | undefined)

export const Carrousel = ({title, category, filterId}:CarrouselProps) => {
    const {products, error} = useProducts({category: category});
    const [listProducts, setListProducts] = useState<ProductType[]>([]);

    useEffect(() => {
      setListProducts(products)
    }, [products.length])

    if(error){
        return;
    }
    if(products.length === 0){
        return;
    }

    const titleElem = title? <Typography variant="h5" component="div">
        {title}
    </Typography> : null;

    const scrollItems:React.JSX.Element[] = [];
    listProducts.forEach( (product,i) => {
        if(filterId && filterId === product.id) return;

        const newItem = <StampCard key={product.id}
            product={product}
            sx={{
                flex: "0 0 auto",
                margin: "0.5rem"
            }}
        />;
        scrollItems.push(newItem);
    });

    return (<>
        <Grid className='others_list' container item direction="row"
            // md={8}
        >
            {titleElem}
            <Box
                sx={{
                    overflowX: 'auto', // Enable horizontal scrolling
                    display: 'flex', // Set display to flex
                    flexWrap: 'nowrap', // Prevent items from wrapping
                }}
            >
                {scrollItems}
            </Box>

        </Grid>
    </>)
}
