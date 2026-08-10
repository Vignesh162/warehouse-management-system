// Summary: Helper function to serialize Transaction 
// It is an helper function used to serailze Transaction fields from MongoDB response converting fields like _id (ObjectID) into string
// @since 1.0.0
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