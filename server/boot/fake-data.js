'use strict';

module.exports = function (server) {
  server.dataSources.db.automigrate('SgUser', function(err) {
    if(err) throw err;
    
    server.models.SgUser.create([{
      username: 'nsavois',
      email: 'nsavois@gmail.com',
      password: '1234',
      firstName: 'Nicolas',
      lastName: 'Savois',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'aambal',
      email: 'aambal@gmail.com',
      password: '1234',
      firstName: 'Aurelie',
      lastName: 'Ambal',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'bdekens',
      email: 'bdekens@gmail.com',
      password: '1234',
      firstName: 'Benjamin',
      lastName: 'Dekens',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'tnguyen',
      email: 'tnguyen@gmail.com',
      password: '1234',
      firstName: 'Thang',
      lastName: 'Nguyen',
      roles:[
        {name: "ADMIN"}
      ]
    }], function(err, coffeeShops) {
      if (err) throw err;
    });
  });
}
