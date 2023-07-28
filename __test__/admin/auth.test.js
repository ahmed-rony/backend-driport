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
      companyName: 'Forge',
      registrationNumber: 'wireless',
      email: 'Talia_Kuphal56@gmail.com',
      phone: '(099) 511-5579',
      website: 'application',
      address: '3127 Altenwerth Alley',
      otherData: 'navigate',
      userId: '64c312defdb0dc07dd7fe263',
      id: '64c312defdb0dc07dd7fe264'
    });
    const users = dbInstance.collection('users');
    insertedUsers = await users.insertOne({
      name: 'Violet Corwin',
      email: 'Darrel.Kuphal@yahoo.com',
      password: 'YFRjf7wNXqcKzxx',
      role: 'Technician',
      companyId: '64c312defdb0dc07dd7fe26a',
      userType: 344,
      mobileNo: '(530) 303-7227',
      username: 'Jacquelyn.Hansen95',
      resetPasswordLink: {},
      loginRetryLimit: 40,
      loginReactiveTime: '2023-12-29T06:03:12.004Z',
      id: '64c312defdb0dc07dd7fe26b'
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
      .post('/admin/auth/register')
      .send({
        'name':'Megan Emard III',
        'email':'Jermain.Rice49@hotmail.com',
        'password':'zXwj9fgf_oy_SxT',
        'companyId':insertedCompanies.insertedId,
        'userType':authConstant.USER_TYPES.User,
        'mobileNo':'(788) 203-1845',
        'username':'Kailee.Bosco93',
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
      .post('/admin/auth/login')
      .send(
        {
          username: 'Kailee.Bosco93',
          password: 'zXwj9fgf_oy_SxT'
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
      .post('/admin/auth/login')
      .send(
        {
          username: 'wrong.username',
          password: 'zXwj9fgf_oy_SxT'
        }
      );

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if password is incorrect', () => {
  test('should return unauthorized status and incorrect password', async () => {
    let users = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Kailee.Bosco93',
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
      .post('/admin/auth/login')
      .send({});

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email has not passed from request body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let users = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ email: '' });

    expect(users.statusCode).toBe(422);
    expect(users.body.status).toBe('VALIDATION_ERROR');
  });
});

describe('POST /forgot-password -> if email passed from request body is not available in database ', () => {
  test('should return record not found status', async () => {
    let users = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ 'email': 'unavailable.email@hotmail.com', });

    expect(users.statusCode).toBe(200);
    expect(users.body.status).toBe('RECORD_NOT_FOUND');
  });
});

describe('POST /forgot-password -> if email passed from request body is valid and OTP sent successfully', () => {
  test('should return success message', async () => {
    let users = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ 'email':'Jermain.Rice49@hotmail.com', });

    expect(users.statusCode).toBe(200);
    expect(users.body.status).toBe('SUCCESS');
  });
});

describe('POST /validate-otp -> OTP is sent in request body and OTP is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Kailee.Bosco93',
          password: 'zXwj9fgf_oy_SxT'
        }).then(login => () => {
        return request(app)
          .get(`/admin/users/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .post('/admin/auth/validate-otp')
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
      .post('/admin/auth/validate-otp')
      .send({ 'otp': '12334' });
    expect(users.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(users.body.status).toBe('BAD_REQUEST');
    expect(users.statusCode).toBe(400);
  });
});

describe('POST /validate-otp -> if request body is empty or OTP has not been sent in body', () => {
  test('should return insufficient parameter', async () => {
    let users = await request(app)
      .post('/admin/auth/validate-otp')
      .send({});

    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> code is sent in request body and code is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Kailee.Bosco93',
          password: 'zXwj9fgf_oy_SxT'
        }).then(login => () => {
        return request(app)
          .get(`/admin/users/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .put('/admin/auth/validate-otp')
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
      .put('/admin/auth/reset-password')
      .send({});
  
    expect(users.statusCode).toBe(400);
    expect(users.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> if code is invalid', () => {
  test('should return invalid code', async () => {
    let users = await request(app)
      .put('/admin/auth/reset-password')
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
