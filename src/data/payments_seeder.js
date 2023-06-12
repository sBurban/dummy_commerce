
const payments = [
    {
        "id": 1,
        "user_id": 1,
        "order_id": 1,
        "amount": 594.35, //Calculate when creating
        "provider": "Bank1",
        "status":"Payed",
        "created_at": "2023-06-10T20:51:15.835Z", //new Date().toJSON()
        "updated_at": "2023-06-10T20:51:15.835Z",
    },
    {
        "id": 2,
        "user_id": 1,
        "order_id": 2,
        "amount": 55.9,
        "provider": "Bank2",
        "status":"Pending",
        "created_at": "2023-06-08T16:15:19.803Z",
        "updated_at": "2023-06-10T20:51:15.835Z",
    },
]

export default payments;