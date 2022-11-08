import { Item } from "./Item";
import { UseCase } from "./UseCase";

/**
 * @class
 * @extends {useCase}
 * a Bag class encapsulates a Bag of items, provides
 * additional utility methods
 * 
 * a Bag is capable of computing the used items weights 
 * and available remaining weight capacity
 * 
 * used by the algorithm to perform validation checks
 */
 export class Bag extends UseCase {

    /**
     * constructor
     * 
     * @param max_weight {number} the max weight capacity
     * @param items {Item[]} array of items in the bag
     */
    constructor(max_weight: number, items?: Array<Item>) {
        super(max_weight, items);
    }

    /**
     * @property
     * computes the sum of all item
     * weights in the bag
     * @returns {number} used bag capacity
     */
    public get usedCapacity (): number {
        return this.items.reduce((accumulator, currValue) => accumulator + currValue.weight, 0);
    }

    /**
     * @property
     * computes the remaining available capacity
     * @returns {number} available weight capacity
     */
    public get availableCapacity(): number {
        return this.maxWeight - this.usedCapacity;
    }
}