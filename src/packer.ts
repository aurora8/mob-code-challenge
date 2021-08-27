import * as fs from 'fs';
import * as path from 'path';
import { ApiError } from './error';
import { Item } from './Item';

export class Packer {
    static async pack(inputFile: string): Promise<string> {
        const content = await Packer.readInputFile(inputFile);

        console.log(content.split(/\r?\n/));

        return '';
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
    static async readInputFile(inputFile: string): Promise<String> {
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
    static async parseInputs(content: string): Promise<any> {
        try {
            const lines = content.split(/\r?\n/);
            const items = lines.map(line => {
                const parts = line.split(":");
                const attrs = parts[1].split(',');
                const max_capacity = parts[0];
                return new Item(Number(attrs[0]), Number(attrs[1]), Number(attrs[2]), Number(max_capacity));
            });

            return items;
        } catch (err: any) {
            throw new ApiError(err.message);
        }
    }
}

// TODO
// move to test cases
Packer.pack('./resources/example_input');