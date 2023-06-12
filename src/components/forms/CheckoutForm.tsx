import React from 'react'

import { ProductType, UserType, AddressType, } from '@/lib/common/Types'
import { Box, Grid, Typography, ButtonBase, Button  } from '@mui/material'
import { ListCard } from '../cards/list/ListCard'
import StyledImg from '../StyledImg'
import { GridHeader } from '../GridHeader'

export type CheckoutOrderItem = {
    product_id: number,
    quantity: number,
    product: ProductType
    // created_at: string,
    // updated_at: string,
}

type CheckoutFormProps = {
    itemlist: CheckoutOrderItem[]
    user: UserType
    address: AddressType
    paymentMethod: null
}

export const CheckoutForm = ({itemlist, user, address, paymentMethod}:CheckoutFormProps) => {


    const checkoutItems = itemlist.map( (item,i) => {
        const product = item.product;
        const itemTotal = product.price * item.quantity;

        return <ListCard key={i}
            mystyle={{
                borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem',
                // backgroundColor: 'red'
            }}
        >
            <Grid container>

                <Grid item container md={2} direction="column" >
                    <ButtonBase sx={{ width:128, height: 128 }}>
                        <StyledImg alt="product image" src={product.image} />
                    </ButtonBase>
                </Grid>

                <Grid item container md={8} direction="column" justifyContent={"center"} >
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div"
                            // sx={{ '&:hover':{fontWeight: 600} }}
                        >
                            {product.title}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant="subtitle1" component="div">
                            Quantity: {item.quantity}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle1" component="div">
                            ${product.price} per unit
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container md={2} direction="column" justifyContent={"center"} >
                    <Typography variant="subtitle1" component="div">
                        Total:
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        ${itemTotal}
                    </Typography>
                </Grid>
            </Grid>
        </ListCard>
    })

    return (<Grid container
        sx={{
            backgroundColor: "var(--mycolors_white)"
        }}
    >


        <Grid container className='col_left'
            // direction="column" alignItems="center"
            p={2}
            sx={{
                margin: '1rem auto',
                width: `100%`,
                minheight: "100vh",
                '& > .MuiGrid-container':{
                    marginBottom: 2
                },
            }}
        >
            <Grid container className="field_wrapper section_address"
            >
                <Grid className='label_container' item sm={3} >
                    <Typography component="p" variant="h5">
                       1. Shipping Address
                    </Typography>
                </Grid>
                <Grid item className='container_info' sm={5} >
                    <Typography variant="subtitle1" component="div" >
                        {address.contact_on_site}
                    </Typography>
                    <Typography variant="subtitle1" component="div" >
                        {address.address1}
                    </Typography>
                    <Typography variant="subtitle1" component="div" >
                        {address.address2}
                    </Typography>
                    <Typography variant="subtitle1" component="div" >
                        {`${address.city}, ${address.postal_code}`}
                    </Typography>
                </Grid>
                <Grid item sm={3} >
                    <Button variant="text">
                        Change
                    </Button>
                </Grid>
            </Grid>

            <Grid container className="field_wrapper section_payment_method"
                // direction="column" alignItems="center"
            >
                <Grid item className='label_container' sm={3} >
                    <Typography component="p" variant="h5">
                       2. Payment Method
                    </Typography>
                </Grid>
                <Grid item className='container_info' sm={5} >
                    <Typography variant="subtitle1" component="div" >
                        <span>Duhmmerce Ecard</span> with last numbers 1234
                    </Typography>
                    <Typography variant="subtitle1" component="div" >
                        <span>Click here</span> to see monthly pay options
                    </Typography>
                    <Typography variant="subtitle1" component="div" >
                        <span>Card Address: </span> same as shipping address
                    </Typography>
                </Grid>
                <Grid item sm={3} >
                    <Button variant="text">
                        Change
                    </Button>
                </Grid>
            </Grid>

            <Grid container className="field_wrapper section_items"
                direction="column"
            >
                <Grid item className='label_container' >
                    <Typography component="p" variant="h5">
                        3. Check products and shipping date
                    </Typography>
                </Grid>
                <Grid className="items_header" container item

                >
                    <GridHeader
                        mystyle={{
                            // minHeight: 80
                         }}
                    >
                        <Grid item sm={8} >
                            <Typography variant="h6" component="div"
                                // sx={{ '&:hover':{fontWeight: 600} }}
                            >
                                Your product will be arriving in [between a week or two]
                            </Typography>
                        </Grid>
                        <Grid item sm={2} >
                            <Typography variant="h6" component="div"
                                // sx={{ '&:hover':{fontWeight: 600} }}
                            >
                                {"Shipping: $5"}
                            </Typography>
                        </Grid>
                    </GridHeader>

                    {checkoutItems}
                </Grid>

            </Grid>
        </Grid>




    </Grid>)
}
