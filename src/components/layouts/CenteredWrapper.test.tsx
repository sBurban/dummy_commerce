import React from "react";
import {render} from '@testing-library/react';
import CenteredWrapper from './CenteredWrapper';

describe('Testing CenteredWrapper',() => {
    test('renders without errors', () => {
        const { container } = render(<CenteredWrapper />);
        expect(container.firstChild).toHaveClass('CenteredWrapper')
    })

    test('renders with default size', () => {
        const { container } = render(<CenteredWrapper />);
        const parentElem = container.firstChild;
        expect(parentElem).toHaveStyle('width: 60%;')
        // Continue with assertions for other default styles
    });
    test('renders with "long" size', () => {
        const { container } = render(<CenteredWrapper mySize="long" />);
        const parentElem = container.firstChild;
        expect(parentElem).toHaveStyle('width: 80%;')
    });
    test('renders with "full" size', () => {
        const { container } = render(<CenteredWrapper mySize="full" />);
        const parentElem = container.firstChild;
        expect(parentElem).toHaveStyle('width: 100%;')
    });
    test('renders child components', () => {
        const {getByText} = render(<CenteredWrapper mySize="long">
            <p>Hola Mundo</p>
        </CenteredWrapper>);
        const childComponent = getByText('Hola Mundo');
        expect(childComponent).toBeInTheDocument();
    });


})