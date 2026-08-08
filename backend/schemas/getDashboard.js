export const GetDashboardSchema = {
        response:{
            200:{
            type: "object",
            required: [
                "totalProducts",
                "totalOrders",
                "issuedOrders",
                "receivedOrders"
            ],
            properties:{
                totalProducts:{
                    type: "number"
                },
                totalOrders: {
                    type: "number"
                },
                issuedOrders:{
                    type: "number"
                },
                receivedOrders:{
                    type: "number"
                }
            }
        }
    }
}
