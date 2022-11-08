import { ApiError } from "../errors/error";

/**
 * @class
 * 
 * a class representation of a Use Case Item that can
 * be added to a Bag
 * 
 * encapsulates basic item attribures, simplifies the semantics and
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
 * Constraints
 * 1. weight cannot be zero or > 100
 * 2. price can be zero (no value) or > 100
 */
export class Item {

    private _weight: number;
    private _price: number;
    public index: number;

    /**
     * @constructor
     * 
     * uses class setters to apply validation
     * 
     * @param i {number} the item index
     * @param w {number} the item weight
     * @param p {number} the item price
     */
    constructor(i: number, w: number, p: number) {
        if (w <= 0 || w > 100) throw new ApiError('Invalid weight input');
        if (p < 0 || p > 100) throw new ApiError('Invalid price input');
        this.index = i;
        this._weight = w;
        this._price = p;
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
}