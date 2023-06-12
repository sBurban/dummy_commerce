import {useState, useEffect} from 'react';
import axios from 'axios';
import { ProductType } from '@/lib/common/Types';

import { ROUTE_PRODUCTS_API } from '@/lib/common/Constants';
// const BASEURL = '/api/products';

type ProductFilteringParams = {
    id?: number
    category?: string,
}

const useProducts = ({id, category}:ProductFilteringParams) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [error, setError] = useState<string|null>(null);
    useEffect(() => {
      getProducts();
    }, [])
    const getProducts = async () => {
        try {
            let extraParams = "";
            if(id){
                extraParams ="?id="+id;
            }else if(category){
                extraParams = "?category="+category;
            }
            const result = await axios.get( ROUTE_PRODUCTS_API + extraParams );
            setProducts(result.data.products)
        } catch (error) {
            setError("Unexpected error loading products")
            setProducts([]);
        }
    }
    return{
        products,
        error
    };
}

export default useProducts;