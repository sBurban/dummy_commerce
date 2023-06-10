import React from 'react'
import Link from 'next/link';
import { ProductCardProps } from '@/lib/common/Types';

import { Grid,ButtonBase, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { RatingStars } from '@/components/RatingStars';
import StyledImg from '@/components/StyledImg';
// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
// });


export const TwoColumns = ({product, ...props}:ProductCardProps) => {
    const {id, title, price, description, category, image, rating} = product;
    const {rate, count} = rating;
    const detailsUrl = "/products/"+id;

    return (
        <Grid container spacing={2}

        >
            <Grid item>
                <Grid item>
                    <Link href={detailsUrl}>
                        <ButtonBase sx={{ width:128, height: 128 }}>
                            <StyledImg alt="product image" src={image} />
                        </ButtonBase>
                    </Link>
                </Grid>
            </Grid>

            <Grid item xs={12} sm container>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div"
                        sx={{ '&:hover':{fontWeight: 600} }}
                    >
                        <Link href={detailsUrl}>{title}</Link>
                    </Typography>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div">
                                <RatingStars value={rate} />
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div">
                                ${price}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
  );
}
