import { render, screen } from "@testing-library/react";
import AboutUs from '../../pages/about_us';
import storytext from '../../data/aboutUsStory';

describe('AboutUs', () => {

    test('renders without errors', () => {
        //Arrange
        render(<AboutUs />);
        //Act
        //Assert
    })

    test('display the AboutUs heading', () => {
        //Arrange
        render(<AboutUs />);
        //Act
        const heading = screen.getByText('About Us', {exact: false})
        //Assert
        expect(heading).toBeInTheDocument();
    })

    test('renders the correct number of story text elements',() => {
        //Arrange
        render(<AboutUs />);
        //Act
        const matches = [];
        for (const text of storytext) {
            const textElement = screen.queryByText(text);
            if(textElement) matches.push(textElement);
        }
        //Assert
        expect(matches).toHaveLength(storytext.length);
    })

    test('renders the image with the correct src and alt attributes', () => {
        const expectedSrc = '/clueless.png';
        const expectedAlt = 'owner';
        const { getByAltText } = render(<AboutUs />);

        const image = getByAltText(expectedAlt);
        expect(image).toBeInTheDocument();
        expect(image.getAttribute('src')).toBe(expectedSrc);
        expect(image.getAttribute('alt')).toBe(expectedAlt);
    });
    // test('renders the image with the correct src and alt attributes', () => {
    //     const expectedSrc = '/clueless.png';
    //     const expectedAlt = 'owner';
    //     render(<AboutUs />);

    //     const testImage = document.querySelector("img");
    //     expect(testImage.alt).toContain(expectedAlt);
    //     expect(testImage.src).toContain(expectedSrc);
    // })

})