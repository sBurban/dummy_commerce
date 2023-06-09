// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { initUsers } from '@/lib/productApi'
import { initTable } from '@/lib/seederApi';

import { TABLE_PRODUCTS,
  TABLE_USERS,
  TABLE_USER_ADDRESS,
  TABLE_ORDERS,
  TABLE_ORDER_ITEMS,
  TABLE_PAYMENTS,
} from '@/lib/dbTables';

const DbTables = [TABLE_PRODUCTS,
  TABLE_USERS,
  TABLE_USER_ADDRESS,
  TABLE_ORDERS,
  TABLE_ORDER_ITEMS,
  TABLE_PAYMENTS,
]

type Data = {
  message?: string,
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    await DbTables.forEach( async (tablename,idx) =>{
        try {
            const response = await initTable(tablename);
            console.log("🚀 ~ file: init_database.ts:35 ~ DbTables.forEach ~ response:", response.message)
            console.log(`${tablename} table exists.` );
        } catch (error) {
            console.log(`Something went wrong populating [${tablename}] table.`);
        }

    });

    res.status(200).json({ message: 'Request fulfilled' });
}

// http://localhost:3000/api/seeders/init_database