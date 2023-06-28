import React from "react";
import {render} from '@testing-library/react';
import AccountWrapper from '../../components/layouts/AccountWrapper';

import { useRouter } from "next/router";
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => console.log("Mock 'useRouter' ran.")),
}));

describe('Testing AccountWrapper',() => {
    beforeAll(() => {
        const mockRouter = {
            pathname: '/mocked-path',
            push: jest.fn()
        }
        useRouter.mockReturnValue(mockRouter);
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