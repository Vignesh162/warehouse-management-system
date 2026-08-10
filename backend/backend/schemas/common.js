export const ObjectIdParam = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string",
            minLength: 24,
            maxLength: 24
        }
    }
};

export const MessageResponse = {
    type: "object",
    properties: {
        message: {
            type: "string"
        }
    }
};