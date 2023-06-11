import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { fetchOrdersFromDB, fetchOrderItemsWithProducts } from "@/lib/mongoDB/orderQueries";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { OrderType, OrderItemType } from "@/lib/common/Types";

import { isLoginRequiredServer } from "@/lib/auth";
// import { ROUTE_LOGIN } from "@/lib/common/Constants";
// import { authConfig } from "@/lib/auth";
// import { loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth/next"
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { ListCard } from "@/components/cards/list/ListCard";
import { TwoColumns } from "@/components/cards/list/TwoColumns";
import { ThreeColumns } from "@/components/cards/list/ThreeColumns";
import { Grid, Typography,  } from "@mui/material";
import formatDate from '@/lib/utils/formatDate';
import { GridHeader } from "@/components/GridHeader";

type OrdersPageProps = {
    orders: OrderType[] | [],
    items: OrderItemType[] | [],
}

const Orders = ({orders, items}:OrdersPageProps) =>{

    console.log("🚀 ~ file: orders.tsx:17 ~ Orders ~ orders:", orders)
    // console.log("🚀 ~ file: orders.tsx:17 ~ Orders ~ items:", items)
    // return ;

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
                    '& > *:last-child': {
                        borderBottomLeftRadius: '0.5rem',
                        borderBottomRightRadius: '0.5rem',
                    }
                 }}
            >
                {orderItems}
            </Grid>

        </div>)
    })

    return <>
    <AccountWrapper>
        <CenteredWrapper mySize="long" >
            <h1>Orders Page</h1>
            {elemList}
        </CenteredWrapper>
    </AccountWrapper>
    </>
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
    const check = await isLoginRequiredServer(context);
    if (!check.session) return check;
    const {session} = check;

    // Fetch additional session-related data using the session object
    try {
        const userEmail = session?.user?.email || "";
        //Get User full object
        const res1 = await fetchUserByEmail(userEmail);
        const user = res1.data;

        //Get Orders belonging to the connected User
        const queryFilter = { query:{ user_id:user.id } };
        const res2 = await fetchOrdersFromDB(queryFilter);
        const orders = res2.data;
        // console.log("🚀 ~ file: orders.tsx:26 ~ getServerSideProps ~ orders:", orders.length)

        //Get items+product details related to the Orders found
        const ordersIds = orders.map(order => order.id);
        const res3 = await fetchOrderItemsWithProducts(ordersIds)
        const orderItems = res3.data;
        // console.log("🚀 ~ file: orders.tsx:31 ~ getServerSideProps ~ orderItems:", orderItems.length)
        return {
            props:{
                orders: orders,
                items: orderItems,
                session: session
            },
        }
    } catch (error) {
        console.log("[ORDER_DETAILS_PAGE] ERROR FETCHING DATA FROM SERVER");
    }

    return {
      props: {
        orders: [],
        items: [],
        session: session
      },
    };
}

export default Orders;


