const initialState = {
    toto: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CLOSE_PROJECT': {
            console.log('REDUCER');
            return Object.assign({}, state, { closeProjectBool: true });
        }
        default:
            return state;
    }
}
