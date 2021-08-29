# Mobiquity Code Challenge

<p align="center">
    <img src="https://user-images.githubusercontent.com/44065296/131244036-a3a7467a-c501-491e-be75-f1ce0abc3103.png" height="180">
</p>

this is a library Nodejs project based on the skeleton provided
for the challenge of the 0-1 knapsack problem with fractional weights

## Quick Notes
1. all dependencies are dev dependencies
2. **jest** is used for Testing (config in jest.config.json)
3. **typedoc** is used for documentation (config in typedoc.json)
4. **ts-node** for execution/compilation which compiles to es6 in prod mode builds

## Project Structure

1. source directory, all sources are in the **src/** folder
2. all tests located in **src/tests** folder
3. resources directory includes all input and output test cases
4. documentation in **docs/** directory
5. test coverage in **coverage/** directory
6. all es6 build output goes in **dist/** folder

## Installation and Usage

1. clone this repo
2. install dependencies, navigate to project root dir then run  
   `npm install` or `yarn install`
3. running Tests, results reported in the console  
   `npm run test` or `yarn test`
4. running Tests in watch mode  
5. `npm run test:watch` or `yarn test:watch`
6. generating Test Coverage report to **coverage/** folder  
   `npm run test:cov` or `yarn test:cov`
7. compile a production build into **dist/** folder (es6 by default) optionally switch to es5 in **tsconfig.json** by changing the target property  
   `npm run build` or `yarn build`
8. generate tsdoc documentation  
   `npm run docs` or `yarn docs`

**Note**: running in production mode is not possible since this is a library
