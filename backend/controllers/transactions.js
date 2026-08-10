import serializeTransaction from "../helper/serializeTransaction.js";

// Summary: function to get all trasaction.
// Controller which takes limit and page as params (optional) to return transaction in an paginated format.
// @since 1.0.0
export async function getAllTransactions(req, reply) {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const collection = req.server.mongo.db.collection("transactions");

        const transactions = await collection
            .find({})
            .sort({transactionDate:-1})
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const total = await collection.countDocuments();

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