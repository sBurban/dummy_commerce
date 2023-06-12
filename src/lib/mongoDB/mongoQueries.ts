
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

import { DbTables } from '../common/dbTables';
const DB_TABLES = DbTables;

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
    //If querying for Id values, remember to verify if they're 'number' type first. Else the query will fail
    try {
        if(!params || !params.query) throw new Error(`Unexpected query object format.`);
        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);
        console.log("🚀 ~ file: mongoQueries.ts:66 ~ dbFindOneFromCollection ~ params.query:", params.query)

        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_NAME);
        const response = await dbCollection.findOne(params.query); //i.e {id: 1}
        console.log("🚀 ~ file: mongoQueries.ts:66 ~ dbFindOneFromCollection ~ response:", response)
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

type MONGO_UPDATEONE_params = {
    query: {},
    body: Record<string, any>
}

export async function dbUpdateOneFromCollection(TABLE_NAME:string, params?:MONGO_UPDATEONE_params){
    try {
        if(!params || !params.query) throw new Error(`Unexpected query object format`);
        if(!params.body) throw new Error("Request has no [body] to update");
        const {query, body} = params;

        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_NAME);
        const response = await dbCollection.updateOne(query, { $set:{ ...body } }, {upsert: false}); //i.e {id: 1}
        // console.log("🚀 ~ file: mongoQueries.ts:97 ~ dbUpdateOneFromCollection ~ response:", response)
        return {
            // data: response,
            message:"Record successfully updated",
            error: null
        }

    } catch (error) {
        console.log(`ERROR TRYING TO UPDATE [${TABLE_NAME} record]`)
        throw new Error( (error as Error)?.message);
    }
}

export async function dbCreateOneFromCollection(TABLE_NAME:string, document:any){
    try {
        if(!document) throw new Error("Request has no [body] object");

        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_NAME);
        const response = await dbCollection.insertOne(document); //i.e {id: 1}
        console.log(`🚀 ~ file: mongoQueries.ts:105 ~ dbCreateOneFromCollection ~ [${TABLE_NAME}]:`, response)
        return {
            data: response,
            message:"Record successfully created",
            error: null
        }

    } catch (error) {
        console.log(`ERROR TRYING TO CREATE [${TABLE_NAME} record]`)
        throw new Error( (error as Error)?.message);
    }
}

export async function dbCreateManyFromCollection(TABLE_NAME:string, documents:any[]){
    try {
        if(!documents) throw new Error("Request has no [body] object");

        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_NAME);
        const response = await dbCollection.insertMany(documents); //i.e {id: 1}
        console.log(`🚀 ~ file: mongoQueries.ts:126 ~ dbCreateManyFromCollection ~ [${TABLE_NAME}]:`, response)
        return {
            data: response,
            message:"Records successfully created",
            error: null
        }

    } catch (error) {
        console.log(`ERROR TRYING TO CREATE [${TABLE_NAME} records]`)
        throw new Error( (error as Error)?.message);
    }
}

export async function dbCountFromCollection(TABLE_NAME:string){
    try {
        if(DB_TABLES.indexOf(TABLE_NAME) === -1) throw new Error(`Table [${TABLE_NAME}] not found.`);

        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_NAME);
        const response = await dbCollection.countDocuments(); //i.e {id: 1}
        console.log(`🚀 ~ file: mongoQueries.ts:146 ~ dbCountFromCollection ~ [${TABLE_NAME}]:`, response)
        return response;
        // return {
        //     data: response,
        //     message:"Records successfully created",
        //     error: null
        // }
    } catch (error) {
        console.log(`ERROR TRYING TO COUNT [${TABLE_NAME} records]`)
        throw new Error( (error as Error)?.message);
    }
}