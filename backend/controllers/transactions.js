import { ObjectId } from "mongodb";
import serializeTransaction from "../helper/serializeTransaction.js";

// Summary: Get all transactions.
// Supports pagination and filtering by product, SKU, name and transaction type.
// @since 1.0.0
export async function getAllTransactions(req, reply) {

    try {

        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const productId = req.query.productId;
        const search = req.query.search;    
        const transactionType = req.query.transactionType;

        const collection =
            req.server.mongo.db.collection("transactions");

        let findQuery = {};

        // Search by product name OR product SKU
        if (search) {

            const escapedSearch =
                search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            findQuery.$or = [
                {
                    productName: {
                        $regex: escapedSearch,
                        $options: "i"
                    }
                },
                {
                    productSKU: {
                        $regex: escapedSearch,
                        $options: "i"
                    }
                }
            ];
        }

        // Filter by product ID
        if (productId) {
            findQuery.productId = new ObjectId(productId);
        }

        // Filter by transaction type
        if (transactionType) {
            findQuery.type = transactionType;
        }

        const transactions = await collection
            .find(findQuery)
            .sort({ transactionDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        // count only matching transactions
        const total = await collection.countDocuments(findQuery);

        return reply.code(200).send({
            total,
            page,
            limit,
            transactions: transactions.map(serializeTransaction)
        });

    } catch (err) {

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}