# Mobiquity Code Challenge

<p align="center">
    <img src="https://user-images.githubusercontent.com/44065296/131244036-a3a7467a-c501-491e-be75-f1ce0abc3103.png" height="180">
</p>

this is a library Nodejs project based on the skeleton provided
for the challenge of the **0-1 knapsack problem** with fractional weights,
heavily employed OOP design for most of the implementation code (as per task requirements), making the solution more readable and extensible, most of the provided functions are static since there is no need for any global or package level variables and asynchronous so they can be used async in consumer client code, there is no need to over engineer! the design is simple lib use case, yet provides extensibility, maintainability, readability and re-use

to solve all use cases from an input file the
```
await Packer.pack(filPath: string): Promise<string>
``` 
the returned promise resolves to solution output 

to run all Tests from the provided input/ouput files
```
yarn test
```

the solution solves the problem in 3 main stages fully encapsulated
in the `Packer.pack` method
1. read input file scanning entrie file contents async
2. parse input from the file into `UseCase` collection
3. divide and conquer algorithm solver solves all use cases

## Problem Statement Summary

- this is an optimization problem
- weights are fractional/prices are not
- the goal is item indicies with max value (not max sum of item values)!
- items with equal prices should favor lower weights (optimization)

the algorithm is a divide and conquer approach achieved by sorting items by highest price/weight ratio while also accounting for the price difference (prioritizing higher prices), then picking items one at a time until the bag is full ...

## Algorithm Complexity
Time and space Complexity is **O(n log(n))**

more detailed documentation in the docs directory (HTML tsdocs) includes
algorithmic analysis and explanations of problem/solution

<img src="https://user-images.githubusercontent.com/44065296/131244298-f6a25429-45be-464f-aa9d-283570f5a19b.png" width="100%">

## Quick Notes

- all dependencies are dev dependencies
- **jest** is used for Testing (config in jest.config.json)
- **typedoc** is used for documentation (config in typedoc.json)
- **ts-node** for execution/compilation which compiles to es6 in prod mode builds
- async/await syntax fully implemented in typescript

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
