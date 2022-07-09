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

#endpoints
http://localhost:3000/auth/login [POST]
Login and Generate Token

http://localhost:3000/user [GET]
Get List of User

http://localhost:3000/user [POST]
Create New user data

payload: {
    username: 'string',
    password: 'string',
    name: 'string'
}

http://localhost:3000/user/:id [GET]
Get specific user data by userID

http://localhost:3000/user/:id [PUT]
Update Existing user data

payload: {
    username: 'string',
    name: 'string'
}

http://localhost:3000/user/:id [DELETE]
Delete Existing user data
```

## Running the app with serverless

```bash
# install serverless globally
$ npm i -g serverless

# run application under serverless
$ serverless offline start

#endpoints
http://localhost:3000/dev/auth/login [POST]
Login and Generate Token

http://localhost:3000/dev/user [GET]
Get List of User

http://localhost:3000/dev/user [POST]
Create New user data

payload: {
    username: 'string',
    password: 'string',
    name: 'string'
}

http://localhost:3000/dev/user/:id [GET]
Get specific user data by userID

http://localhost:3000/dev/user/:id [PUT]
Update Existing user data

payload: {
    username: 'string',
    name: 'string'
}

http://localhost:3000/dev/user/:id [DELETE]
Delete Existing user data
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
