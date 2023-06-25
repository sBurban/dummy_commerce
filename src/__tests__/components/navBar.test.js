import React from "react";
import {render, screen} from '@testing-library/react';
// import NavBar from '../../components/menus/NavBar';
// import { useSession, signIn, signOut } from "next-auth/react"


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
//         return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
//       }),
//     };
// });

describe('NavBar component', () => {
    test('renders without errors', () => {
        // render(<NavBar />);
        // const text = screen.getByText("Hello, Delta");
        // expect(text).toBeInTheDocument();
    });

    // test('show "sign out" when has session', async () => {
    //     const {container} = render(<NavBar/>);
    //     expect(container).toMatchSnapshot()
    //     expect(screen.getByText("Sign Out")).toBeInTheDocument();
    // })

});