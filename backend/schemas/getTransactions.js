import { Transaction } from "./transaction.js";

export const GetTransactionsSchema = {
    querystring: {
        type: "object",
        properties: {
            page: {
                type: "number",
                minimum: 1,
                default: 1
            },
            limit: {
                type: "number",
                minimum: 1,
                maximum: 100,
                default: 10
            },
            type: {
                type: "string",
                enum: ["RECEIVE", "ISSUE"]
            },
            productId: {
                type: "string",
                minLength: 24,
                maxLength: 24
            },
            performedBy: {
                type: "string",
                minLength: 24,
                maxLength: 24
            }
        }
    },

    response: {
        200: {
            type: "object",
            properties: {
                total: {
                    type: "number"
                },
                page: {
                    type: "number"
                },
                limit: {
                    type: "number"
                },
                transactions: {
                    type: "array",
                    items: Transaction
                }
            }
        }
    }
};