export  const Transaction = {
    type: "object",
    required: [
        "_id",
        "productId",
        "productName",
        "productSKU",
        "type",
        "quantity",
        "performedBy",
        "performedByName",
        "transactionDate"
    ],
    properties: {
        _id: {
            type: "string"
        },
        productId: {
            type: "string"
        },
        productName: {
            type: "string"
        },
        productSKU: {
            type: "string"
        },
        type: {
            type: "string",
            enum: ["RECEIVE", "ISSUE"]
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
        performedByName: {
            type: "string"
        },
        transactionDate: {
            type: "string",
            format: "date-time"
        }
    }
};