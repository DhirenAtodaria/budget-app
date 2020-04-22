const initState = {
    spends: [],
    filteredspends: [],
    loading: true,
    active: false,
    error: false,
};

const dateReturner = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case "add/spendings":
            return {
                ...state,
                spends: action.spends,
                filteredspends: action.spends,
                loading: false,
                active: true,
            };
        case "add/monthly":
            return {
                ...state,
                spends: action.spends,
                filteredspends: action.spends,
                loading: false,
                active: true,
            };
        case "add/yearly":
            return {
                ...state,
                spends: action.spends,
                filteredspends: action.spends,
                loading: false,
                active: true,
            };
        case "LOADING_CHANGE":
            return {
                ...state,
                loading: action.payload,
            };
        case "ERROR_CHANGE":
            return {
                ...state,
                error: action.payload,
            };
        case "DATE_FILTERING":
            let spends = state.spends;
            return {
                ...state,
                filteredspends: spends.filter(
                    (item) =>
                        dateReturner(item.date.toDate()) ===
                        dateReturner(action.date)
                ),
            };
        case "DATA_RESTORING":
            return {
                ...state,
                filteredspends: state.spends,
            };
        case "DATA_RESET":
            return {
                ...state,
                spends: [],
                filteredspends: [],
                loading: true,
                active: false,
                error: false,
            };
        default:
            return state;
    }
};
