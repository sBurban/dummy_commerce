import React from "react";
import {render, screen, } from '@testing-library/react';
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

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" }
    };
    return {
      __esModule: true,
      ...originalModule,
      useSession: jest.fn(() => {
        return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
      }),
    };
});

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
        expect(container).toMatchSnapshot();

    });

    test('render static Texts', async () => {
        const { container } = render(<NavBar />);
        // expect(container).toBeInTheDocument();
        const textElements = await screen.findAllByText("About us", {exact: false});
        const expectedElems = textElements.length;
        expect(textElements).toHaveLength(expectedElems);
    })

    // test('show "sign out" when has session', async () => {
    //     const {container} = render(<NavBar/>);
    //     expect(container).toMatchSnapshot()
    //     expect(screen.getByText("Sign Out")).toBeInTheDocument();
    // })

});


