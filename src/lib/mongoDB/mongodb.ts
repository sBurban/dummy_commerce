// const {MongoClient} = require('mongodb');
import { Collection, Db, Document, MongoClient } from "mongodb";

const dbname = process.env.MONGODB_DBNAME;
const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null;
let cachedDB:Db|null;

export async function connectToDatabase(){

    if(!uri || !dbname){
        throw new Error("No URI available for MongoDB connection.")
    }

    // If a Cached Connection exists
    if(cachedClient && cachedDB){
        console.log("Existing cached connection found!");
        return {client: cachedClient, db: cachedDB};
    }

    try{
        //Connect to MongoDB Atlas
        const client = await MongoClient.connect(uri);
        //Choose the DB to use
        const db = await client.db(dbname);
        cachedClient = client;
        cachedDB = db;

        //handle server process termination to close the database connection
        process.on('beforeExit', () => {
            client.close();
        })
        console.log("🚀 ~ file: mongodb.ts:25 ~ process.on ~ beforeExit:")

        return {client, db};
    }catch(error){
        console.log("🚀 ~ file: mongodb.ts:29 ~ connectToDatabase ~ error:", error)
        console.log("ERROR acquiring DB connection");
        throw new Error( (error as Error)?.message);
    }
}