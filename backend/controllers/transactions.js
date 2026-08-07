import { ObjectId } from "mongodb";

export async function getAllTransactions(req,reply){
    try{
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const response = await req.server.mongo.db
        .collection("transactions")
        .find({})
        .skip((page-1)* limit)
        .limit(limit)
        .toArray();

        reply.code(200).send({response});
    }catch(err){
        reply.code(500).send({err});
    }
}