export default (state = {user:null,type:-1,account: null}, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return action.payload;
        case "SIGN_OUT":
            return action.payload;
        default:
            return state;
    }
};