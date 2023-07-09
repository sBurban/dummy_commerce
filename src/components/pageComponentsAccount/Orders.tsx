import React from 'react'

import { ListCard } from "@/components/commons/ListCard";
import { ThreeColumns } from "@/components/cards/list/ThreeColumns";
import { Grid, Typography,  } from "@mui/material";
import formatDate from '@/lib/utils/formatDate';
import { GridHeader } from "@/components/commons/GridHeader";

import { OrdersPageProps } from '@/pages/account/orders';

export const Orders = ({orders, items}:OrdersPageProps) => {

    const elemList = orders.length === 0? <h1>No Orders Found</h1>
    : orders.map(order => {

        const orderItems = items.map(item => {
            if(item.order_id === order.id){
                if(!item.product) return;
                const prod = item.product[0];

                return <ListCard key={item.id} >
                    {/* <TwoColumns product={prod} /> */}
                    <ThreeColumns orderItem={item} />
                </ListCard>
            }
        });


        return (
        <div key={order.id} >


            <GridHeader>

                    <Grid item>
                        <Typography variant="subtitle1" component="em">
                            Ordered on date
                        </Typography>
                        <Typography variant="body2" component="p">
                            {formatDate(order.created_at)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="em">
                            Total
                        </Typography>
                        <Typography variant="body2" component="p">
                            ${order.total}
                        </Typography>

                    </Grid>
                    <Grid item mr={2}>
                        <Typography variant="subtitle1" component="em">
                            Order #{order.id}
                        </Typography>
                        <Typography variant="body2" component="p">
                            <a href="#">See Order Details</a>
                        </Typography>
                    </Grid>

            </GridHeader>


            <Grid
                sx={{
                    '& > *:last-of-type': {
                        borderBottomLeftRadius: '0.5rem',
                        borderBottomRightRadius: '0.5rem',
                    }
                 }}
            >
                {orderItems}
            </Grid>

        </div>)
    })

  return (<>
    <h1>Orders Page</h1>
    {elemList}
  </>)
}
