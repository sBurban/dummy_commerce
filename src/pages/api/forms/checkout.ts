import type { NextApiRequest, NextApiResponse } from 'next'
import { dbCreateOneFromCollection, dbCreateManyFromCollection, dbCountFromCollection } from '@/lib/mongoDB/mongoQueries';
import { TABLE_ORDERS, TABLE_PAYMENTS, TABLE_ORDER_ITEMS } from '@/lib/common/dbTables';

type Data = {
    message?: string,
    error?: unknown|null
}

export default async function handlerhandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // let response = await dbCountFromCollection(TABLE_ORDERS);
    // console.log("🚀 ~ file: checkout.ts:30 ~ response:", response)
    if (req.method === 'POST') {
      try {
        const formData = req.body;
        console.log("🚀 ~ file: checkout.ts:34 ~ formData:", formData)
        if(!formData){
            return res.status(503).json({error: "Request [Body] not found. Dropping the request."})
        }

        //Need to get the "Count" number of records in the Collection to correctly assign new 'Id' values
        //Due to the way the DB Ids are being handled with MongoDB for this project

        //Create 1 Order
        // const orderCount = 2;
        const count1 = await dbCountFromCollection(TABLE_ORDERS);
        const orderCount = count1 || 1;
        const newOrderId = orderCount+1;
        const newOrderObj = {
            id: newOrderId,
            user_id: formData.user.id,
            total: formData.total,
            status: "pending",
            shipping_address: formData.shipping_address,
            created_at: formData.current_date,
            updated_at: formData.current_date,
        }
        const res1 = await dbCreateOneFromCollection(TABLE_ORDERS, newOrderObj);
        // console.log("🚀 ~ file: checkout.ts:43 ~ res1:", res1)

        //Create 1 Payment
        // const paymentCount = 2;
        const count2 = await dbCountFromCollection(TABLE_PAYMENTS);
        const paymentCount = count2 || 1;

        const newPaymentId = paymentCount+1;
        const newPaymentObj = {
            id: newPaymentId,
            user_id: formData.user.id,
            order_id: newOrderId, //newOrder.id,
            amount: formData.total,
            shipping_address: formData.shipping_address,
            ...formData.payment_data,
            created_at: formData.current_date,
            updated_at: formData.current_date,
        }
        const res2 = await dbCreateOneFromCollection(TABLE_PAYMENTS, newPaymentObj);

        // //Create multiple Order Items
        // const itemsCount = 3;
        const count3 = await dbCountFromCollection(TABLE_ORDER_ITEMS);
        const itemsCount = count3 || 1;
        let newItemId = itemsCount+1;
        const newItemsList = formData.orderitems.map((item:any) =>{
            const newItem = {
                id: newItemId,
                order_id: newOrderId, //newOrder.id,
                shipping_address: formData.shipping_address,
                ...item,
                created_at: formData.current_date,
                updated_at: formData.current_date,
            }
            newItemId++;
            return newItem;
        })
        const res3 = await dbCreateManyFromCollection(TABLE_ORDER_ITEMS, newItemsList)


        // Send response
        res.status(200).json({ message: "Checkout successfully completed!", error:null });
      } catch (error) {
            res.status(503).json({
                message: 'Unexpected error updating one "${TABLE_USERS}" record.',
                error: error
            })
      }
    } else {
        res.status(405).json({ message: "Method Not Allowed", error:"Method Not Allowed" });
    }
}