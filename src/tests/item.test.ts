import { ApiError } from "../error";
import { Item } from "../Item";

describe('Item class validation tests for invalid weight and price', () => {
    test('Item weight validation', () => {
        const item1 = () => new Item(1, 101, 22);
        const item2 = () => new Item(1, 0, 100);
        const item3 = () => new Item(1, -1, 0);
        const item4 = () => new Item(1, 0.1, 0);
    
        expect(item1).toThrowError(ApiError);
        expect(item2).toThrowError(ApiError);
        expect(item3).toThrowError(ApiError);
        expect(item4).not.toThrowError();
    });

    test('Item price validation', () => {
        const item1 = () => new Item(1, 100, -1);
        const item2 = () => new Item(1, 0, 101);
        const item3 = () => new Item(1, 78, 0);
    
        expect(item1).toThrowError(ApiError);
        expect(item2).toThrowError(ApiError);
        expect(item3).not.toThrowError(ApiError);
    });

});
