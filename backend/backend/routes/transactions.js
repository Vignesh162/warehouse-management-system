import { GetTransactionsSchema } from "../schemas/getTransactions.js";
import { getAllTransactions } from "../controllers/transactions.js";

export default function transactionRoutes(fastify,options,done){
    fastify.get("/",{
        schema: GetTransactionsSchema,
        preValidation: [fastify.authenticate],
        handler: getAllTransactions});
    done();
}