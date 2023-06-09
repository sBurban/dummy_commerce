// Endpoints created to easily populate MongoDB tables from existing JSON files
// Makes it easier to drop Tables on MongoDB and recreate it with new Columns if needed
// Or to repopulate a whole new Database from scratch

import { connectToDatabase } from "./mongodb";

import { TABLE_PRODUCTS,
    TABLE_USERS,
    TABLE_USER_ADDRESS,
    TABLE_ORDERS,
    TABLE_ORDER_ITEMS,
    TABLE_PAYMENTS,
} from '../dbTables';

import users_seeder from '../../data/users_seeder';
import user_address_seeder from '../../data/user_address_seeder';
// import shopping_session_seeder from '../data/shopping_session_seeder';
// import shopping_items_seeder from '../data/shopping_items_seeder';
import products_seeder from '../../data/products_seeder';
import payments_seeder from '../../data/payments_seeder';
import orders_seeder from '../../data/orders_seeder';
import order_items_seeder from '../../data/order_items_seeder';

type TableMap = Record<string, any>;

const Seeders_Table_Map:TableMap = {
    [TABLE_PRODUCTS]: products_seeder,
    [TABLE_USERS]: users_seeder,
    [TABLE_USER_ADDRESS]: user_address_seeder,
    [TABLE_ORDERS]: orders_seeder,
    [TABLE_ORDER_ITEMS]: order_items_seeder,
    [TABLE_PAYMENTS]: payments_seeder,
}

export async function initTable(tableName:string){
    try {
        const jsonData = Seeders_Table_Map[tableName];
        if(!jsonData) throw new Error("Table not found.");

        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(tableName);
        const response = await dbCollection.find().toArray();
        console.log("🚀 ~ file: productApi.ts:68 ~ initUsers ~ response:", response.length)

        //If Table already contains data, simply returns the existing data without editing anything.
        if(response.length === 0){
            console.log(`🚀 ~ file: productApi.ts:70 ~ initUsers ~ [CREATING ${tableName} TABLE]:`)
            let newArr = jsonData;
            const result = await dbCollection.insertMany(newArr);
            return {
                data: result,
                message: `CREATED NEW TABLE [${tableName}]`,
            }
        }
        return {
            data: response,
            message: `RETURNING EXISTING TABLE [${tableName}]`,
        }
    } catch (error) {
        console.log("🚀 ~ file: seederApi.ts:60 ~ initTable ~ error:", (error as Error)?.message)
        throw error;
    }
}