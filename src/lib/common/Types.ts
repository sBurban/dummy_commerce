import React, { ReactNode } from 'react';

export type WrapperProps = {
  children: ReactNode;
};
export type UserPageProps = {
    // children: any,
    user: UserType,
    props?: any
}

export type ProductCardProps = {
    // children: any,
    product: ProductType,
    props?: any
}

export type OrderItemProps = {
    orderItem: OrderItemType,
    props?:any
}

export type Mongo_FIND_OptionalParams = {
    query?: {},
    fields?: {}
}



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

export type OrderType = {
    _id?: string,
    id: number,
    user_id: number,
    payment_id: number,
    total: number,
    status: string,
    created_at: string,
    updated_at: string,
}

export type OrderItemType = {
    _id?: string,
    id: number,
    order_id: number,
    product_id: number,
    quantity: number,
    item_total: number,
    status: string,
    created_at: string,
    updated_at: string,
    product?: ProductType[] // 1-1 relation: Expecting only 1 product here
}

export type PaymentType = {
    _id?: string,
    id: number,
    user_id: number,
    order_id: number,
    amount: number,
    provider: string,
    status: string,
    created_at: string,
    updated_at: string,
}