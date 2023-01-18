const accountsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "ACCOUNTS":
            return payload;
        default:
            return state;
    }
};

export default accountsReducer;
