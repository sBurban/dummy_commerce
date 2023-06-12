import React from 'react'
import axios from 'axios'
import { ROUTE_CHECKOUT_API, ROUTE_CHECKOUT_POST_PURCHASE } from '@/lib/common/Constants'

import { ProductType, UserType, AddressType, } from '@/lib/common/Types'
import { Box, Grid, Typography, ButtonBase, Button  } from '@mui/material'
import { ListCard } from '../cards/list/ListCard'
import StyledImg from '../StyledImg'
import { GridHeader } from '../GridHeader'
import {Link as MuiLink} from '@mui/material'
import { useRouter } from 'next/router';

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
    const router = useRouter();

    const {address1,address2,city,postal_code,} = address;
    const shippingAddress = `${address1}|${address2}|${city}|${postal_code}`;
    const newOrderItems:any[] = [];

    const taxRate = 0;
    let shippingCosts = 5;
    let itemsCount = 0;
    let itemSUM = 0;
    let orderTotal = 0;

    const handleConfirmation = async() => {
        const currentDate = new Date().toJSON();
        //Submit order
        try {

            const requestBody = {
                orderitems: newOrderItems,
                total: orderTotal,
                user,
                shipping_address: shippingAddress,
                payment_data: {
                    // user_id: user.id,
                    provider: "BankOfCountry",
                    status:"pending",
                    payment_method: "card",
                    card_number: "789-456-1234",
                },
                current_date: currentDate,
            }
            const response = await axios.post(ROUTE_CHECKOUT_API, requestBody);
            console.log("🚀 ~ file: CheckoutForm.tsx:60 ~ handleConfirmation ~ response:", response)

            router.push(ROUTE_CHECKOUT_POST_PURCHASE);
        } catch (error) {
            console.log("🚀 ~ file: CheckoutForm.tsx:33 ~ handleConfirmation ~ error:", error)
        }
    }


    const checkoutItems = itemlist.map( (item,i) => {
        const product = item.product;
        const itemTotal = product.price * item.quantity;
        itemSUM += itemTotal;
        itemsCount += item.quantity;

        const newItemObj = {
            product_id: product.id,
            quantity: item.quantity,
            item_total: itemTotal,
            status: "preparing",
            // shipping_address: shippingAddress,
        };
        newOrderItems.push(newItemObj);

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
    });

    const beforeTaxes = itemSUM + shippingCosts;
    const taxCost = itemSUM * taxRate;
    orderTotal =  beforeTaxes + taxCost

    const agreements = <>
        <Typography variant="body2" component="div">
            By confirming the order, you accept our
            <MuiLink className="tos_link" href="#" underline="hover" > {"Privacy Agreement"} </MuiLink>
            and our
            <MuiLink className="tos_link" href="#" underline="hover" > {"Terms of Use"} </MuiLink>

        </Typography>
        <Typography variant="body2" component="div"
        >
            Furthermore, you accept our
            <MuiLink className="tos_link" href="#" underline="hover" > {"Terms and Conditions"} </MuiLink>
            here at Duhmmerce
        </Typography>
    </>;


    const leftColumn = <Grid container className='col_left' md={8}
        p={2} ml={4}
        sx={{
            // margin: '0.5rem auto',
            width: `100%`,
            minheight: "100vh",
            '& > .MuiGrid-container:not(:last-of-type)':{
                marginBottom: 2,
                borderBottom: '1px solid var(--mycolors_white_alt)'
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
                <Button variant="text" >
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

        <Grid container className="field_wrapper section_items" direction="column"

        >
            <Grid item className='label_container' >
                <Typography component="p" variant="h5">
                    3. Check products and shipping date
                </Typography>
            </Grid>
            <Grid className="items_header" container item
                sx={{
                    margin: '1rem auto',
                    width: `90%`,
                }}
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
            <Grid className="checkout_button_wrapper" container item
                sx={{
                    margin: '1rem auto',
                    width: `90%`,
                }}
            >
                <ListCard mystyle={{ borderRadius:"0.5rem" }} >
                    <Grid item container >
                        <Grid item container xs={3} alignItems={"center"} >
                            <div>
                                <Button variant="contained" onClick={() => handleConfirmation()}
                                    sx={{  }}
                                >Confirm Payment</Button>
                            </div>
                        </Grid>
                        <Grid item container xs={7} direction="column" >
                            <Typography variant="h5" component="div"
                                sx={{ color:"red" }}
                            >
                                Order Total: ${orderTotal}
                            </Typography>
                            {agreements}
                        </Grid>
                    </Grid>
                </ListCard>
            </Grid>
        </Grid>
    </Grid>;


    const rightColumn =
    <Grid item container className='right_col' direction="column" md={2} p={2} >
        <ListCard
            mystyle={{
                borderRadius:'0.5rem'
             }}
        >
                <Grid item container className='checkout_button_wrapper' direction="column"
                    sx={{
                        borderBottom: '1px solid var(--mycolors_black)',
                        '& > *':{ marginBottom: '1rem'}
                    }}
                >
                    {/* <Grid item container alignItems={"center"} > */}
                        <Button variant="contained" onClick={() => handleConfirmation()}
                            sx={{  }}
                        >Confirm Payment</Button>
                    {/* </Grid> */}
                    <Grid item container   direction="column">
                        {agreements}
                    </Grid>
                </Grid>
                <Grid item container className='checkout_details'
                    sx={{
                        '& > *':{ marginTop: '1rem'}
                     }}
                >
                    <Typography component="p" variant="h5">Order Confirmation</Typography>
                    <Grid className='detail_row'  container justifyContent={"space-between"}>
                        <Grid item>Items({itemsCount}):</Grid>
                        <Grid item>${itemSUM}</Grid>
                    </Grid>
                    <Grid className='detail_row'  container justifyContent={"space-between"}
                        // sx={{ borderBottom: '1px solid var(--mycolors_black)'  }}
                    >
                        <Grid item xs={6}>Shipping costs:</Grid>
                        <Grid item xs={6} textAlign={"end"}
                            sx={{ borderBottom: '1px solid var(--mycolors_black)'  }}
                        >${shippingCosts}</Grid>
                    </Grid>
                    <Grid className='detail_row'  container justifyContent={"space-between"}>
                        <Grid item xs={6} >Before Taxes:</Grid>
                        <Grid item xs={6} textAlign={"end"}  >${beforeTaxes}</Grid>
                    </Grid>
                    <Grid className='detail_row'  container justifyContent={"space-between"}>
                        <Grid item xs={6} >Taxes:</Grid>
                        <Grid item xs={6} textAlign={"end"}  >${taxCost}</Grid>
                    </Grid>
                    <Grid className='detail_row total' container justifyContent={"space-between"}
                        sx={{
                            color:'red',
                            typography: ''
                        }}
                    >

                        <Grid item xs={6}>
                            <Typography variant="h5" component="div"sx={{ color:"red" }}>Total:</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign={"end"} alignItems={"flex-end"}  >
                            <Typography variant="h5" component="div"sx={{ color:"red" }}>${orderTotal}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
        </ListCard>
    </Grid>

    return (<Grid container className='checkout_form_container' spacing={2}
        sx={{
            backgroundColor: "var(--mycolors_white)"
        }}
    >
        {leftColumn}
        {rightColumn}
    </Grid>)
}
