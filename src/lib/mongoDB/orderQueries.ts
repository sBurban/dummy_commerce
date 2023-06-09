import { connectToDatabase } from "./mongodb";
import parseMongoObj from "../utils/parseMongoObj";

import { OrderType, OrderItemType } from "@/lib/common/Types";
import { TABLE_ORDERS, TABLE_ORDER_ITEMS, TABLE_PRODUCTS } from "../dbTables";
import { Mongo_FIND_OptionalParams } from "@/lib/common/Types";

export async function fetchOrdersFromDB(params?:Mongo_FIND_OptionalParams){
    if(params === undefined || !params) params = {query:{}, fields:{}};
    if( params.query === undefined && !params.query) params.query = {};
    if( params.fields === undefined && !params.fields) params.fields = {};
    const {query, fields} = params;
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_ORDERS);
        const response = await dbCollection.find(query, {projection: fields} ).toArray();
        const orders:OrderType[] = response.map(order => {
            return parseMongoObj(order)
        });
        return {
            data: orders,
            error: null
        }

    } catch (error) {
        console.log("ERROR GETTING ORDERS FROM DATABASE")
        throw new Error( (error as Error)?.message);
    }
}

export async function fetchOrderItemsFromDB(){
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_ORDER_ITEMS);
        const response = await dbCollection.find().toArray();
        const orderItems:OrderItemType[] = response.map(item => {
            return parseMongoObj(item)
        });
        return {
            data: orderItems,
            error: null
        }

    } catch (error) {
        console.log("ERROR GETTING Order-Items FROM DATABASE")
        throw new Error( (error as Error)?.message);
    }
}

export async function fetchOrderItemsWithProducts(idsArray:number[]){
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_ORDER_ITEMS);
        const response = await dbCollection.aggregate([
            {
              $match: { order_id: { $in: idsArray } } // Filter based on IDs
            },
            {
              $lookup: {
                from: TABLE_PRODUCTS, // Name of the other collection
                localField: 'product_id', // Field in the current collection
                foreignField: 'id', // Field in the other collection
                as: 'product' // Output array field containing the associated data
              }
            },
            {
                $project: {
                  'product._id': 0, // excluse field with 0
                }
            }
        ]).toArray();

        const orderItems:OrderItemType[] = response.map(item => {
            return parseMongoObj(item)
        });
        return {
            data: orderItems,
            error: null
        }
    } catch (error) {
        console.log("ERROR GETTING Detailed-Order-Items FROM DATABASE")
        throw new Error( (error as Error)?.message);
    }
}