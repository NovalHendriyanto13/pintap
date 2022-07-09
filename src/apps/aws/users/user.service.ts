import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as moment from 'moment';
import * as AWS from 'aws-sdk';
import { v4 as uuid4 } from 'uuid';

const tablename = 'users';

@Injectable()
export class UserService {
  async initTable() {
    const params: any = {
      Tablename: tablename,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
        {
          AttributeName: 'name',
          AttributeType: 'S',
        },
        {
          AttributeName: 'password',
          AttributeType: 'S',
        },
        {
          AttributeName: 'createdat',
          AttributeType: 'S',
        },
        {
          AttributeName: 'updatedat',
          AttributeType: 'S',
        },
        {
          AttributeName: 'deletedat',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'username',
          KeyType: 'RANGE',
        },
        {
          AttributeName: 'name',
          KeyType: 'RANGE',
        },
        {
          AttributeName: 'password',
          KeyType: 'RANGE',
        },
        {
          AttributeName: 'createdat',
          KeyType: 'RANGE',
        },
        {
          AttributeName: 'updatedat',
          KeyType: 'RANGE',
        },
        {
          AttributeName: 'deletedat',
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    const dynamoDb = new AWS.DynamoDB();
    try {
      await dynamoDb.createTable(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async create(data: any): Promise<any> {
    const now = moment().format('YYYY-MM-DD hh:mm:ss');
    const password = Buffer.from(data.password).toString('base64');
    const payload = {
      ...data,
      password,
      createdat: now,
      updatedat: now,
      id: uuid4(),
    };

    try {
      await new AWS.DynamoDB.DocumentClient()
        .put({
          TableName: tablename,
          Item: payload,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return payload;
  }

  async findById(id: string): Promise<any> {
    let user;
    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .get({
          TableName: tablename,
          Key: { id },
        })
        .promise();
      user = result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }

  async findByUsername(username: string): Promise<any> {
    let user;
    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .get({
          TableName: tablename,
          Key: { username },
        })
        .promise();
      user = result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }

  async find(): Promise<any> {
    let user;
    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .scan({
          TableName: tablename,
        })
        .promise();
      user = result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }

  async update(id: string, data: any): Promise<any> {
    let result;
    try {
      result = await new AWS.DynamoDB.DocumentClient()
        .update({
          TableName: tablename,
          Key: { id },
          UpdateExpression: 'set username = :username, name = :name',
          ExpressionAttributeValues: {
            ':username': data.username,
            ':name': data.name,
          },
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return result;
  }

  async delete(id: string): Promise<any> {
    let result;
    try {
      result = await new AWS.DynamoDB.DocumentClient()
        .delete({
          TableName: tablename,
          Key: { id },
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return result;
  }
}
