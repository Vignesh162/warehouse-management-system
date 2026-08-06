export const UpdateProductSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: {
                type: "string",
                minLength: 24,
                maxLength: 24
            }
        }
    },

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
                type: "number",
                minimum: 0
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
                product: {
                    type: "object"
                }
            }
        }
    }
};