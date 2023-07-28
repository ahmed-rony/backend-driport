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
      companyName: 'Developer',
      registrationNumber: 'syndicate',
      email: 'Beverly12@hotmail.com',
      phone: '(287) 836-7819',
      website: 'Fully-configurable',
      address: '1235 Schaefer Summit',
      otherData: 'networks',
      userId: '64c31696cf83460863783189',
      id: '64c31696cf8346086378318a'
    });
    const users = dbInstance.collection('users');
    insertedUsers = await users.insertOne({
      name: 'Maureen Willms DDS',
      email: 'Caleb_Ruecker@yahoo.com',
      password: 'c5RVyj4aV0hlG8E',
      role: 'Grass-roots',
      companyId: '64c31696cf83460863783190',
      userType: 611,
      mobileNo: '(753) 510-4185',
      username: 'Derick_Quitzon',
      resetPasswordLink: {},
      loginRetryLimit: 203,
      loginReactiveTime: '2024-02-20T09:55:08.725Z',
      id: '64c31696cf83460863783191'
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
        'name':'Joshua Kuhlman',
        'email':'Mandy_Krajcik5@gmail.com',
        'password':'H1k_NQ89ix1r4hC',
        'companyId':insertedCompanies.insertedId,
        'userType':authConstant.USER_TYPES.User,
        'mobileNo':'(565) 502-4975',
        'username':'Lizzie37',
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
          username: 'Lizzie37',
          password: 'H1k_NQ89ix1r4hC'
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
          password: 'H1k_NQ89ix1r4hC'
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
          username: 'Lizzie37',
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
      .send({ 'email':'Mandy_Krajcik5@gmail.com', });

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
          username: 'Lizzie37',
          password: 'H1k_NQ89ix1r4hC'
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
          username: 'Lizzie37',
          password: 'H1k_NQ89ix1r4hC'
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
