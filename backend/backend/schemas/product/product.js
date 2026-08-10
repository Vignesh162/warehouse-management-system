export const Product = {
    type: "object",
    required: [
        "name",
        "sku",
        "category",
        "quantity",
        "rackLocation"
    ],
    properties: {
        _id: {
            type: "string"
        },
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
        },
        createdAt: {
            type: "string",
            format: "date-time"
        },
        updatedAt: {
            type: "string",
            format: "date-time"
        },
        createdBy: {
            type: "string"
        }
    }
};