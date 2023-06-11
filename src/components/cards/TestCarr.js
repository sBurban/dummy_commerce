import React, {useState,useEffect, useRef} from 'react'
import useProducts from '@/hooks/useProducts'
import { ProductType } from '@/lib/common/Types';
import { StampCard } from './stamps/StampCard';

import { Grid,Box,Typography } from '@mui/material';
import { Tabs, Tab, Button } from '@mui/material';


// type CarrouselProps = {
//     category?: string,
//     filterId?: number,
//     title?: string,
// }

// type OptionalFunction = (() => void) | (() => {})
// type OptionalFunction = (() => void) | (({title,category,filterId}:CarrouselProps) => React.JSX.Element[] | undefined)

export const TestCarr = ({title="", category="", filterId}) => {
    const {products, error} = useProducts({category: category});
    const [listProducts, setListProducts] = useState([]);

    const [value, setValue] = useState(0);
    const listRef = useRef(null);
    const btnContainer = useRef(null);

    useEffect(() => {
      setListProducts(products)
    }, [products.length])
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    const scrollLeft = () => {
        if (listRef.current) {
          listRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
          btnContainer.current.scrollLeft -= 200;
        }
    };
    const scrollRight = () => {
        if (listRef.current) {
          listRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
          btnContainer.current.scrollLeft += 200;
        }
    };


    if(error){
        return;
    }
    if(products.length === 0){
        return;
    }

    const titleElem = title? <Typography variant="h5" component="div">
        {title}
    </Typography> : null;

    const scrollItems = [];
    listProducts.forEach( (product,idx) => {
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
                ref={listRef}
                sx={{
                    overflowX: 'auto', // Enable horizontal scrolling
                    display: 'flex', // Set display to flex
                    flexWrap: 'nowrap', // Prevent items from wrapping
                    position: 'relative',
                }}
            >
                {scrollItems}
            </Box>
                <div
                    ref={btnContainer}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '16px' ,
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Button onClick={scrollLeft}>Scroll Left</Button>
                    <Button onClick={scrollRight}>Scroll Right</Button>
                </div>

        </Grid>
    </>)

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
