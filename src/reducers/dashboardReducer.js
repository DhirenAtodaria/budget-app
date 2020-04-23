const initState = {
    monthlyTotal: null,
    yearlyTotal: null,
    currentData: null,
    prevMonthData: null,
    prevMonthDataExclBills: null,
    activeLoader: true,
};

export const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case "MONTHLY_SETTING":
            return {
                ...state,
                monthlyTotal: action.monthlyTotal,
            };
        case "YEARLY_SETTING":
            return {
                ...state,
                yearlyTotal: action.yearlyTotal,
            };
        case "CURRENTDATA_SETTING":
            return {
                ...state,
                currentData: action.currentData,
            };
        case "PREVMONTHDATA_SETTING":
            return {
                ...state,
                prevMonthData: action.prevMonthData,
            };
        case "PREVMONTHDATAEXCLBILLS_SETTING":
            return {
                ...state,
                prevMonthDataExclBills: action.prevMonthDataExclBills,
                activeLoader: false,
            };
        case "ACTIVATE_LOADER":
            return {
                ...state,
                activeLoader: action.bool,
            };
        default:
            return state;
    }
};
