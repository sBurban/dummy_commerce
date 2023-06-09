
const payments = [
    {
        "id": 1,
        "user_id": 1,
        "order_id": 1,
        "amount": 594.35, //Calculate when creating
        "provider": "Bank1",
        "status":"Payed",
        "created_at": "", //new Date().toJSON()
        "updated_at": "",
    },
    {
        "id": 2,
        "user_id": 1,
        "order_id": 2,
        "amount": 55.9,
        "provider": "Bank2",
        "status":"Pending",
        "created_at": "",
        "updated_at": "",
    },
]

export default payments;