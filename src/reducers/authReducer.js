const initState = {
    errors: {
        error: false,
        content: "",
        errorMessage1: null,
        errorMessage2: null,
        errorMessage3: null,
        errorMessage4: null,
        error2: false,
        content2: "",
    },
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            let code = action.errors.code;
            switch (code) {
                case "auth/invalid-email":
                    return {
                        ...state,
                        errors: {
                            errorMessage3: {
                                content: "Please enter a valid email adrress",
                                pointing: "below",
                            },
                        },
                    };
                case "auth/wrong-password":
                    return {
                        ...state,
                        errors: {
                            errorMessage4: {
                                content:
                                    "The password you have entered in incorrect.",
                            },
                        },
                    };
                case "auth/user-not-found":
                    return {
                        ...state,
                        errors: {
                            error2: true,
                            content2:
                                "There isn't an account associated with that e-mail address.",
                        },
                    };
                default:
                    return {
                        ...state,
                        errors: {
                            error2: true,
                            content: `An error has occured. Code: ${code}`,
                        },
                    };
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
            };
        case "ADDITIONAL_LOGIN":
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default authReducer;
