export const GetProductSchema = {
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

    response: {
        200: {
            type: "object"
        }
    }
};