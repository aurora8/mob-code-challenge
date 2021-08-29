import { Packer } from "../packer";

describe('Packer Test suite', () => {
    it('should through ApiError', async () => {
        expect.assertions(2);

        try {
            await Packer.readInputFile('./resources/example_input4');
        } catch (e: any) {
            expect(e).toHaveProperty('code');
            expect(e.code).toMatch('ENOENT');
        }
    });

    it ('should read file contents', async () => {
        expect.assertions(1);

        const content = await Packer.readInputFile('./resources/example_input2');
        expect(content).toBe('10 : (1,5.38,€100) (2,7.22,€3) (3,2,€76) (4,3.61,€48)');
    });

    it('should test example_input', async () => {
        expect.assertions(1);

        const out = await Packer.pack('./resources/example_input');
        expect(out.trim()).toBe('4\n-\n2,7\n8,9');
    });

    it('should test example_input and output example_output', async () => {
        expect.assertions(1);
        // try read absolute path to file
        const expected_output = await Packer.readInputFile('/Users/ali.aljoudeh/Downloads/skeleton_javascript/skeleton/resources/example_output');
        const out = await Packer.pack('./resources/example_input');

        expect(out.trim()).toBe(expected_output.trim());
    });


});