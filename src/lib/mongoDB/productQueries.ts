import { connectToDatabase } from "./mongodb";
import parseMongoObj from "../utils/parseMongoObj";

import { ProductType } from "@/lib/common/Types";
import { TABLE_PRODUCTS } from "../dbTables";

// export type ResponseFromServer = {
//     title: string;
//     content: string;
//     _id: string;
// };

// type ProductsCollectionResponse = {
//     data: ProductType[] | void[],
//     error: string | null
// }
export async function fetchProductsFromDB(){
// export async function fetchProductsFromDB():Promise<ProductsCollectionResponse>{
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_PRODUCTS);
        const response = await dbCollection.find().toArray();
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