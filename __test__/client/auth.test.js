/**
 * auth.test.js
 * @description :: contains test cases of APIs for authentication module.
 */

const dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = 'test';
const db = require('mongoose');
const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../app');
const authConstant = require('../../constants/authConstant');
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let insertedCompanies = {};
let insertedUsers = {};

beforeAll(async function (){
  try {
    await client.connect();
    const dbInstance = client.db('Dhiwise_test');
    const companies = dbInstance.collection('companies');
    insertedCompanies = await companies.insertOne({
      companyName: 'Curve',
      email: 'Bernadette.Keebler34@gmail.com',
      registrationNumber: 'Circle',
      otherData: 'Paraguay',
      id: '649f3c3aa3731b77608b289e'
    });
    const users = dbInstance.collection('users');
    insertedUsers = await users.insertOne({
      name: 'Johnny Tromp',
      email: 'Maurine_Purdy30@yahoo.com',
      password: 'K6xdB3F7yHmVJXJ',
      role: 'Divide',
      companyId: '649f3c3aa3731b77608b28a2',
      userType: 438,
      mobileNo: '(166) 305-1221',
      username: 'Clifford98',
      loginOTP: {},
      resetPasswordLink: {},
      loginRetryLimit: 896,
      loginReactiveTime: '2023-07-12T12:31:30.793Z',
      id: '649f3c3aa3731b77608b28a3'
    });
  }
  catch (error) {
    console.error(`we encountered ${error}`);
  }
  finally {
    client.close();
  }
});

// test cases

describe('POST /register -> if email and username is given', () => {
  test('should register a users', async () => {
    let registeredUser = await request(app)
      .post('/client/auth/register')
      .send({
        'name':'Elijah Schiller',
        'email':'Fae_McKenzie@hotmail.com',
        'password':'WobZev7prnN758h',
        'companyId':insertedCompanies.insertedId,
        'userType':authConstant.USER_TYPES.User,
        'mobileNo':'(757) 499-6759',
        'username':'Leilani.Labadie',
        'addedBy':insertedUsers.insertedId,
        'updatedBy':insertedUsers.insertedId
      });
    
    expect(registeredUser.statusCode).toBe(200);
    expect(registeredUser.body.status).toBe('SUCCESS');
    expect(registeredUser.body.data).toMatchObject({ id: expect.any(String) });
  });
});

describe('POST /login -> if username and password is correct', () => {
  test('should return users with authentication token', async () => {
    let users = await request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Leilani.Labadie',
          password: 'WobZev7prnN758h'
        }
      );
      
    expect(users.statusCode).toBe(200);
    expect(users.body.status).toBe('SUCCESS');
    expect(users.body.data).toMatchObject({
      id: expect.any(String),
      token: expect.any(String)
    }); 
  });
});

describe('POST /login -> if username is incorrect', () => {
  test('should return unauthorized status and users not exists', async () => {
    let users = await request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'wrong.username',
          password: 'WobZev7prnN758h'
        }
      );

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if password is incorrect', () => {
  test('should return unauthorized status and incorrect password', async () => {
    let users = await request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Leilani.Labadie',
          password: 'wrong@password'
        }
      );

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if username or password is empty string or has not passed in body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let users = await request(app)
      .post('/client/auth/login')
      .send({});

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email has not passed from request body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let users = await request(app)
      .post('/client/auth/forgot-password')
      .send({ email: '' });

    expect(users.statusCode).toBe(422);
    expect(users.body.status).toBe('VALIDATION_ERROR');
  });
});

describe('POST /forgot-password -> if email passed from request body is not available in database ', () => {
  test('should return record not found status', async () => {
    let users = await request(app)
      .post('/client/auth/forgot-password')
      .send({ 'email': 'unavailable.email@hotmail.com', });

    expect(users.statusCode).toBe(200);
    expect(users.body.status).toBe('RECORD_NOT_FOUND');
  });
});

describe('POST /forgot-password -> if email passed from request body is valid and OTP sent successfully', () => {
  test('should return success message', async () => {
    let users = await request(app)
      .post('/client/auth/forgot-password')
      .send({ 'email':'Fae_McKenzie@hotmail.com', });

    expect(users.statusCode).toBe(200);
    expect(users.body.status).toBe('SUCCESS');
  });
});

describe('POST /validate-otp -> OTP is sent in request body and OTP is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Leilani.Labadie',
          password: 'WobZev7prnN758h'
        }).then(login => () => {
        return request(app)
          .get(`/client/api/v1/users/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .post('/client/auth/validate-otp')
              .send({ 'otp': foundUser.body.data.resetPasswordLink.code, }).then(users => {
                expect(users.statusCode).toBe(200);
                expect(users.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('POST /validate-otp -> if OTP is incorrect or OTP has expired', () => {
  test('should return invalid OTP', async () => {
    let users = await request(app)
      .post('/client/auth/validate-otp')
      .send({ 'otp': '12334' });
    expect(users.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(users.body.status).toBe('BAD_REQUEST');
    expect(users.statusCode).toBe(400);
  });
});

describe('POST /validate-otp -> if request body is empty or OTP has not been sent in body', () => {
  test('should return insufficient parameter', async () => {
    let users = await request(app)
      .post('/client/auth/validate-otp')
      .send({});

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> code is sent in request body and code is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Leilani.Labadie',
          password: 'WobZev7prnN758h'
        }).then(login => () => {
        return request(app)
          .get(`/client/api/v1/users/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .put('/client/auth/validate-otp')
              .send({
                'code': foundUser.body.data.resetPasswordLink.code,
                'newPassword':'newPassword'
              }).then(users => {
                  
                expect(users.statusCode).toBe(200);
                expect(users.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('PUT /reset-password -> if request body is empty or code/newPassword is not given', () => {
  test('should return insufficient parameter', async () => {
    let users = await request(app)
      .put('/client/auth/reset-password')
      .send({});
  
    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> if code is invalid', () => {
  test('should return invalid code', async () => {
    let users = await request(app)
      .put('/client/auth/reset-password')
      .send({
        'code': '123',
        'newPassword': 'testPassword'
      });

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

afterAll(function (done) {
  db.connection.db.dropDatabase(function () {
    db.connection.close(function () {
      done();
    });
  });
});
