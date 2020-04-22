export const loadingHandling = (bool) => {
    return { type: "LOADING_CHANGE", payload: bool };
};

export const errorHandling = (bool) => {
    return { type: "ERROR_CHANGE", payload: bool };
};

export const dataReset = () => {
    return { type: "DATA_RESET" };
};

export const dataFilter = (date) => {
    return {
        type: "DATE_FILTERING",
        date,
    };
};

export const dataRestore = () => {
    return { type: "DATA_RESTORING" };
};

export const dataRetreiver = (collection, uid) => (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection(collection)
        .where("uid", "==", uid)
        .get()
        .then((query) => {
            const spends = query.docs.map((doc) => {
                return Object.assign(doc.data(), { spendID: doc.id });
            });
            spends.sort((a, b) => b.date - a.date);
            dispatch(loadingHandling(false));
            dispatch({ type: `add/${collection}`, spends });
        });
};

export const dataRemover = (collection, value, uid) => (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();

    firestore
        .collection(collection)
        .doc(value)
        .delete()
        .then(() => {
            dispatch(dataRetreiver(collection, uid));
        });
};

export const dataSubmit = (collection, formdata, uid) => (
    dispatch,
    getState,
    { getFirestore }
) => {
    dispatch(loadingHandling(true));
    const firestore = getFirestore();

    firestore
        .collection(collection)
        .add(formdata)
        .then(() => {
            dispatch(errorHandling(false));
            dispatch(dataRetreiver(collection, uid));
        });
};
