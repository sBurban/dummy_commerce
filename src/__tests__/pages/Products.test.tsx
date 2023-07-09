import { render, screen } from "@testing-library/react";
import Products from "@/pages/products";
import products from "@/data/products_seeder";
describe('Products main test', () => {
    test('renders Products page',() => {
        //Arrange
        const {container} = render(<Products products={[]} categories={[]} />);
        //Act
        //Assert
        expect(container).toBeInTheDocument();
    })

    // test('renders Product list')
    test('renders 0 images without products', () => {
        render(<Products products={[]} categories={[]} />);
        const imageElem = screen.queryByAltText('product image');
        expect(imageElem).not.toBeInTheDocument();
    })

    test('renders list of Products', () => {
        render(<Products products={products} categories={[]} />);
        const imageElems = screen.queryAllByAltText('product image');
        expect(imageElems).toHaveLength(products.length);
    })
})