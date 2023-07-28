const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const usersDb = require('../data-access/usersDb');
const roleDb = require('../data-access/roleDb');
const projectRouteDb = require('../data-access/projectRouteDb');
const routeRoleDb = require('../data-access/routeRoleDb');
const userRoleDb = require('../data-access/userRoleDb');
const replaceAll = require('../utils/replaceAll');

async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'uFtsKPCplLYxb5d',
      'isDeleted':false,
      'username':'Lauriane17',
      'email':'Yasmin56@hotmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let user = await usersDb.updateOne( { 'username':'Lauriane17' }, userToBeInserted,  {
      upsert: true,
      new: true
    });
    userToBeInserted = {
      'password':'HAQgY3kejqvO6Nb',
      'isDeleted':false,
      'username':'Greyson.Gorczany',
      'email':'Geo.Mayert@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let admin = await usersDb.updateOne( { 'username':'Greyson.Gorczany' }, userToBeInserted,  {
      upsert: true,
      new: true
    });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
async function seedRole () {
  try {
    const roles = [ 'Admin', 'User', 'System_User' ];
    const insertedRoles = await roleDb.findMany({ code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await roleDb.create(rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

async function seedProjectRoutes (routes) {
  try {
    if (routes && routes.length) {
      let routeName = '';
      const dbRoutes = await projectRouteDb.findMany({});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await projectRouteDb.create(routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/companies/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/companies/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/companies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/companies/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/companies/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/companies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/companies/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/companies/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/companies/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/companies/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/companies/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/companies/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/companies/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/companies/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/companies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/companies/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/companies/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/companies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/companies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/companies/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/companies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/companies/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/companies/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/companies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/companies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/companies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/companies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/companies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/companies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/companies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/companies/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/companies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/conversations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/conversations/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/conversations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/conversations/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/conversations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/conversations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/conversations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/drivers/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/drivers/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/drivers/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/drivers/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/drivers/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/drivers/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/drivers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/drivers/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/drivers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/drivers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/drivers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/drivers/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/drivers/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/drivers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/drivers/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/drivers/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/reports/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reports/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/reports/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reports/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/reports/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reports/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/reports/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/reports/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/reports/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/reports/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/reports/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reports/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/reports/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/reports/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/reports/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reports/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/reports/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reports/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/reports/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reports/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/reports/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reports/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/reports/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reports/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/reports/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/reports/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reports/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/users/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/users/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/users/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/users/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vehicles/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vehicles/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vehicles/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/vehicles/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/vehicles/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/vehicles/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/vehicles/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/vehicles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/vehicles/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/vehicles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vehicles/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/vehicles/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/vehicles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/vehicles/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/vehicles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/companies/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/companies/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/companies/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/companies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/companies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/companies/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/companies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/conversations/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/conversations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/conversations/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/conversations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/conversations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/conversations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/conversations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/drivers/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/drivers/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/drivers/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/drivers/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/drivers/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/drivers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/drivers/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/drivers/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/drivers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/drivers/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/drivers/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/reports/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/reports/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/reports/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/reports/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/reports/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/reports/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/reports/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/reports/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/reports/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/reports/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/users/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/users/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/vehicles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/vehicles/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/vehicles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/vehicles/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/vehicles/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/vehicles/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/vehicles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/vehicles/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/vehicles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Admin', 'User', 'System_User' ];
      const insertedProjectRoute = await projectRouteDb.findMany({
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await roleDb.findMany({
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await routeRoleDb.findOne({
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await routeRoleDb.create(routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

async function seedUserRole () {
  try {
    const userRoles = [{
      'username':'Lauriane17',
      'password':'uFtsKPCplLYxb5d'
    },{
      'username':'Greyson.Gorczany',
      'password':'HAQgY3kejqvO6Nb'
    }];
    const defaultRoles = await roleDb.findMany();
    const insertedUsers = await usersDb.findMany( { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await userRoleDb.findOne({
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await userRoleDb.create(userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

const seedData = async (allRegisterRoutes) => {
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;
