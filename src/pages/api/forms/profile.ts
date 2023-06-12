import type { NextApiRequest, NextApiResponse } from 'next'
import { dbUpdateOneFromCollection } from '@/lib/mongoDB/mongoQueries';
import { TABLE_USERS } from '@/lib/common/dbTables';

type Data = {
    message?: string,
    error?: unknown|null
}


export default async function handlerhandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
      try {
        // Process and save the form data to the database
        const formData = req.body;
        const queryParams = { query:{ id:formData.id }, body: formData };
        const response = await dbUpdateOneFromCollection(TABLE_USERS, queryParams);
        // Send response
        res.status(200).json({ message: response.message, error:null });
      } catch (error) {
            res.status(503).json({
                message: 'Unexpected error updating one "${TABLE_USERS}" record.',
                error: error
            })
      }
    } else {
        res.status(405).json({ message: "Method Not Allowed", error:"Method Not Allowed" });
    }
}