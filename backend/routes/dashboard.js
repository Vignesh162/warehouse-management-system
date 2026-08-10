import { GetDashboardSchema } from "../schemas/getDashboard.js";

export default function dashboardRoutes(fastify, options, done) {
    fastify.get("/", {
        schema: GetDashboardSchema,
        handler: async(req, reply) => {
            
            const db = req.server.mongo.db;
            const productsCollection = db.collection("products");
            const transactionsCollection = db.collection("transactions");

            const totalProducts = await productsCollection.countDocuments();
            const totalOrders = await transactionsCollection.countDocuments();
            const issuedOrders = await transactionsCollection.countDocuments({type:"ISSUE"});
            const receivedOrders = await transactionsCollection.countDocuments({type:"RECEIVE"});
            
            return reply.code(200).send({
                totalOrders,
                totalProducts,
                issuedOrders,
                receivedOrders
            });
        },
        preValidation: [fastify.authenticate]
    });
    done();
}