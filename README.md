<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Exercise using [NestJS](https://github.com/nestjs/nest) framework with TypeScript.

## Instructions
In this challenge you will need to create an API REST.

### Non Functional requirements:
- Develop your API using Nestjs, Express or Fastify.

### Technical requirements:
- You will need to create a single POST endpoint that receives a mathematical expression and returns the result using the calculator specification explained below.

### Calculator Requirements:
- You need to build an inline calculator capable of understanding math terms. You can't use any external package or JS function. It must be coded by you.
For example, if I enter the education 10 * (2 + 5) * 10 it should return 700.

### Functional requirements:
- The only operations available will be + - * /.
- You can assume that you will always have a well-formed equation with at least 1 term.
- The only term separator will be the (). We WON’T use {} or [] as term division.

### Extra:
- Submit your code with unit tests.
- Add well-written documentation about your code.
- Use Typescript instead of Javascript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs

Documentation runs in SwaggerUI.

Start the server and go to http://localhost:3000/docs to view!
