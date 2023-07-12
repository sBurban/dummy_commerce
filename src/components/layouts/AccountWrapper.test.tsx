import React from "react";
import {render} from '@testing-library/react';
import AccountWrapper from './AccountWrapper';

// import { useRouter } from "next/router";
// jest.mock('next/router', () => ({
//     useRouter: jest.fn(() => console.log("Mock 'useRouter' ran.")),
// }));
// const mockRouter = {
//     pathname: '/mocked-path',
//     push: jest.fn()
// }
// useRouter.mockReturnValue(mockRouter);

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Testing AccountWrapper',() => {
    beforeAll(() => {
        useRouter.mockImplementation(() => ({
            route: "/yourRoute",
            pathname: "/yourRoute",
            query: "",
            asPath: "",
        }));
    })
    test('renders without errors', () => {
        const { container } = render(<AccountWrapper />);
        // expect(container.firstChild).toHaveClass('AccountWrapper')
    })
    test('renders child components', () => {
        const {getByText} = render(<AccountWrapper mySize="long">
            <p>Hola Mundo</p>
        </AccountWrapper>);
    });

    test('renders SideMenu as child', () => {
        const {container} = render(<AccountWrapper />);
        const elemExists = container.querySelector('.SideMenu');
        expect(elemExists).not.toBeFalsy();
    })

});