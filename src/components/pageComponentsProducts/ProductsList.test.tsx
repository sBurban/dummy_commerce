import { render, screen } from "@testing-library/react";
import Products from "@/pages/products";
import productsSeeder from "@/data/products_seeder";
import { ProductsList } from "./ProductsList";
describe('Products main test', () => {
    test('renders Products page',() => {
        //Arrange
        const {container} = render(<ProductsList products={[]} categories={[]} />);
        //Act
        //Assert
        expect(container).toBeInTheDocument();
    })

    // test('renders Product list')
    test('renders 0 images without products', () => {
        render(<ProductsList products={[]} categories={[]} />);
        const imageElem = screen.queryByAltText('product image');
        expect(imageElem).not.toBeInTheDocument();
    })

    test('renders list of Products', () => {
        render(<ProductsList products={productsSeeder} categories={[]} />);
        const imageElems = screen.queryAllByAltText('product image');
        expect(imageElems).toHaveLength(productsSeeder.length);
    })
})