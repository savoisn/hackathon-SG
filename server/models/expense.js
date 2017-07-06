module.exports = function (Expense) {

  Expense.paySeller = function (amount, username, next) {
    let userId = null;
    let fromBankAccount = null;
    let userToken = null;
    let body = {};
    Expense.app.models.sguser.findOne({
      where: {
        username
      }
    }).then(user => {
      userId = user.id;
      switch (user.email) {
        case 'nsavois@gmail.com':
          fromBankAccount = 'f6b4636a-682b-49ea-b7e3-5634453453a5';
          userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.t6SOHx8HNvDNnjlSV1wLs8qHMGcc8d1kQa05irCYsHE';
          break;
        case 'aambal@gmail.com':
          fromBankAccount = 'a60bbee8-c412-4f46-b7c0-5c98fa7c1f7d';
          userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.Z1BiE-ke9YlbfjBfoe4mHR2aDPgkHRKYONBz9KXGTFc';
          break;
        case 'bdekens@gmail.com':
          fromBankAccount = 'ef910243-9b50-4aba-b918-364318694ba4';
          userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.blx7sBKXbfuJS09U3krjGrSN1QAiS_rAYsm6Ww-w17o';
          break;
        case 'tnguyen@gmail.com':
          fromBankAccount = 'e5de7055-fa77-4b15-85f1-391e5b926bd0';
          userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.bTHGI4-rAu5n2Gh2gdrLXto8MVyVloG3X02_C3GMBms';
          break;
        default:
          break;
      }
      console.log(amount, user);
      // body = JSON.stringify({
      //   value: {
      //     currency: 'EUR',
      //     amount
      //   },
      //   description: 'Castorama',
      //   to: {
      //     bank_id: 'socgen.31.fr.fr',
      //     account_id: 'baaf2c7d-8e0c-4aec-b320-2859f887175a'
      //   }
      // });
      // Expense.app.models.OpenBankApi.transferMoney(fromBankAccount, body, userToken, processResponse)
      // .then(res => {
      //   console.log(res);
      //   next();
      // });
      // const newExpense = {
      //   name: 'Castorama',
      //   date: new Date(),
      //   amount,
      //   PayerId: userId,
      //   settled: true,
      //   projectId: 1
      // };
      // return Expense.create(newExpense, next);
    })
    .catch(err => { console.log(err);});
  };

  Expense.remoteMethod('paySeller', {
    accepts: [
      {
        arg: 'amount',
        type: 'number',
        required: true,
        http: {
          source: 'query'
        }
      }, {
        arg: 'username',
        type: 'string',
        required: true,
        http: {
          source: 'query'
        }
      }
    ]
  });
  return {
    returns: {
      root: true,
      type: 'array'
    },
    http: {
      path: '/payseller',
      verb: 'GET'
    },
    description: 'directly pay a seller and add a new line'
  };
};