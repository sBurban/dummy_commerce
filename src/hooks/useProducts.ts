import {useState, useEffect} from 'react';
import axios from 'axios';
import { ProductType } from '@/lib/common/Types';

const BASEURL = '/api/products';

type ProductFilteringParams = {
    category?: string,
}

const useProducts = ({category}:ProductFilteringParams) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [error, setError] = useState<string|null>(null);
    useEffect(() => {
      getProducts();
    }, [])
    const getProducts = async () => {
        try {
            let extraParams = "";
            // if(id){
            //     extraParams ="?id="+id;
            // }else
            if(category){
                extraParams = "?category="+category;
            }
            const result = await axios.get( BASEURL + extraParams );
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