import * as nextAuthReact from 'next-auth/react';
import { UseSessionOptions } from "next-auth/react";
import { Session } from 'next-auth';
// jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

export const mockUserSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {
    name: "admin"
  }
};
export const mockUpdateSessionNull = () => new Promise<null>((resolve,reject) => resolve(null));
export const mockUpdateSessionAuth = () => new Promise<Session>((resolve,reject) => resolve(mockUserSession));

// export const mockUseSessionNull = { update: mockUpdateSessionNull, data: null, status: 'loading' };
// export const mockUseSessionAuth =  { update: mockUpdateSessionAuth, data: mockUserSession, status: 'authenticated' };

// Default Implementation
// If a Session is implemented in Test file, will need to re-implement Null session manually
nextAuthReactMocked.useSession.mockImplementation(
  (_options?: UseSessionOptions<boolean> | undefined) =>
    ({ update: mockUpdateSessionNull, data: null, status: 'loading' })
);


// nextAuthReactMocked.signIn.mockImplementation(() =>
//   Promise.resolve({ error: '', status: 403, ok: false, url: '' })
// );

export default nextAuthReactMocked;


/********************* */
//https://github.com/nextauthjs/next-auth/discussions/4185 - agangdi on Mar 20, 2022
// jest.mock("next-auth/react", () => {
//     const originalModule = jest.requireActual('next-auth/react');
//     const mockSession = {
//       expires: new Date(Date.now() + 2 * 86400).toISOString(),
//       user: { username: "admin" }
//     };
//     return {
//       __esModule: true,
//       ...originalModule,
//       useSession: jest.fn(() => {
//         // return {}
//         // return {data:{}, status: 'unauthenticated'}
//         return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
//       }),
//     };
// });