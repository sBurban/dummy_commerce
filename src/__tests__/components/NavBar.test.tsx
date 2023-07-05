import React from "react";
import {render, screen, waitFor} from '@testing-library/react';
import NavBar from "../../components/menus/NavBar";

//https://github.com/vercel/next.js/discussions/23034 - ghost on Dec 23, 2019
// jest.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: "",
//       pathname: "",
//       query: "",
//       asPath: "",
//     };
//   },
// }));
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

import nextAuthReactMocked, {mockUserSession, mockUpdateSessionAuth} from "@/lib/utils/testUtils/mockNextAuth";
jest.mock('next-auth/react');

describe('NavBar component', () => {
  beforeAll(() => {
    useRouter.mockImplementation(() => ({
        route: "/yourRoute",
        pathname: "/yourRoute",
        query: "",
        asPath: "",
    }));
  })
    test('renders without errors', () => {
        const { container } = render(<NavBar />);
        expect(container).toBeInTheDocument();
    });

    test('render static Texts', async () => {
        const { container } = render(<NavBar />);
        expect(container).toBeInTheDocument();
        const textElements = await screen.findAllByText("About us", {exact: false});
        const expectedElems = textElements.length;
        expect(textElements).toHaveLength(expectedElems);
    })

    test('renders "Sign In" option when No User Session is found', async () => {
        const {container} = render(<NavBar/>);
        const textElements = await screen.findAllByText("Sign In", {exact: false});
        const expectedElems = textElements.length;
        expect(textElements).toHaveLength(expectedElems);
        // await waitFor(() => {
        //   const welcomeTitle = screen.getAllByText("Sign In", {exact: false});
        //   expect(welcomeTitle);
        // });
    })

    test('renders "Sign Out" option when User Session is found', async () => {
        nextAuthReactMocked.useSession.mockImplementation(
          (_options) => ({ update: mockUpdateSessionAuth, data: mockUserSession, status: 'authenticated' })
        );
        const {container} = render(<NavBar/>);
        const textElements = await screen.findAllByText("Sign Out", {exact: false});
        const expectedElems = textElements.length;
        expect(textElements).toHaveLength(expectedElems);
    })

});


