import React from 'react'
import Link from 'next/link';
import { ROUTE_PRODUCTS } from '@/lib/common/Constants';

import { ProductCardProps } from '@/lib/common/Types'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'

type StampCardProps = ProductCardProps & {
    sx?:any
}

export const StampCard = ({product, sx, ...props}:StampCardProps) => {
    const {id, title, price, description, category, image, rating} = product;
    const {rate, count} = rating;
    const detailsUrl = ROUTE_PRODUCTS+id;

    const stampCard =
    <Link href={detailsUrl}
            style={{
                display: "inline-block",
                width: 300,
                ...sx,
            }}

    >
        <CardActionArea>
            <Card
                sx={{
                    width: "100%",
                    height: 250,
                }}
            >
                <CardMedia component="img" alt="product image" image={image} height="140" width="140"
                    sx={{
                        objectFit: 'contain'
                    }}
                />

                <CardContent sx={{ textOverflow: "wrap" }} >
                    <Typography variant="h5" color="text.secondary">
                        ${price}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                        {title}
                    </Typography>
                </CardContent>

            </Card>
        </CardActionArea>
    </Link>

    return (<>
        {stampCard}
    </>)
}
