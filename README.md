## Description

The application for testing purpose only.

## Installation

```bash
# for setup docker database (postgre)
$ docker-compose up

# install the dependency
$ npm install
```

## Running the app without serverless

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Running the app with serverless

```bash
# install serverless globally
$ npm i -g serverless

# run application under serverless
$ serverless offline start
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
