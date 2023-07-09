import AccountWrapper from "@/components/layouts/AccountWrapper";
import CenteredWrapper from "@/components/layouts/CenteredWrapper";

import { fetchOrdersFromDB, fetchOrderItemsWithProducts } from "@/lib/mongoDB/orderQueries";
import { fetchUserByEmail } from "@/lib/mongoDB/userQueries";
import { OrderType, OrderItemType } from "@/lib/common/Types";

import { isLoginRequiredServer } from "@/lib/auth";
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

import { Orders } from "@/components/pageComponentsAccount/Orders";

export type OrdersPageProps = {
    orders: OrderType[] | [],
    items: OrderItemType[] | [],
}

export default function OrdersPage({orders, items}:OrdersPageProps){

    return <>
    <AccountWrapper>
        <CenteredWrapper mySize="long" >
            <Orders
                {...{
                    orders,
                    items
                }}
            />
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

