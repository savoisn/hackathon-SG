import { request } from './networking';
import { MAKE_MONEY_TRANSFER } from '../constants/transferMoney';

export const getAccountBalance = () => (dispatch) => {
  dispatch(request('api/OpenBankApi/getAccount?bankAccount=f6b4636a-682b-49ea-b7e3-5634453453a5', { method: 'GET', userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.t6SOHx8HNvDNnjlSV1wLs8qHMGcc8d1kQa05irCYsHE' })).then((response) => {
    console.log('Account balance : ', response);
  });
};

export const makeMoneyTransfer = (fromUser, toUser, amount, transactionLabel) => (dispatch) => {
    let fromBankAccount;
    let userToken;
    switch (fromUser) {
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
      case 'seller@fakeshop.com':
        fromBankAccount = 'baaf2c7d-8e0c-4aec-b320-2859f887175a';
        userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.blx7sBKXbfuJS09U3krjGrSN1QAiS_rAYsm6Ww-w17o';
        break;
      default:
        break;
    }

    let toBankAccount;
    switch (toUser) {
      case 'nsavois@gmail.com':
        toBankAccount = 'f6b4636a-682b-49ea-b7e3-5634453453a5';
        break;
      case 'aambal@gmail.com':
        toBankAccount = 'a60bbee8-c412-4f46-b7c0-5c98fa7c1f7d';
        break;
      case 'bdekens@gmail.com':
        toBankAccount = 'ef910243-9b50-4aba-b918-364318694ba4';
        break;
      case 'tnguyen@gmail.com':
        toBankAccount = 'e5de7055-fa77-4b15-85f1-391e5b926bd0';
        break;
      case 'seller@fakeshop.com':
        toBankAccount = 'baaf2c7d-8e0c-4aec-b320-2859f887175a';
        break;
      default:
        break;
    }

    dispatch(request(`api/OpenBankApi/transferMoney?fromBankAccount=${fromBankAccount}`, {
      method: 'POST',
      userToken,
      body: JSON.stringify({
        value: {
          currency: 'EUR',
          amount,
        },
        description: transactionLabel,
        to: {
          bank_id: 'socgen.31.fr.fr',
          account_id: toBankAccount,
        },
      }),
    })).then((response) => {
        console.log('Money transfer : ', response);
        // dispatch({ type: MAKE_MONEY_TRANSFER, documentParameters: response.data });
    });
};

export default makeMoneyTransfer;
