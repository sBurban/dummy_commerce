import { connectToDatabase } from "./mongodb";
import parseMongoObj from "../utils/parseMongoObj";

import { UserType } from "@/lib/common/Types";
import { TABLE_USERS } from "../dbTables";

export async function fetchUsersFromDB(){
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_USERS);
        const response = await dbCollection.find().toArray();
        const users:UserType[] = response.map(user => {
            return parseMongoObj(user)
        });
        return {
            data: users,
            error: null
        }

    } catch (error) {
        console.log("ERROR GETTING USERS FROM DATABASE")
        throw new Error( (error as Error)?.message);
    }
}

export async function fetchUserById(userId:string){
    const queryId = parseInt(userId);
    try {
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_USERS);
        const response = await dbCollection.findOne({ id: queryId });
        const user:UserType = parseMongoObj(response);
        return {
            data: user,
            error: null
        }

    } catch (error) {
        console.log("ERROR GETTING USER BY ID")
        throw new Error( (error as Error)?.message);
    }

}

export async function fetchUserByEmail(email:string) {
    try {
        if(!email) throw new Error("Email must be a valid string");
        const {client, db} = await connectToDatabase();
        const dbCollection = db.collection(TABLE_USERS);
        const response = await dbCollection.findOne({ email: email });
        // const user:UserType = parseMongoObj(response);
        const user = parseMongoObj(response);
        return {
            data: user,
            error: null
        }
    } catch (error) {
        console.error('ERROR GETTING USER BY EMAIL');
        throw error;
    }
}