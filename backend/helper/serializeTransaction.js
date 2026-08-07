export default function serializeTransaction(transaction) {
    return {
        _id: transaction._id.toString(),
        productId: transaction.productId.toString(),
        type: transaction.type,
        quantity: transaction.quantity,
        remarks: transaction.remarks,
        performedBy: transaction.performedBy.toString(),
        transactionDate: transaction.transactionDate.toISOString()
    };
}