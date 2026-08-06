import { ObjectId } from "mongodb";

// Get All Products
export async function getAllProducts(req, reply) {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const collection = req.server.mongo.db.collection("products");

        const products = await collection
            .find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        const total = await collection.countDocuments();

        return reply.code(200).send({
            total,
            page,
            limit,
            products
        });

    } catch (err) {
        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}

// Get Product By ID
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

        return reply.code(200).send(product);

    } catch (err) {

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}

// Add Product

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
                ...newProduct
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


// Update Product
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
            product: updatedProduct
        });

    } catch (err) {

        console.error(err);

        return reply.code(500).send({
            message: err.message
        });
    }
}

// Delete Product

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