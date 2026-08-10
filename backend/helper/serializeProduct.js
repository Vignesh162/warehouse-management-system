/**  Summary: Helper function to serialize Product 
 * It is an helper function used to serailze products fields from MongoDB response converting fields like _id (ObjectID) into string
 * @since 1.0.0 
 * */
export function serializeProduct(product) {
    return {
        ...product,
        _id: product._id.toString(),
        createdBy: product.createdBy?.toString(),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString()
    };
}