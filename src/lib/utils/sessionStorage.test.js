import {getSessionData, setSessionData, clearSession} from './singleCheckout';
import { SINGLE_CHECKOUT_NAME } from '../common/Constants';

const localStorageMock = (() =>  {
    let store = {};
    return {
        getItem(key){
            return store[key] || null;
        },
        setItem(key, value){
            store[key] = value.toString();
        },
        removeItem(key){
            delete store[key];
        },
        clear(){
            store = {};
        }
    }
})();

Object.defineProperty(window, 'sessionStorage',{
    value: localStorageMock
})

describe('Session Storage functions', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
        jest.restoreAllMocks();
    })

    test('should get info from session storage', () => {
        const dataObj = {product_id: 1};

        const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
        window.sessionStorage.setItem(SINGLE_CHECKOUT_NAME, JSON.stringify(dataObj));
        const actualValue = JSON.parse(getSessionData());
        expect(actualValue).toEqual(dataObj);
        expect(getItemSpy).toBeCalledWith(SINGLE_CHECKOUT_NAME);
    })

    test('should get empty object if no info in session storage', () => {
        const dataObj = {product_id: 1};

        const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
        const actualValue = JSON.parse(getSessionData());
        expect(actualValue).toBeNull();
        expect(window.sessionStorage.getItem).toBeCalledWith(SINGLE_CHECKOUT_NAME);
        expect(getItemSpy).toBeCalledWith(SINGLE_CHECKOUT_NAME);
    })

    test('should set info in session storage', () => {
        const dataObj = {product_id: 1};
        const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem');
        setSessionData(1);
        const savedValue = JSON.parse(window.sessionStorage.getItem(SINGLE_CHECKOUT_NAME));
        expect(savedValue).toEqual(dataObj);
        expect(setItemSpy).toBeCalledWith(SINGLE_CHECKOUT_NAME, JSON.stringify(dataObj));

    })
    // test('CLEAR Session Data', () => {

    // })
})