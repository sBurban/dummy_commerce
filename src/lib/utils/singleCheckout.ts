import { SINGLE_CHECKOUT_NAME } from "../common/Constants";

export type SingleCheckoutBody = {
    product_id: number,
}

export function getSessionData() {
    const data = sessionStorage.getItem(SINGLE_CHECKOUT_NAME);
    return data;
    // if (typeof window !== 'undefined') {
    //     const data = sessionStorage.getItem(SINGLE_CHECKOUT_NAME);
    //     return data;
    // }
    // return null;
}

export function setSessionData(productId:number) {
    const data = {product_id: productId};
    sessionStorage.setItem(SINGLE_CHECKOUT_NAME, JSON.stringify(data));
}

export function clear(){
    sessionStorage.removeItem(SINGLE_CHECKOUT_NAME);
    // sessionStorage.clear();
}