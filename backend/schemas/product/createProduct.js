export const CreateProductSchema = {
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
                type: "string",
                minLength: 2
            },
            sku: {
                type: "string",
                minLength: 2
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
        201: {
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