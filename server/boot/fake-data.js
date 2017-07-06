'use strict';

module.exports = function (server) {
  server.dataSources.db.automigrate('project', function(err) {
    if(err) throw err;

    server.models.project.create([{
      id: 1,
      name: "Renovons la maison familiale",
      totalspent: "0",
      open: true,
      finalizing: "",
    }], function(err, projects) {
      if (err) throw err;
    });
  });

  server.dataSources.db.automigrate('sguser', function(err) {
    if(err) throw err;

    server.models.sguser.create([{
      username: 'nsavois',
      email: 'nsavois@gmail.com',
      password: '1234',
      firstName: 'Nicolas',
      lastName: 'Savois',
      pik: 'https://image.noelshack.com/fichiers/2017/27/4/1499295219-nsavois.jpg',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'aambal',
      email: 'aambal@gmail.com',
      password: '1234',
      firstName: 'Aurelie',
      lastName: 'Ambal',
      pik: 'https://image.noelshack.com/fichiers/2017/27/4/1499295218-aambal.jpg',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'bdekens',
      email: 'bdekens@gmail.com',
      password: '1234',
      firstName: 'Benjamin',
      lastName: 'Dekens',
      pik: 'https://image.noelshack.com/fichiers/2017/27/4/1499295219-bdekens.jpg',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'tnguyen',
      email: 'tnguyen@gmail.com',
      password: '1234',
      firstName: 'Thang',
      lastName: 'Nguyen',
      pik: 'https://image.noelshack.com/fichiers/2017/27/4/1499295219-tnguyen.jpg',
      roles:[
        {name: "ADMIN"}
      ]
    }], function(err, users) {
      if (err) throw err;
    });
  });
  server.dataSources.db.automigrate('ProjectUser', function(err) {
    if(err) throw err;

    server.models.ProjectUser.create([{
      userId: 1,
      projectId: 1
    },{
      userId: 2,
      projectId: 1
    },{
      userId: 3,
      projectId: 1
    },{
      userId: 4,
      projectId: 1
    }], function(err, projects) {
      if (err) throw err;
    });
  });
  server.dataSources.db.automigrate('expense', function(err) {
    if(err) throw err;

    server.models.expense.create([{
      name:'Rideaux',
			date: new Date(),
			amount: 50,
			PayerId: 1,
			settled: true,
			projectId: 1

    },
    {
      name:'Canapé 2 places',
			date: new Date(),
			amount: 200,
			PayerId: 1,
			settled: true,
			projectId: 1

    },
    {
      name:'Tringles',
			date: new Date(),
			amount: 100,
			PayerId: 2,
			settled: true,
			projectId: 1

    },
    {
      name:'Chaise design',
			date: new Date(),
			amount: 200,
			PayerId: 4,
			settled: true,
			projectId: 1

    }], function(err, projects) {
      if (err) throw err;
    });
  });
  server.dataSources.db.automigrate('ExpenseRecipient', function(err) {
    if(err) throw err;

    server.models.ExpenseRecipient.create([{
      recipientId: 2,
      expenseId: 1
    }, {
      recipientId: 3,
      expenseId: 1
    }], function(err, projects) {
      if (err) throw err;
    });
  });
}
