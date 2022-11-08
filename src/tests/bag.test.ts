import { Bag } from "../model/Bag";
import { Item } from "../model/Item";


describe('Bag class test suite', () => {

    test('empty bag should return 0 used weight capacity and 100 available', () => {
        const bag = new Bag(100);
        expect(bag.usedCapacity).toBe(0);
        expect(bag.availableCapacity).toBe(100);
    });

    test('should match used capacity = 50, available capacity = 50', () => {

        // total weight is 50
        const item1 = new Item(1, 2.4, 10);
        const item2 = new Item(2, 7.6, 12);
        const item3 = new Item(3, 20, 72);
        const item4 = new Item(4, 11.2, 10);
        const item5 = new Item(5, 8.8, 30);

        const bag = new Bag(100, [item1, item2, item3, item4, item5]);

        expect(bag.availableCapacity).toEqual(50);
        expect(bag.usedCapacity).toEqual(50);
    });


});