import { render, screen } from "@testing-library/react";
import { FormReadOnly } from "@/components/forms/FormReadOnly";

const testData = [
    {title:"test-1", value:"value"},
    {title:"test-2", value:"value"},
    {title:"test-3", value:"value"},
]

describe('FormReadOnly testing', () => {
    test('renders expected number of Rows', () => {
        //Arrange
        render(<FormReadOnly data={testData} />);
        //Act
        const rowElems = screen.getAllByText('test-',{exact:false});
        //Assert
        expect(rowElems).toHaveLength(testData.length);
    });

})