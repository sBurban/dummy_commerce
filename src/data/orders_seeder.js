
const orders = [
    {
        "id": 1,
        "user_id": 1,
        // "payment_id": 1,
        "total": 594.35, //Calculate when creating
        "status": "pending",
        "shipping_address":"",
        "created_at": "2023-06-10T20:51:15.835Z", //new Date().toJSON()
        "updated_at": "2023-06-10T20:51:15.835Z",
    },
    {
        "id": 2,
        "user_id": 1,
        // "payment_id": 2,
        "total": 55.9,
        "status": "completed",
        "shipping_address":"",
        "created_at": "2023-06-08T16:15:19.803Z",
        "updated_at": "2023-06-10T20:51:15.835Z",
    },
]

export default orders;