import { fetchProductsFromDB } from '@/lib/mongoDB/productQueries';
import { ProductType } from '@/lib/common/Types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message?: string,
    error?: string|null
    products: ProductType[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    try {
        const params = req.query;
        console.log("🚀 ~ file: pages/api/products.ts:18 ~ params:", params)
        // return res.status(200).json({message: "Early return testing", products:[] });

        const queryFilter = params.category? { query:{ category:params.category } } : {};
        const result = await fetchProductsFromDB(queryFilter);
        // console.log("🚀 ~ file: index.js:20 ~ handler ~ result:", result.data.length)

        res.status(200).json({
            message: 'Product handler called successfully',
            products: result.data,
            error: null
        });
    } catch (error) {
        res.status(503).json({
            message: '',
            products: [],
            error: "Something went wrong populating Products table"
        })
    }
}