const dateReturner = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const dateObjectRetreiverCurrentMonth = (monthly, yearly) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59
    );
    let currentMonth = [];
    while (firstDay.getDate() <= currentDate.getDate()) {
        let dateObject = {};
        dateObject["x"] = dateReturner(new Date(firstDay));
        dateObject["y"] = Math.round(monthly / 30 + yearly / 365);
        currentMonth.push(dateObject);
        firstDay.setDate(firstDay.getDate() + 1);
    }
    return currentMonth;
};

const dateObjectRetreiver = (monthly, yearly) => {
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let month = [];
    while (prevMonthDate.getMonth() === date.getMonth() - 1) {
        let dateObject = {};
        dateObject["x"] = dateReturner(new Date(prevMonthDate));
        dateObject["y"] = Math.round(monthly / 30 + yearly / 365);
        month.push(dateObject);
        prevMonthDate.setDate(prevMonthDate.getDate() + 1);
    }
    return month;
};

const dateObjectRetreiverDaily = () => {
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let month2 = [];
    while (prevMonthDate.getMonth() === date.getMonth() - 1) {
        let dateObject = {};
        dateObject["x"] = dateReturner(new Date(prevMonthDate));
        dateObject["y"] = 0;
        month2.push(dateObject);
        prevMonthDate.setDate(prevMonthDate.getDate() + 1);
    }
    return month2;
};

export const currentMonthsDataRetriever = (uid, loading) => (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    let monthlyTotal;
    let yearlyTotal;

    const date = new Date();

    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59);

    const currentFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59
    );

    firestore
        .collection("monthly")
        .where("uid", "==", uid)
        .get()
        .then((query) => {
            const monthly = query.docs.map((doc) => doc.data());
            let total = 0;
            monthly.forEach((item) => {
                total += Number(item.amount);
            });

            monthlyTotal = total;
            dispatch({ type: "MONTHLY_SETTING", monthlyTotal });
        });

    firestore
        .collection("yearly")
        .where("uid", "==", uid)
        .get()
        .then((query) => {
            const yearly = query.docs.map((doc) => doc.data());
            let total = 0;
            yearly.forEach((item) => {
                total += Number(item.amount);
            });

            yearlyTotal = total;
            dispatch({ type: "YEARLY_SETTING", yearlyTotal });
        })
        .then(() => {
            firestore
                .collection("spendings")
                .where("date", ">=", currentFirstDay)
                .where("date", "<=", currentDay)
                .where("uid", "==", uid)
                .get()
                .then((query) => {
                    let currentMonth = dateObjectRetreiverCurrentMonth(
                        monthlyTotal,
                        yearlyTotal
                    );
                    const daily = query.docs.map((doc) => doc.data());
                    daily.sort((a, b) => b.date - a.date).reverse();
                    daily.forEach((item) => {
                        item.date = dateReturner(item.date.toDate());
                    });
                    let index = 0;
                    while (index < daily.length) {
                        let currentDate = daily[index].date;
                        let currentMonthObject = currentMonth.find(
                            (item) => item.x === currentDate
                        );
                        let object = {};
                        let dateArray = daily.filter(
                            (item) => item.date === currentDate
                        );
                        let amount = Math.round(
                            monthlyTotal / 30 + yearlyTotal / 365
                        );
                        dateArray.forEach(
                            (item) => (amount += Number(item.amount))
                        );
                        object["x"] = currentDate;
                        object["y"] = amount;
                        currentMonth.splice(
                            currentMonth.indexOf(currentMonthObject),
                            1,
                            object
                        );
                        index += dateArray.length;
                    }
                    const currentData = [
                        {
                            id: "Daily",
                            color: "hsl(290, 70%, 50%)",
                            data: currentMonth,
                        },
                    ];
                    dispatch({ type: "CURRENTDATA_SETTING", currentData });
                });
        })
        .then(() => {
            firestore
                .collection("spendings")
                .where("date", ">=", firstDay)
                .where("date", "<=", lastDay)
                .where("uid", "==", uid)
                .get()
                .then((query) => {
                    let month = dateObjectRetreiver(monthlyTotal, yearlyTotal);
                    let month2 = dateObjectRetreiverDaily(
                        monthlyTotal,
                        yearlyTotal
                    );
                    const daily = query.docs.map((doc) => doc.data());
                    daily.sort((a, b) => b.date - a.date).reverse();
                    daily.forEach((item) => {
                        item.date = dateReturner(item.date.toDate());
                    });

                    let index = 0;
                    while (index < daily.length) {
                        let currentDate = daily[index].date;
                        let currentMonthObject = month.find(
                            (item) => item.x === currentDate
                        );
                        let currentMonthObject2 = month2.find(
                            (item) => item.x === currentDate
                        );
                        let object = {};
                        let object2 = {};
                        let dateArray = daily.filter(
                            (item) => item.date === currentDate
                        );
                        let amount = Math.round(
                            monthlyTotal / 30 + yearlyTotal / 365
                        );
                        let amount2 = 0;
                        dateArray.forEach(
                            (item) => (amount += Number(item.amount))
                        );
                        dateArray.forEach(
                            (item) => (amount2 += Number(item.amount))
                        );
                        object["x"] = currentDate;
                        object["y"] = amount;
                        object2["x"] = currentDate;
                        object2["y"] = amount2;
                        month.splice(
                            month.indexOf(currentMonthObject),
                            1,
                            object
                        );
                        month2.splice(
                            month2.indexOf(currentMonthObject2),
                            1,
                            object2
                        );
                        index += dateArray.length;
                    }

                    const prevMonthData = [
                        {
                            id: "Daily",
                            color: "hsl(290, 70%, 50%)",
                            data: month,
                        },
                    ];

                    dispatch({ type: "PREVMONTHDATA_SETTING", prevMonthData });

                    const prevMonthDataExclBills = [
                        {
                            id: "Daily",
                            color: "hsl(290, 70%, 50%)",
                            data: month2,
                        },
                    ];

                    dispatch({
                        type: "PREVMONTHDATAEXCLBILLS_SETTING",
                        prevMonthDataExclBills,
                    });
                });
        });
};
