import React from "react";
import {render, screen} from '@testing-library/react';
import { SideMenu, MenuRoutes } from "../../components/menus/SideMenu";
// import { useRouter } from "next/router";
import { ROUTE_ACCOUNT,ROUTE_ACCOUNT_ACCESS,ROUTE_ACCOUNT_ADDRESSES,ROUTE_ACCOUNT_ORDERS } from '@/lib/common/Constants';

const routerPathOptions = [
    ROUTE_ACCOUNT,
    ROUTE_ACCOUNT_ACCESS,
    ROUTE_ACCOUNT_ADDRESSES,
    ROUTE_ACCOUNT_ORDERS,
]

// jest.mock('next/router', () => ({
//     useRouter: jest.fn(() => console.log("Mock 'useRouter' ran.")),
// }));
// const mockRouter = {
//     pathname: '/mocked-path',
//     push: jest.fn()
// }
// useRouter.mockReturnValue(mockRouter);

const useRouter = jest.spyOn(require('next/router'), 'useRouter')


describe('Testing SideMenu', () => {
    beforeAll(() => {
        useRouter.mockImplementation(() => ({
            route: "/yourRoute",
            pathname: "/yourRoute",
            query: "",
            asPath: "",
        }));
    })

    test('renders without errors',()=>{
        //Arrange
        // const mockRouter = {
        //     pathname: '/mocked-path',
        //     push: jest.fn()
        // }
        // useRouter.mockReturnValue(mockRouter);
        render(<SideMenu />);

    })

    test('renders expected number of Link elements', () => {
        //Arrange
        const {container} = render(<SideMenu />);
        //Act
        const linkElems = container.getElementsByTagName('a');
        // console.log("🚀 ~ file: SideMenu.test.js:35 ~ test ~ linkElems:", linkElems.length)
        //Assert
        expect(linkElems).toHaveLength(MenuRoutes.length);
    });

    test('renders Link elements with correct "src" path', () => {
        //Arrange
        const {container} = render(<SideMenu />);
        //Act
        const linkElems = container.getElementsByTagName('a');
        const matches = [];
        for (const link of linkElems){
            // const linkPath = link.href;
            const linkPath = link.getAttribute("href")+"/";
            if( routerPathOptions.indexOf(linkPath) != -1 ) matches.push(linkPath);
        }
        //Assert
        expect(matches).toHaveLength(MenuRoutes.length);
    })

    test('renders icons with each Link', () => {
        //Arrange
        const {container} = render(<SideMenu />);
        //Act
        const linkElems = container.getElementsByTagName('a');
        const matches = [];
        for (const link of linkElems){
            const iconRendered = link.querySelector('svg');
            if(iconRendered) matches.push(iconRendered);
        }
        //Assert
        expect(matches).toHaveLength(MenuRoutes.length);
    })

})