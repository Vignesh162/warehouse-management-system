export default function serializeTransaction(transaction) {
    return {
        _id: transaction._id.toString(),
        productId: transaction.productId.toString(),
        productName: transaction.productName,
        productSKU: transaction.productSKU,
        type: transaction.type,
        quantity: transaction.quantity,
        remarks: transaction.remarks,
        performedBy: transaction.performedBy.toString(),
        performedByName: transaction.performedByName,
        transactionDate: transaction.transactionDate.toISOString()
    };
}