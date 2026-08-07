import { addProduct, getAllProducts, getProductById, updateProduct, issueOrReceiveProduct, deleteProductById } from "../controllers/product.js";

import { GetProductSchema } from "../schemas/product/getProduct.js";
import { GetAllProductsSchema } from "../schemas/product/getAllProducts.js";
import { CreateProductSchema } from "../schemas/product/createProduct.js";
import { UpdateProductSchema } from "../schemas/product/updateProduct.js";
import { DeleteProductSchema } from "../schemas/product/deleteProduct.js";
//import { Product } from "../schemas/product/product.js";
import { StockSchema } from "../schemas/product/stock.js";



export default function productRoutes(fastify, options, done) {

    // get products
    fastify.get("/", {
        schema: GetAllProductsSchema,
        preValidation: [fastify.authenticate],
        handler: getAllProducts
    });

    // Get item by id
    fastify.get("/:id", {
        //schema: GetProductSchema,
        preValidation: [fastify.authenticate],
        handler: getProductById
    });

    // Add item
    fastify.post("/", {
        schema: CreateProductSchema,
        preValidation: [fastify.authenticate],
        handler: addProduct
    });

    // update item
    fastify.put("/:id", {
        schema: UpdateProductSchema,
        preValidation: [fastify.authenticate],
        handler: updateProduct
    });

    // issue / recive product route
    fastify.patch("/:id/stock",{
        schema: StockSchema,
        preValidation: [fastify.authenticate],
        handler: issueOrReceiveProduct
    })

    // delete item
    fastify.delete("/:id", {
        schema:DeleteProductSchema,
        preValidation: [fastify.authenticate],
        handler: deleteProductById
    });
    done();
}