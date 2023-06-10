
import React from 'react'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';
import { fetchProductById } from '@/lib/mongoDB/productQueries';
import { ProductType } from '@/lib/common/Types';

import CenteredWrapper from '@/components/layouts/CenteredWrapper';
import { Box, Grid, Typography, Button } from '@mui/material';
import StyledImg from '@/components/StyledImg';
import { RatingStars } from '@/components/RatingStars';
import { Carrousel } from '@/components/cards/Carrousel';
// import {TestCarr} from'@/components/cards/TestCarr'

type ProductDetailsProps = {
    product: ProductType|null
}

export default function ProductDetails({product}:ProductDetailsProps) {

//   console.log("🚀 ~ file: [productId].tsx:16 ~ ProductDetails ~ product:", product)
  if(!product){
    return <>
        <h2>Error fetching the product to display</h2>
    </>
  }

  const {id:productId, image,title,price,description,category,rating}=product;

  return (<>
    <CenteredWrapper mySize="long">
        <Box>
            {/* <h1>ProductDetails</h1> */}
            <Grid container spacing={2} mt={2}
                sx={{
                    backgroundColor: "var(--mycolors_white)",
                 }}
            >
                {/* <Grid className='new_container' item container direction>

                </Grid> */}

                <Grid className='left_col' item md={4}
                    sx={{
                        maxHeight: { xs:300 ,md:250 }
                     }}
                >
                    <StyledImg alt="product_image" src={image}
                        style={{ marginTop: '2rem' }}
                    />
                </Grid>

                <Grid className='center_col' item container md={4} direction="column"
                    mt={2}
                    mb={2}
                >

                    <Typography variant="h4" component="div">
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" mt={2} component="div">
                        <RatingStars value={rating.rate} />
                    </Typography>
                    <Typography variant="subtitle2" mt={2} component="div">
                        US${price}
                    </Typography>
                    <Typography variant="body2" mt={2} component="div">
                        {description}
                    </Typography>
                </Grid>

                <Grid className='right_col' item md={4} container direction="column">
                    <Grid item mb={2} mr={2}
                        sx={{
                            border: '0.2rem solid var(--mycolors_white_alt)',
                            padding: '0.5rem'
                        }}
                    >
                        <Typography variant="body2" component="div">
                            Entrega GRATIS el jueves, 15 de junio a Colombia en pedidos elegibles de más de $35
                        </Typography>
                        <Typography variant="subtitle2" mt={2} component="div">
                            Stock Disponible: {rating.count}
                        </Typography>

                        <Grid item  container direction="column" mt={2} >
                            <Button variant="contained" sx={{ marginTop: '0.5rem', padding:'0.5rem' }}>
                                Buy Now
                            </Button>
                            <Button variant="outlined" sx={{ marginTop: '0.5rem', padding:'0.5rem' }}>
                                Add to Cart
                            </Button>
                        </Grid>

                        <Typography variant="body2" mt={2} component="div">
                            Free returns until: 30 days after arrival.
                        </Typography>
                        <Typography variant="body2" mt={2} component="div">
                            Buyers Insurance: guaranteed product in good state or we return your money.
                        </Typography>
                        <Typography variant="body2" mt={2} component="div">
                            No taxes included in pricing
                        </Typography>
                    </Grid>
                </Grid>

                {Carrousel({category: category, title: 'Other items that might interest you', filterId: productId})}
                {/* {TestCarr({ title: 'Other items that might interest you', filterId: productId})} */}

            </Grid>
        </Box>

    </CenteredWrapper>
  </>)
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