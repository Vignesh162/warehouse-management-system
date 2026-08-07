export function serializeProduct(product) {
    return {
        ...product,
        _id: product._id.toString(),
        createdBy: product.createdBy?.toString(),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString()
    };
}