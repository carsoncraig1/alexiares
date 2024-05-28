// V2 format payload. For the /event/track endpoint

const payload = {
    event_source: "web",
    event_source_id: "PIXELCODE",
    data: [
        {
            event: "EVENT",
            event_time: "",
            event_id: "",
            user: {
                ttclid: "",
                email: "SHA256",
                phone: "SHA256",
                external_id: "SHA256",
                ttp: "",
                ip: "",
                user_agent: "",
                locale: ""

            },
            properties: {
                contents: {
                    price: float,
                    quantity: integer,
                    content_id: "",
                    content_category: "",
                    content_name: "",
                    brand: ""
                },
                content_type: "product/product_group",
                currency: "USD",
                value: float,
                query: "",
                description: "",
                order_id: "",
                shop_id: ""
            },
            page: {
                url: "Required",
                referrer: ""
            },
            limited_data_use: boolean
        }
    ]
};
