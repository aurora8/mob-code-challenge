import { join } from "path";
import { Item } from "../model/Item";
import { UseCase } from "../model/UseCase";
import { Packer } from "../packer";

const expected = [new UseCase(10, [
    new Item(1, 5.38, 100),
    new Item(2, 7.22, 3),
    new Item(3, 2, 76),
    new Item(4, 3.61, 48),
])];

describe('Parser Test suite, tests input reading and parsing', () => {
    it('should parse example_input2 into UseCase array', async () => {
        const content = await Packer.readInputFile(join(__dirname, '../../resources/example_input2'));
        const result = await Packer.parseInputs(content);

        expect(result).toMatchObject(expected);
    });
});