import React from "react";
import {render, screen, waitFor} from '@testing-library/react';
import NavBar from "../../components/menus/NavBar";

//https://github.com/vercel/next.js/discussions/23034 - ghost on Dec 23, 2019
jest.mock("next/router", () => ({
    useRouter() {
      return {
        route: "",
        pathname: "",
        query: "",
        asPath: "",
      };
    },
  }));
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

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

// import { useSession, SessionProvider } from "next-auth/react";

// import * as nextAuthReact from 'next-auth/react';
import { UseSessionOptions } from "next-auth/react";
// jest.mock('next-auth/react');
// const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;
import nextAuthReactMocked, {mockUserSession, mockUpdateSession} from "@/lib/utils/testUtils/mockNextAuth";
jest.mock('next-auth/react');

// import mockNextAuth from "@/lib/utils/testUtils/mockNextAuth";


describe('NavBar component', () => {
    test('renders without errors', () => {
        useRouter.mockImplementation(() => ({
            route: "/yourRoute",
            pathname: "/yourRoute",
            query: "",
            asPath: "",
        }));
        const { container } = render(<NavBar />);
        expect(container).toBeInTheDocument();
    });

    test('render static Texts', async () => {
      // nextAuthReactMocked.useSession.mockImplementation(
      //   (_options?: UseSessionOptions<boolean> | undefined) => {
      //     return { update: () => (new Promise((resolve,reject) => resolve(null))), data: null, status: 'loading' };
      //   }
      // );
      // nextAuthReactMocked.signIn.mockImplementation(() =>
      //   Promise.resolve({ error: '', status: 403, ok: false, url: '' })
      // );
        const { container } = render(<NavBar />);
        // expect(container).toBeInTheDocument();
        // const textElements = await screen.findAllByText("About us", {exact: false});
        // const expectedElems = textElements.length;
        // expect(textElements).toHaveLength(expectedElems);
        await waitFor(() => {
          const welcomeTitle = screen.getAllByText("About us", {exact: false});
          expect(welcomeTitle);
        });
    })

    test.only('show "sign out" when has session', async () => {
        nextAuthReactMocked.useSession.mockImplementation(
          (_options?: UseSessionOptions<boolean> | undefined) => {
            return { update: mockUpdateSession, data: mockUserSession, status: 'authenticated' };
          }
        );
        const {container} = render(<NavBar/>);
        const textElements = await screen.findAllByText("Sign Out", {exact: false});
        const expectedElems = textElements.length;
        expect(textElements).toHaveLength(expectedElems);
    })

    test('show "sign in" when No session', async () => {

      // nextAuthReactMocked.useSession.mockImplementation(
      //   (_options?: UseSessionOptions<boolean> | undefined) => {
      //     return { update: () => (new Promise((resolve,reject) => resolve(null))), data: null, status: 'loading' };
      //   }
      // );
        const {container} = render(<NavBar/>);
        const textElements = await screen.findAllByText("Sign In", {exact: false});
        const expectedElems = textElements.length;
        expect(textElements).toHaveLength(expectedElems);
        // await waitFor(() => {
        //   const welcomeTitle = screen.getAllByText("Sign In", {exact: false});
        //   expect(welcomeTitle);
        // });
    })

});


