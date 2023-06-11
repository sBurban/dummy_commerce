import { connectToDatabase } from "./mongodb";
import parseMongoObj from "../utils/parseMongoObj";

import { ProductType } from "@/lib/common/Types";
import { TABLE_PRODUCTS } from "../dbTables";
import { MONGO_FIND_OptionalParams } from "@/lib/common/Types";


// export async function fetchProductsFromDB({query, fields}?:MONGO_FIND_OptionalParams){
//     if( query === undefined && !query) query = {};
//     if( fields === undefined && !fields) fields = {};

export async function fetchProductsFromDB(params?:MONGO_FIND_OptionalParams){
    if(params === undefined || !params) params = {query:{}, fields:{}};
    if( params.query === undefined && !params.query) params.query = {};
    if( params.fields === undefined && !params.fields) params.fields = {};
    const {query, fields} = params;
    // console.log("🚀 ~ file: productQueries.ts:25 ~ params:", params)
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_PRODUCTS);
        const response = await dbCollection.find(query, {projection: fields}).toArray();
        // const products = response.map(product => {
        const products:ProductType[] = response.map(product => {
            return parseMongoObj(product)
        });
        // console.log("🚀 ~ file: productApi.ts:16 ~ fetchProductsFromDB ~ products:", products)

        return {
            data: products,
            error: null
        }

    } catch (error) {
        console.log("ERROR GETTING PRODUCTS FROM DATABASE")
        throw new Error( (error as Error)?.message);
    }
}

export async function fetchProductById(productId:string){
    const queryId = parseInt(productId);
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_PRODUCTS);
        const response = await dbCollection.findOne({ id: queryId });
        const product:ProductType = parseMongoObj(response);
        console.log("🚀 ~ file: productApi.ts:45 ~ fetchProductById ~ product:", product);
        return {
            data: product,
            error: null
        }

    } catch (error) {
        console.log("ERROR GETTING PRODUCT BY ID")
        throw new Error( (error as Error)?.message);
    }

}