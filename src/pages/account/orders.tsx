import AccountWrapper from "@/components/layouts/AccountWrapper";
import { ROUTE_LOGIN } from "@/lib/common/Constants";
import { fetchOrdersFromDB, fetchOrderItemsWithProducts } from "@/lib/mongoDB/orderQueries";
import { OrderType, OrderItemType } from "@/lib/common/Types";

import { authConfig } from "@/lib/auth";
import tsHandler from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

type OrdersPageProps = {
    orders: OrderType[] | [],
    items: OrderItemType[] | [],
}

const Orders = ({orders, items}:OrdersPageProps) =>{

    // console.log("🚀 ~ file: orders.tsx:17 ~ Orders ~ orders:", orders)
    // console.log("🚀 ~ file: orders.tsx:17 ~ Orders ~ items:", items)
    // return ;

    const elemList = orders.length === 0? <h1>No Orders Found</h1>
    : orders.map(order => {

        const orderItems = items.map(item => {
            if(item.order_id === order.id){
                if(!item.product) return;
                const prod = item.product[0];
                return <div className="order_item" key={prod.id}
                    style={{
                        border: "1px solid #f0f0f0",
                        margin: "0.5rem"
                    }}
                >
                    <p>{prod.title}</p>
                    <p>{prod.price}</p>
                    <p>{prod.description}</p>
                    <p>{prod.category}</p>
                    <p>{prod.image}</p>
                    <p>{prod.rating.rate}</p>
                    <p>{prod.rating.count}</p>
                </div>;
            }
        })

        return (
            <div className="container_card" key={order.id} >
                <div className="order_details"
                    style={{
                        padding: '1rem',
                        border: "1px solid #333"
                    }}
                >
                    <p>Ordered on date: {order.created_at}</p>
                    <p>Total: {order.total}</p>
                    <p>Order #{order.id}</p>
                </div>
                {orderItems}
            </div>

        )
    })

    return <>
    <AccountWrapper>
        <h1>Orders Page</h1>
        {elemList}
    </AccountWrapper>
    </>
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authConfig);
    // console.log("🚀 ~ file: orders.tsx:73 ~ getServerSideProps ~ context.req:", context.req)
    console.log("🚀 ~ file: orders.tsx:19 ~ getServerSideProps ~ session:", session);
    // If the user is not authenticated, redirect to the login page
    if (!session) {
      return {
        redirect: {
          destination: ROUTE_LOGIN,
          permanent: false,
        },
      };
    }

    // Fetch additional session-related data using the session object
    try {
        //Get Orders belonging to the connected User
        const response = await fetchOrdersFromDB();
        const orders = response.data;
        // console.log("🚀 ~ file: orders.tsx:26 ~ getServerSideProps ~ orders:", orders.length)

        //Get items+product details related to the Orders found
        const ordersIds = orders.map(order => order.id);
        const res2 = await fetchOrderItemsWithProducts(ordersIds)
        const orderItems = res2.data;
        // console.log("🚀 ~ file: orders.tsx:31 ~ getServerSideProps ~ orderItems:", orderItems.length)
        return {
            props:{
                orders: orders,
                items: orderItems,
            },
        }
    } catch (error) {
        console.log("[ORDER_DETAILS_PAGE] ERROR FETCHING DATA FROM SERVER");
    }

    return {
      props: {
        orders: [],
        items: [],
      },
    };
}

export default Orders;


