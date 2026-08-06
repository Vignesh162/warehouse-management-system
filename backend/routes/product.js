import { addProduct, getAllProducts, getProductById, updateProduct, deleteProductById } from "../controllers/product.js";

export default function productRoutes(fastify, options, done) {

    // get products
    fastify.get("/", {
        preValidation: [fastify.authenticate],
        handler: getAllProducts
    });

    // Get item by id
    fastify.get("/:id", {
        preValidation: [fastify.authenticate],
        handler: getProductById
    });

    // Add item
    fastify.post("/", {
        preValidation: [fastify.authenticate],
        handler: addProduct
    });

    // update item
    fastify.put("/:id", {
        preValidation: [fastify.authenticate],
        handler: updateProduct
    });

    // delete item
    fastify.delete("/:id", {
        preValidation: [fastify.authenticate],
        handler: deleteProductById
    });
    done();
}