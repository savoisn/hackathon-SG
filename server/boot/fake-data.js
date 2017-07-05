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
      pik: 'https://lh5.googleusercontent.com/-xoWiDa_ZUl8gJRaC59HR4bxXSmHG3nbkSi26yboPiMyzRgXdsZej-YSqfL6_buzLZa_77eIKH7yifQ=w1920-h915',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'aambal',
      email: 'aambal@gmail.com',
      password: '1234',
      firstName: 'Aurelie',
      lastName: 'Ambal',
      pik: 'https://lh5.googleusercontent.com/CqL_d3MK4kH1An6-m5xPzXaH1kzU1wJPTTpEHCCqOHOsviCJKHkT-KByUfdmmK35gpHPhjJYO3LazyM=w1920-h915',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'bdekens',
      email: 'bdekens@gmail.com',
      password: '1234',
      firstName: 'Benjamin',
      lastName: 'Dekens',
      pik: 'https://lh4.googleusercontent.com/LMkFln0Tfcn9C2BMkYJou_AHkwK4BFJIj4yfFDCBZ528Mt4RZ4iSmEzY5-77l5UDIRga8Hsj3BP9ek8=w1920-h915',
      roles:[
        {name: "ADMIN"}
      ]
    }, {
      username: 'tnguyen',
      email: 'tnguyen@gmail.com',
      password: '1234',
      firstName: 'Thang',
      lastName: 'Nguyen',
      pik: 'https://lh5.googleusercontent.com/fg9vTNIbfjG-TMvLkwnAPUyN3jRw0qkD5sR8EH23GrR3UVPeyVs60HhUa-LGk94TIKdREfmQrTom7OU=w1920-h915',
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
      name:'first expense',
			date: new Date(),
			amount: 2000,
			PayerId: 1,
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
