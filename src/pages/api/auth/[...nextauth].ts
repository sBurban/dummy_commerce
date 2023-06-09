import { authConfig } from "@/lib/auth";
import NextAuth from "next-auth/next";
import { NextApiRequest, NextApiResponse } from 'next';

// const handler = NextAuth(authConfig);
// // export {handler as GET, handler as POST}
// export default handler;

// export default NextAuth(authConfig);

const tsHandler = (req: NextApiRequest, res: NextApiResponse) =>
NextAuth(req, res, authConfig);

export default tsHandler;