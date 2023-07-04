import * as nextAuthReact from 'next-auth/react';
import { UseSessionOptions } from "next-auth/react";
// jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

export const mockUpdateSession = () => (new Promise((resolve,reject) => resolve(null)));

export const mockUserSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {
    name: "admin"
  }
};

nextAuthReactMocked.useSession.mockImplementation(
  (_options?: UseSessionOptions<boolean> | undefined) => {
    return { update: () => (new Promise((resolve,reject) => resolve(null))), data: null, status: 'loading' };
  }
);

export default nextAuthReactMocked;


/********************* */
// const originalModule = jest.requireActual('next-auth/react');

// const userSession = {
//   expires: new Date(Date.now() + 2 * 86400).toISOString(),
//   user: {
//     name: "admin"
//     // username: "admin"
//   }
// };

// export const mockNextAuth = jest.mock("next-auth/react", () => {
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       // return {}
//       // return {data:{}, status: 'unauthenticated'}
//       return {
//         data: userSession,
//         status: 'authenticated'
//       }  // return type is [] in v3 but changed to {} in v4
//     }),
//   };
// });

// export default mockNextAuth;