import { ApiError } from "./error";

/**
 * @class
 * a class representation of a Use Case Item encapsulating
 * basic item attribures, simplifies the semantics and
 * makes code more readable rather than employing complex
 * semantics i.e w[i-1,0] and for extensibility reasons
 * 
 * an item has a weight, price and an index
 * 
 * it could be more useful when extending the application for
 * service tiers were they can be employed as a DTO (Data Transfer Object)
 * for instance in order to cleanly accept network payloads 
 * (validation, serialization .. etc)
 * 
 * Assumptions
 * 1. weight cannot be zero
 * 2. price can be zero (no value)
 */
export class Item {

    private _weight: number = 0;
    private _price: number = 0;
    private _index: number = 0;

    /**
     * constructor
     * 
     * uses class setters to apply validation
     * 
     * @param i {number} the item index
     * @param w {number} the item weight
     * @param p {number} the item price
     */
    constructor(i: number, w: number, p: number) {
        this.index = i;
        this.weight = w;
        this.price = p;
    }

    public get ratio(): number {
        return this._price / this._weight;
    }

    public get price(): number {
        return this._price;
    }
    
    public get weight() : number {
        return this._weight;
    }

    public set price(v : number) {
        if (v < 0 || v > 100) throw new ApiError('Invalid price input');
        this._price = v;
    }
    
    public set weight(v : number) {
        if (v <= 0 || v > 100) throw new ApiError('Invalid price input');
        this._weight = v;
    }

    public get index() : number {
        return this._index;
    }

    public set index(v : number) {
        this._index = v;
    }
}

/**
 * @class
 * another abstraction that represents a Use Case as
 * per the use case input specification
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
        if (v <= 0 || v > 100) throw new ApiError('Invalid weight capacity');
        this._maxWeight = v;
    }
}

/**
 * @class
 * @extends {useCase}
 * a Bag class encapsulates a Bag of items, provides
 * additional utility methods
 * 
 * a Bag is capable of computing the used items weights 
 * and available remaining weight capacity
 * 
 * used by the algorithm to validation checks
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
        let sum = 0;
        this.items.forEach(i => sum += i.weight);
        return sum;
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