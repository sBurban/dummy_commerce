import capitalizeFirst from '../src/lib/utils/capitalizeFirst';
import formatDate from '../src/lib/utils/formatDate';
import parseMongoObj from '../src/lib/utils/parseMongoObj';
import { ObjectId } from 'mongodb';

describe('Utility functions', () => {
    test('should return string with first letter Uppercase', () => {
        expect(capitalizeFirst('hello world')).toBe('Hello world');
    })

    test('should return human readable date', () => {
        expect(formatDate('2023-06-21T01:36:07.755Z')).toBe('20 of June');
    })

    test('Parse MongoObj - no _id', () => {
        const testObj = {id: 1}
        const expectedObj = {id: 1};
        expect(parseMongoObj(testObj)).toStrictEqual(expectedObj);
    })

    test('Parse MongoObj - with _id', () => {
        const testObj = { _id: new ObjectId('6484e7e71a526d09cb4b1e0f')}
        const expectedObj = { _id: "6484e7e71a526d09cb4b1e0f"};
        expect(parseMongoObj(testObj)).toStrictEqual(expectedObj);
    })



})