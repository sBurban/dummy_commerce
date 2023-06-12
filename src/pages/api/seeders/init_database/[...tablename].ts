// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { initUsers } from '@/lib/productApi'
import { initTable } from '@/lib/mongoDB/seederQueries';

import { TABLE_PRODUCTS,
  TABLE_USERS,
  TABLE_USER_ADDRESS,
  TABLE_ORDERS,
  TABLE_ORDER_ITEMS,
  TABLE_PAYMENTS,
} from '@/lib/common/dbTables';

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
    if(req.query){
        const queryName = req.query.tablename;
        if(!queryName || queryName.length > 1){
          return res.status(503).json({error: "Unexpected request format. Dropping request."})
        }
        const tablename = queryName[0];
        // console.log("🚀 ~ file: [...tablename].ts:16 ~ queryName:", queryName)
        if(DbTables.indexOf(tablename) !== -1){
          // return res.status(200).json({ message: `${tablename} table request accepted` })

          try {
            const response = await initTable(tablename);
            console.log("🚀 ~ file: [...tablename].ts:43 ~ response:", response.message)

            return res.status(200).json({ message: `${tablename} table exists.` })
          } catch (error) {
            return res.status(503).json({ error: `Something went wrong populating [${tablename}] table.` })
          }
        }
    }

    res.status(503).json({ message: 'Unexpected parameters request.' })
}

// http://localhost:3000/api/seeders/init_database/[tablename]