import { ApiError } from "../errors/error";
import { Item } from "./Item";

/**
 * @class
 * another abstraction that represents a Use Case as
 * per the use case input specification, a UseCase
 * maintains a collection of Items and a max weight
 * 
 * inputs include max weight and item information, this
 * is utilized by the parser function in Packer when
 * reading input file, could be useful for many scenarios 
 * to encapsulate input data, provide validation .. etc
 */
 export class UseCase {
    public _maxWeight: number;
    public items: Array<Item> = [];

    /**
     * constructor
     * 
     * @param max_weight {number} the max weight capacity of the knapsack
     * @param items {Item[]} array of items in the knapsack
     */
    constructor(max_weight: number, items?: Array<Item>) {
        this._maxWeight = max_weight;
        if (items) this.items = items;
    }
    
    public get maxWeight() : number {
        return this._maxWeight;
    }

    public set maxWeight(v : number) {
        if (v < 0 || v > 100) throw new ApiError('Invalid weight capacity');
        this._maxWeight = v;
    }
}