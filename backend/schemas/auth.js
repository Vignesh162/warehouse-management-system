export const RegisterSchema = {
    body: {
        type: "object",
        required: [
            "name",
            "username",
            "password"
        ],
        properties: {
            name: {
                type: "string",
                minLength: 2,
                maxLength: 100
            },
            username: {
                type: "string",
                minLength: 4,
                maxLength: 30
            },
            password: {
                type: "string",
                minLength: 6,
                maxLength: 100
            }
        }
    },

    response: {
        201: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                },
                token: {
                    type: "string"
                },
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        username: {
                            type: "string"
                        }
                    }
                }
            }
        },

        409: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
};

export const LoginSchema = {
    body: {
        type: "object",
        required: [
            "username",
            "password"
        ],
        properties: {
            username: {
                type: "string"
            },
            password: {
                type: "string"
            }
        }
    },

    response: {
        200: {
            type: "object",
            properties: {
                token: {
                    type: "string"
                },
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        username: {
                            type: "string"
                        }
                    }
                }
            }
        },

        401: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
};