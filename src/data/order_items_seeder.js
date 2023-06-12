
const order_items = [
    {
        "id": 1,
        "order_id": 1,
        "product_id": 1,
        "quantity": 5,
        "item_total": 549.75,//Calc on creation
        "status": "pending",
        "shipping_address":"",
        "created_at": "2023-06-10T20:51:15.835Z",//new Date().toJSON()
        "updated_at": "2023-06-10T20:51:15.835Z"
    },
    {
        "id": 2,
        "order_id": 1,
        "product_id": 2,
        "quantity": 2,
        "item_total":44.6,
        "status": "preparing",
        "shipping_address":"",
        "created_at": "2023-06-10T20:51:15.835Z",
        "updated_at": "2023-06-10T20:51:15.835Z"
    },
    {
        "id": 3,
        "order_id": 2,
        "product_id": 3,
        "quantity": 1,
        "item_total": 55.9,
        "status": "arrived",
        "shipping_address":"",
        "created_at": "2023-06-08T16:15:19.803Z",
        "updated_at": "2023-06-10T20:51:15.835Z"
    },
]

export default order_items;