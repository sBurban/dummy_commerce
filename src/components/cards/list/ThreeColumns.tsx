import React from 'react'
import Link from 'next/link';
// import { ProductCardProps } from '@/lib/common/Types';
import { OrderItemProps } from '@/lib/common/Types';

import { Grid,ButtonBase, Typography, Button } from '@mui/material'
import StyledImg from '@/components/StyledImg';
import capitalizeFirst from '@/lib/utils/capitalizeFirst';
import formatDate from '@/lib/utils/formatDate';
import { ROUTE_PRODUCTS } from '@/lib/common/Constants';

export const ThreeColumns = ({orderItem, ...props}:OrderItemProps) => {
    if(!orderItem.product) return;
    const {id:itemId,order_id,product_id,quantity,item_total,status,created_at,updated_at } = orderItem;
    const {title, price, description, category, image, rating} = orderItem.product[0];
    const {rate, count} = rating;
    const detailsUrl = ROUTE_PRODUCTS+product_id;


  return (
    <Grid container spacing={2}

    >

        <Grid className='left_col' item md={4} >
            <Link href={detailsUrl}>
                <ButtonBase sx={{ width:128, height: 128 }}>
                    <StyledImg alt="product image" src={image} />
                </ButtonBase>
            </Link>
        </Grid>

        <Grid className='center_col' item container md={4} direction="column" >
            <Typography variant="subtitle1" component="div"
                sx={{ color: status=='arrived'? "#21c421":"#b4b400" }}
            >
                Status: {capitalizeFirst(status)}
            </Typography>

            <Typography variant="subtitle1" component="div">
                {status === "arrived"? `Arrived on the ${formatDate(updated_at)}`:""}
            </Typography>

            <Typography gutterBottom variant="subtitle1" component="div"
                sx={{ '&:hover':{fontWeight: 600} }}
            >
                <Link href={detailsUrl}>{title}</Link>
            </Typography>
        </Grid>

        <Grid className='right_col' item container md={4} direction="column" >
            <Button variant="contained" sx={{ marginTop: '0.5rem', padding:'0.5rem' }}>
                See payment
            </Button>
            <Button variant="outlined" sx={{ marginTop: '0.5rem', padding:'0.5rem' }}>
                Buy again
            </Button>
        </Grid>

    </Grid>
  )
}
