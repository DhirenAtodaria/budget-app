import React, { Component } from "react";
import styles from "./StatisticsPage.module.scss";
import Graph from "./Graph";
import { firestore } from "../../firebase";
import { Card, Dimmer, Loader } from "semantic-ui-react";

export default class StatisticsPage extends Component {
  state = {
    monthly: null,
    yearly: null,
    data: null,
    activeLoader: false
  };

  dateReturner = date => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  componentDidMount() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

    firestore
      .collection("monthly")
      .get()
      .then(query => {
        this.setState({activeLoader : true})
        const monthly = query.docs.map(doc => doc.data());
        let total = 0;
        monthly.forEach(item => {
          total += Number(item.amount);
        });

        this.setState({ monthly: total });
      })
      .then(() => {
        firestore
          .collection("yearly")
          .get()
          .then(query => {
            const yearly = query.docs.map(doc => doc.data());
            let total = 0;
            yearly.forEach(item => {
              total += Number(item.amount);
            });

            this.setState({ yearly: total });
          });
      })
      .then(() => {
        firestore
          .collection("spendings")
          .where("date", ">", firstDay)
          .where("date", "<", lastDay)
          .get()
          .then(query => {
            let month = this.dateObjectRetreiver();
            let month2 = this.dateObjectRetreiverDaily();

            const daily = query.docs.map(doc => doc.data());
            daily.sort((a, b) => b.date - a.date).reverse();
            daily.forEach(item => {
              item.date = this.dateReturner(item.date.toDate());
            });

            let index = 0;
            while (index < daily.length) {
              let currentDate = daily[index].date;
              let currentMonthObject = month.find(
                item => item.x === currentDate
              );
              let currentMonthObject2 = month2.find(
                item => item.x === currentDate
              );
              let object = {};
              let dateArray = daily.filter(item => item.date === currentDate);
              let amount = 0;
              dateArray.forEach(item => (amount += Number(item.amount)));
              object["x"] = currentDate;
              object["y"] = amount;
              month.splice(month.indexOf(currentMonthObject), 1, object);
              month2.splice(month2.indexOf(currentMonthObject2), 1, object);
              index += dateArray.length;
            }
            month.forEach(
              item =>
                (item.y += Math.round(
                  this.state.monthly / 30 + this.state.yearly / 365
                ))
            );
            this.setState({
              data: [
                {
                  id: "Daily",
                  color: "hsl(290, 70%, 50%)",
                  data: month
                }
              ],

              data2: [
                {
                  id: "Daily",
                  color: "hsl(290, 70%, 50%)",
                  data: month2
                }
              ],

              activeLoader : false
            });
          });
      });
  }

  dateObjectRetreiver = () => {
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let month = [];
    while (prevMonthDate.getMonth() === date.getMonth() - 1) {
      let dateObject = {};
      dateObject["x"] = this.dateReturner(new Date(prevMonthDate));
      dateObject["y"] = Math.round(
        this.state.monthly / 30 + this.state.yearly / 365
      );
      month.push(dateObject);
      prevMonthDate.setDate(prevMonthDate.getDate() + 1);
    }
    return month;
  };

  dateObjectRetreiverDaily = () => {
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let month2 = [];
    while (prevMonthDate.getMonth() === date.getMonth() - 1) {
      let dateObject = {};
      dateObject["x"] = this.dateReturner(new Date(prevMonthDate));
      dateObject["y"] = 0;
      month2.push(dateObject);
      prevMonthDate.setDate(prevMonthDate.getDate() + 1);
    }
    return month2;
  };

  getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  allDataPresent = () => {
    if (this.state.monthly && this.state.yearly && this.state.data && this.state.data2) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <section className={styles.container}>
          <Loader active={this.state.activeLoader} />
        <div className={styles.graph}>
          {this.allDataPresent() && (
            <Graph scheme={{ scheme: "category10" }} data={this.state.data} />
          )}
          {this.allDataPresent() && (
            <h4 style={{ opacity: 0.7, textAlign: "center" }}>
              Excluding Yearly/Monthly Bills
            </h4>
          )}
          {this.allDataPresent() && (
            <Graph scheme={{ scheme: "nivo" }} data={this.state.data2} />
          )}
        </div>
        <div className={styles.cardcontainer}>
          {this.allDataPresent() && (
            <Card
              header="Current Monthly Bills"
              description={`For the month of March 2020 your current monthly bills are £${this.state.monthly}`}
            />
          )}

          {this.allDataPresent() && (
            <Card
              header="Current Yearly Bills"
              description={`For the month of Year 2020 your current Yearly bills are £${this.state.yearly}`}
            />
          )}
        </div>
      </section>
    );
  }
}
