import { ObjectId } from "mongodb";
import { serializeProduct } from "../helper/serializeProduct.js";

/**
 * Summary: function to get all products.
 * Controller which takes limit and page as params (optional) to return products in an paginated format. It returns product detail, total no of products, current page & current limit.
 * @since 1.0.0
 **/
export async function getAllProducts(req, reply) {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const search = req.query.search?.trim();

        const collection = req.server.mongo.db.collection("products");

        let findQuery = {};

        // Search by product name OR SKU
        if (search) {
            findQuery = {
                $or: [
                    {
                        name: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        sku: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            };
        }

        const products = await collection
            .find(findQuery)
            .sort({updatedAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const total = await collection.countDocuments(findQuery);
        console.log(products);
        return reply.code(200).send({
            total,
            page,
            limit,
            products: products.map(serializeProduct)
        });

    } catch (err) {
        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}
/** 
 * Summary: function to get product details by id. 
 * Controller which takes  productId in params & returns product details.
 * @since 1.0.0 
 */ 
export async function getProductById(req, reply) {

    try {

        const id = req.params.id;
        
        const product = await req.server.mongo.db
            .collection("products")
            .findOne({
                _id: new ObjectId(id)
            });

        if (!product) {
            return reply.code(404).send({
                message: "Product not found"
            });
        }

        return reply.code(200).send(serializeProduct(product));

    } catch (err) {

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}

/**
 * Summary: function to add new product. 
 * Controller which takes name, sku, category, quantity, rackLocation, description in req body to create new product in the database. Product SKU must be unique. It returns the new product & insertedId in response. 
 * @since 1.0.0
 */ 
export async function addProduct(req, reply) {

    try {

        const userId = req.user.id;

        const {
            name,
            sku,
            category,
            quantity,
            rackLocation,
            description
        } = req.body;

        const collection = req.server.mongo.db.collection("products");

        const existing = await collection.findOne({ sku });

        if (existing) {
            return reply.code(409).send({
                message: "SKU already exists"
            });
        }

        const newProduct = {
            name,
            sku,
            category,
            quantity,
            rackLocation,
            description: description || "No description",
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: new ObjectId(userId)
        };

        const result = await collection.insertOne(newProduct);

        return reply.code(201).send({
            message: "Product added successfully",
            product: {
                _id: result.insertedId,
                ...serializeProduct(newProduct)
            }
        });

    } catch (err) {

        if (err.code === 11000) {
            return reply.code(409).send({
                message: "SKU already exists"
            });
        }

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}

/**
 * Summary: function to update existing product details.
 * Description: Controller which takes name, sku, category, quantity, rackLocation, description in req body to update existing product in the database. Product SKU must be unique. It returns the new product & insertedId in response.
 * @since 1.0.0
 */
export async function updateProduct(req, reply) {

    try {
        const id = req.params.id;

        const {
            name,
            sku,
            category,
            quantity,
            rackLocation,
            description
        } = req.body;

        const collection = req.server.mongo.db.collection("products");

        const product = await collection.findOne({
            _id: new ObjectId(id)
        });

        if (!product) {
            return reply.code(404).send({
                message: "Product not found"
            });
        }

        const duplicateSku = await collection.findOne({
            sku,
            _id: {
                $ne: new ObjectId(id)
            }
        });

        if (duplicateSku) {
            return reply.code(409).send({
                message: "SKU already exists"
            });
        }

        await collection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    name,
                    sku,
                    category,
                    quantity,
                    rackLocation,
                    description,
                    updatedAt: new Date()
                }
            }
        );

        const updatedProduct = await collection.findOne({
            _id: new ObjectId(id)
        });

        return reply.code(200).send({
            message: "Product updated successfully",
            product: serializeProduct(updatedProduct)
        });

    } catch (err) {

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}
// Summary: Function to issue or receive product.
// Controller which takes product id in params & quanity, remark, transacctionType in req body to issue or receive product updating existing product quanity in the database. It also stores transaction details in the database. It returns the updated product.
// @since 1.0.0
// issue or receive product 
export async function issueOrReceiveProduct(req, reply) {
    const id = req.params.id;
    let { quantity, remarks, transactionType } = req.body;
    const username = req.user.username;
    const products = req.server.mongo.db.collection("products");
    const transactions = req.server.mongo.db.collection("transactions");

    try {
        const product = await products.findOne({
            _id: new ObjectId(id)
        });

        if (!product) {
            return reply.code(404).send({
                message: "Product not found"
            });
        }

        // update quantity based on transaction type 
        quantity = transactionType ==="ISSUE"?-quantity:quantity;

        // Check if there is Sufficient Stock & Prevent negative stock
        if (transactionType === "ISSUE" && product.quantity < Math.abs(quantity)) {
            return reply.code(409).send({
                message: "Insufficient stock"
            });
        }

        await products.updateOne(
            {
                _id: product._id
            },
            {
                $inc: {
                    quantity: quantity
                },
                $set: {
                    updatedAt: new Date()
                }
            }
        );

        await transactions.insertOne({
            productId: product._id,
            productName: product.name,
            productSKU:product.sku,
            type: transactionType,
            quantity: Math.abs(quantity),
            remarks,
            performedBy: new ObjectId(req.user.id),
            performedByName: username,
            transactionDate: new Date()
        });

        const updatedProduct = await products.findOne({
            _id: product._id
        });

        return reply.code(200).send({
            message: `${transactionType} successful`,
            product: serializeProduct(updatedProduct)  
        });

    } catch (err) {
        console.error(err);
        return reply.code(500).send({
            message: err.message
        });
    }
}

/** Summary: Function to delete a product.
 * Controller which takes product id in params to delete a product.
 * @since 1.0.0
 */
export async function deleteProductById(req, reply) {

    try {

        const id = req.params.id;

        const collection = req.server.mongo.db.collection("products");

        const product = await collection.findOne({
            _id: new ObjectId(id)
        });

        if (!product) {
            return reply.code(404).send({
                message: "Product not found"
            });
        }

        await collection.deleteOne({
            _id: new ObjectId(id)
        });

        return reply.code(200).send({
            message: "Product deleted successfully"
        });

    } catch (err) {

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}