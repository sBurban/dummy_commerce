import { SINGLE_CHECKOUT_NAME } from "../common/Constants";

export function getSessionData() {
    const data = sessionStorage.getItem(SINGLE_CHECKOUT_NAME);
    return data;
}

export function setSessionData(productId:number) {
    const data = {product_id: productId};
    sessionStorage.setItem(SINGLE_CHECKOUT_NAME, JSON.stringify(data));
}

export function clear(){
    sessionStorage.removeItem(SINGLE_CHECKOUT_NAME);
    // sessionStorage.clear();
}