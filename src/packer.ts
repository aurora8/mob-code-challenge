import * as fs from 'fs';
import * as path from 'path';
import { ApiError } from './error';
import { Bag, Item, UseCase } from './Item';

export class Packer {

    /**
     * performs a knapsack solution using a divide and conquer algorithm from an input file
     * with multiple use cases per line
     * 
     * the method first reads the incoming input file, parses the contens into a 
     * collection of UseCase instances, then applies the algorithm on all use
     * cases found, takes one file at a time and async returns computed knapsack
     * 
     * @param inputFile {string} absolute or relative path to input file
     * @returns Promise<string> async computes knapsack and returns a string
     * of item indicies per use case per line
     */
    static async pack(inputFile: string): Promise<string> {
        try {
            let output = '';
            const content = await Packer.readInputFile(inputFile);
            const parsed = await Packer.parseInputs(content);

            const bags = Packer.solveUseCases(parsed);

            bags.forEach((bag, i) => {
                const indicies = bag.items.map(i => i.index).join(',') || '-';
                output += `${indicies}\n`;
            });

            return output;
        } catch (err: any) {
            throw new ApiError(err);
        }
    }

    /**
     * @async
     * @static
     * @function
     * 
     * reads a given file path asynchronously in utf-8 encoding and returns the
     * contents as a string, for a better performance in larger file sizes,
     * this could be implemented as a Readable Stream instead (not nessecary in this case)
     * 
     * the input path is normalzed by the path module, this is to resolve any
     * path issues in the path string format, e.g //
     * 
     * @param inputFile {string} the path to the input file, the path is normalized in this method, relative
     * paths can be used from the execution context
     * 
     * @throws {ApiError} any errors cought during file read operation
     * @returns {Promise<string>} read file contents
     */
    public static async readInputFile(inputFile: string): Promise<string> {
        const normalized = path.normalize(inputFile);

        try {
            return fs.promises.readFile(normalized, 'utf-8');
        } catch (err: any) {
            throw new ApiError(err.message);
        }
    }


    /**
     * @async
     * @static
     * @function
     * a convenience parser that parses contents from an input file with 
     * the provided input specifications in the format
     * max weigh capacity : (index,wight,price)
     * where each line represents an input tuple/item
     * 
     * the parser will attempt to parse incoming payloads by collecting relevant
     * data into an array
     * 
     * @param {string} content the file contents to parse
     * @returns {Array<Item>} an array of parsed Item objects
     */
    public static async parseInputs(content: string): Promise<UseCase[]> {
        try {
            const useCases: Array<UseCase> = [];
            // extract lines
            const lines = content.split(/\r?\n/);
            lines.forEach(line => {
                const parts = line.split(":").map(p => p.trim());
                // max weight for curr use case
                const max_capacity = Number(parts[0].trim());

                const tuples = parts[1].split(' ');
                // each tuple is an item
                const items = tuples.map(tuple => {
                    // strip braces and special chars
                    const attrs = tuple.replace(/[^0-9|\.|\,]/g, '').split(',');

                    return new Item(Number(attrs[0]), Number(attrs[1]), Number(attrs[2]));
                });

                useCases.push(new UseCase(max_capacity, items));
            });

            return useCases;
        } catch (err: any) {
            throw new ApiError(err.message);
        }
    }

    /**
     * @function
     * @static
     * 
     * ANALYSIS
     * ========
     * solves the packing problem using a simple greedy approach by sorting items
     * by highest price/weight ratio in the sort compare function while
     * also accounting for the price difference (prioritizing higher prices), 
     * then picking items one at a time until the bag is full
     * relies on sorted elements by ratio in desc order
     * 
     * Ratio of an Item Ri = (p price/w weight)
     * Ratio = 1 when price and weight are equal
     * 
     * in this case, the sort comparison uses
     * 
     * RATIO R = (B.PRICE / B.WEIGHT) - (A.PRICE / A.WEIGHT) + (B.PRICE - A.PRICE)
     * taking account of the price difference <delta> in the sort stage
     * 
     * RATIO delta + PRICE delta
     * 
     * When the prices are equal, price is cancelled out (zero) and so items with lower
     * weight will take order priority since higher Ratios = lower weights, this covers
     * the favour lower weights for equal prices
     * 
     * EXAMPLE
     * -------
     * 10 : (1,5.38,€100) (2,7.22,€3) (3,2,€76) (4,3.61,€48)
     * 
     * final sort
     * ┌─────────┬─────────┬────────┬────────┬───────┐
     * │ (index) │ _weight │ _price │ _index │ ratio │
     * ├─────────┼─────────┼────────┼────────┼───────┤
     * │    0    │  5.38   │  100   │   1    │ 18.58 │
     * │    1    │    2    │   76   │   3    │ 38    │
     * │    2    │  3.61   │   48   │   4    │ 13.29 │
     * │    3    │  7.22   │   3    │   2    │ 0.415 │
     * └─────────┴─────────┴────────┴────────┴───────┘
     * 
     * once the item are sorted, the idea is to start picking largest ratios 
     * from index = 0 to array.length one by one until the bag is filled ignoring invalid items
     * 
     * the alternate conventional approaches employ dynamic programming with complex data
     * structures like hash tables and sets which is more costly in terms of space complexity
     * in this case, avoiding finding a max or build dynamic tables which
     * require huge space complexity, so instead of focusing on finding
     * the max price/value in an iteration, then scanning the items in another, the items are 
     * sorted since we are interested in Items not max value attainable, complexity for those 
     * other approaches could jump to O(3^n) or O(4^n) besides space complexity, 
     * also weights are fractional which renders these methods unsuitable
     * 
     * TIME AND SPACE COMPLEXITY
     * =========================
     * 
     * looking at the V8 source code implementation of the Array.sort method, 
     * the runtime performs an efficient Merge Sort with logarithmic complexity
     * 
     * https://github.com/v8/v8/blob/master/src/builtins/typed-array-sort.tq
     * 
     * ALGORITHM         SPACE COMPLEXITY   TIME COMPLEXITY
     * ----------------------------------------------------
     * Merge Sort        O(n log(n))        O(n log(n))
     * 
     * 1. the algorithm first sorts out the items from highest to lowest ratio
     * 2. next we iterate over the items from highest to lowest ratio and begin 
     * by adding items one by one until max weight is reached, skipping unfitting items
     * 3. return the bag when the max weight capacity is reached
     * 
     * @param useCases an array of use cases to solve
     * @returns an array of bags (solutions) per use case
     */
    public static solveUseCases(useCases: UseCase[]) {
        const bags: Bag[] = [];

        useCases.forEach(useCase => {
            const bag = new Bag(useCase.maxWeight);
            bags.push(bag);

            // sort by price/weight ratio
            // Insertion sort for length < 10, quick sort for larger arrays
            const sorted = useCase.items
                .sort((a, b) => {
                    // sort by ratio in desc order
                    return (b.price / b.weight) - (a.price / a.weight) + (b.price - a.price);
                });

            // start placing items in bag within allowed capacity
            // O(n)
            for (let i = 0; i < sorted.length; i++) {
                const item = sorted[i];
                // weight exceeds max capacity
                if (item.weight > useCase.maxWeight) {
                    continue;
                }

                // can we add it?
                if (item.weight <= bag.availableCapacity) {
                    bag.items.push(item);
                }
            };
        });

        return bags;
    }
}