/**
 * a class representation of a Use Case Item encapsulating
 * basic item attribures, simplifies the semantics and
 * makes code more readable rather than employing complex
 * semantics i.e w[i-1,0]
 * 
 * an item has a weight, price and an index
 * 
 * it could be more useful when extending the application for
 * service tiers were they can be employed as a DTO (Data Transfer Object)
 * for instance in order to cleanly accept network payloads (validation, serialization .. etc)
 */
export class Item {
    public weight: number;
    public price: number;
    public index: number;
    public maxWeight: number;

    constructor(i: number, w: number, p: number, mw: number) {
        this.index = i;
        this.weight = w;
        this.price = p;
        this.maxWeight = mw;
    }
}