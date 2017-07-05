'use strict';

module.exports = function (server) {
  server.dataSources.db.automigrate('SgUser', function(err) {
    if(err) throw err;
    
    server.models.SgUser.create([{
      username: 'nsavois',
      email: 'nsavois@gmail.com',
      password: '1234',
    }, {
      username: 'aambal',
      email: 'aambal@gmail.com',
      password: '1234',
    }, {
      username: 'bdekens',
      email: 'bdekens@gmail.com',
      password: '1234',
    }, {
      username: 'tnguyen',
      email: 'tnguyen@gmail.com',
      password: '1234',
    }], function(err, coffeeShops) {
      if (err) throw err;
    });
  });
}
