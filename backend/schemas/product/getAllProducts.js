import { Product } from "./product.js";

export const GetAllProductsSchema = {
    querystring: {
        type: "object",
        properties: {
            page: {
                type: "number",
                minimum: 1
            },
            limit: {
                type: "number",
                minimum: 1
            },
            search: {
                type: "string",
                minLength: 1,
                maxLength: 100,
            },
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
                products: {
                    type: "array",
                    items: Product
                }
            }
        }
    }
};