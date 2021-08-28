import * as fs from 'fs';
import * as path from 'path';
import { ApiError } from './error';
import { Bag, Item, UseCase } from './Item';

export class Packer {

    static async pack(inputFile: string): Promise<string> {
        const content = await Packer.readInputFile(inputFile);
        const parsed = await Packer.parseInputs(content);

        const bags = Packer.solveUseCases(parsed);

        //console.log(JSON.stringify(bags));
        let output = '';

        bags.forEach((bag, i) => {
            const indicies = bag.items.map(i => i.index).join(',') || '-';

            output.concat(indicies + '\n\r');
            console.log(indicies, output);
        });

        return output;
    }

    /**
     * @async
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
    private static async readInputFile(inputFile: string): Promise<string> {
        const normalized = path.normalize(inputFile);

        try {
           return await fs.promises.readFile(normalized, 'utf-8');
        } catch (err: any) {
            throw new ApiError(err.message);
        }
    }


    /**
     * @async
     * @function
     * a convenience parser that parses contents from an input file with 
     * the provided input specifications from the resources folder in the format
     * max weigh capacity : (index,wight,price)
     * where each line represents an input tuple/item
     * 
     * the parser will attempt to parse incoming payloads by collecting relevant
     * data into separete arrays
     * 1. an array of Item objects
     * 
     * @param {string} content the file contents to parse
     * @returns {Array<Item>} an array of parsed Item objects
     */
    private static async parseInputs(content: string): Promise<UseCase[]> {
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
     * solves the packing problem using a greedy approach by evaluating
     * the highest price/weight ratio without having to find a max and
     * avoid 2^n complexity
     * 
     * since weights are fractional dynamic programming approaches
     * are not suitable
     * 
     * 1. the algorithm first filters items with weights that can fit to save
     * iteration overhead (optimization)
     * 2. the algorithm first sorts out the items from highest to lowest
     * ratio
     * 3. next we iterate over the items from highest to lowest ratio and begin 
     * items which we know are higer in ratio
     * 4. exclude items that exceed the weight of the bag
     * 5. return the bag when the max weight capacity is reached
     * 
     * @param useCases an array of use cases to solve
     * @returns an array of bags per use case
     */
    private static solveUseCases(useCases: UseCase[]) {
        const bags: Bag[] = [];

        useCases.forEach(useCase => {
            const bag = new Bag(useCase.maxWeight);
            bags.push(bag);

            // sort by price/weight ratio
            const sorted = useCase.items
                .filter(i => i.weight <= useCase.maxWeight)
                .sort((a, b) => {
                    return (b.price / b.weight) - (a.price / a.weight);
                });

            console.log(JSON.stringify(bag));
            console.table(sorted);

            sorted.forEach(item => {
                // weight exceeds max capacity
                if (item.weight > useCase.maxWeight) {
                    return item;
                }

                console.log('availableCapacity', bag.availableCapacity);
                console.log('usedCapacity', bag.usedCapacity);

                if (item.weight <= bag.availableCapacity) {
                    // add item
                    bag.items.push(item);
                }
            });
        });

        return bags;
    }
}

// TODO
// move to test cases
Packer.pack('./resources/example_input');