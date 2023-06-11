
import { connectToDatabase } from "./mongodb";

import { MONGO_FIND_OptionalParams, MONGO_FINDONE_params } from "../common/Types";
import parseMongoObj from "../utils/parseMongoObj";

import users_seeder from '../../data/users_seeder';
import user_address_seeder from '../../data/user_address_seeder';
// import shopping_session_seeder from '../data/shopping_session_seeder';
// import shopping_items_seeder from '../data/shopping_items_seeder';
import products_seeder from '../../data/products_seeder';
import payments_seeder from '../../data/payments_seeder';
import orders_seeder from '../../data/orders_seeder';
import order_items_seeder from '../../data/order_items_seeder';

import { TABLE_PRODUCTS,
    TABLE_USERS,
    TABLE_USER_ADDRESS,
    TABLE_ORDERS,
    TABLE_ORDER_ITEMS,
    TABLE_PAYMENTS,
} from '../dbTables';

const DB_TABLES = [TABLE_PRODUCTS,
    TABLE_USERS,
    TABLE_USER_ADDRESS,
    TABLE_ORDERS,
    TABLE_ORDER_ITEMS,
    TABLE_PAYMENTS,
]

export async function dbFindFromCollection(TABLE_NAME:string,params?:MONGO_FIND_OptionalParams){
    if(params === undefined || !params) params = {query:{}, fields:{}};
    if( params.query === undefined && !params.query) params.query = {};
    if( params.fields === undefined && !params.fields) params.fields = {};
    const {query, fields} = params;
    try {
        //Check if Table is an expected table to be interact with
        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);

        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_NAME);
        const response = await dbCollection.find(query, {projection: fields} ).toArray();
        const dataArray = response.map(order => {
            return parseMongoObj(order)
        });
        return {
            data: dataArray,
            error: null
        }

    } catch (error) {
        console.log(`ERROR GETTING [${TABLE_NAME}] FROM DATABASE`)
        throw new Error( (error as Error)?.message);
    }
}

export async function dbFindOneFromCollection(TABLE_NAME:string, params?:MONGO_FINDONE_params){
    try {
        if(!params || !params.query) throw new Error(`Unexpected query object format.`);
        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);

        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_PRODUCTS);
        const response = await dbCollection.findOne(params.query); //i.e {id: 1}
        const docobj = parseMongoObj(response);
        console.log("🚀 ~ file: mongoQueries.ts:69 ~ dbFindOneFromCollection ~ docobj:", docobj)
        return {
            data: docobj,
            error: null
        }

    } catch (error) {
        console.log("ERROR FINDING RECORD ON DB")
        throw new Error( (error as Error)?.message);
    }

}