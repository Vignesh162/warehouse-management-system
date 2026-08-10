import { Product } from "./product.js";

export const StockSchema = {
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
            "quantity",
            "remarks",
            "transactionType"
        ],
        properties: {
            quantity: {
                type: "number",
                // not: { const: 0 }
                minimum: 0
            },
            remarks: {
                type: "string",
                maxLength:200
            },
            transactionType: {
                type: "string",
                enum: ["RECEIVE", "ISSUE"]
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