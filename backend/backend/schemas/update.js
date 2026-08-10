export const UpdateProductSchema = {
    params: ObjectIdParam,

    body: {
        type: "object",
        required: [
            "name",
            "sku",
            "category",
            "quantity",
            "rackLocation"
        ],
        properties: {
            name: {
                type: "string"
            },
            sku: {
                type: "string"
            },
            category: {
                type: "string"
            },
            quantity: {
                type: "number"
            },
            rackLocation: {
                type: "string"
            },
            description: {
                type: "string"
            }
        }
    },

    response: {
        200: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                },
                product: Product
            }
        }
    }
};