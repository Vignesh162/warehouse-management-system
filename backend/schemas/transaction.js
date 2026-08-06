export const TransactionSchema = {
    type: "object",
    properties: {
        _id: {
            type: "string"
        },
        productId: {
            type: "string"
        },
        type: {
            type: "string",
            enum: [
                "RECEIVE",
                "ISSUE"
            ]
        },
        quantity: {
            type: "number"
        },
        remarks: {
            type: "string"
        },
        performedBy: {
            type: "string"
        },
        transactionDate: {
            type: "string",
            format: "date-time"
        }
    }
};