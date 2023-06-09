
export default function parseMongoObj(mongoObj){
    if(mongoObj._id){
        const newObj = {...mongoObj, _id: mongoObj._id.toString()}
        return newObj;
    }
    return mongoObj;
}