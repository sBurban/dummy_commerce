
export type ProductType = {
    _id?: string,
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating:{
        rate: number,
        count: number
    }
}

export type UserType = {
    _id?: string,
    id: number,
    email: string,
    name: string,
    image: string,
    password: string,
    username: string,
    first_name: string,
    last_name: string,
    telephone: string,
}