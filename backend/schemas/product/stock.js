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
            "remarks"
        ],
        properties: {
            quantity: {
                type: "number",
                not: { const: 0 }
            },
            remarks: {
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