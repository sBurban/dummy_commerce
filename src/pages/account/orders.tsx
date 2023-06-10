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
        <CenteredWrapper>
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


