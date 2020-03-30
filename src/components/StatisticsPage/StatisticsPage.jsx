import React, { Component } from "react";
import styles from "./StatisticsPage.module.scss";
import Graph from "./Graph";
import { firestore } from "../../firebase";
import { Card, Loader } from "semantic-ui-react";

export default class StatisticsPage extends Component {
  state = {
    monthly: null,
    yearly: null,
    data: null,
    activeLoader: false,
    dataPresent: false
  };

  dateReturner = date => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      console.log(this.props.user)
      this.componentDidMount()
    }
  }

  componentDidMount() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59);

    if (this.props.user) {
      firestore
        .collection("monthly")
        .where("uid", "==", this.props.user.uid)
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
            .where("uid", "==", this.props.user.uid)
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
            .where("date", ">=", firstDay)
            .where("date", "<=", lastDay)
            .where("uid", "==", this.props.user.uid)
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
                let amount = (this.state.monthly / 30) + (this.state.yearly / 365);
                dateArray.forEach(item => (amount += Number(item.amount)));
                object["x"] = currentDate;
                object["y"] = amount;
                month.splice(month.indexOf(currentMonthObject), 1, object);
                month2.splice(month2.indexOf(currentMonthObject2), 1, object);
                index += dateArray.length;
              }
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
        })
        .then(() => {
          this.setState({dataPresent: true})
        })
    }
  }

  dateObjectRetreiver = () => {
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let month = [];
    while (prevMonthDate.getMonth() === date.getMonth() - 1) {
      let dateObject = {};
      dateObject["x"] = this.dateReturner(new Date(prevMonthDate));
      dateObject["y"] = Math.round(
        (this.state.monthly / 30) + (this.state.yearly / 365)
      );
      month.push(dateObject);
      prevMonthDate.setDate(prevMonthDate.getDate() + 1);
    }
    console.log(month)
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
    if (this.state.data && this.state.data2) {
      return true
    } else {
      return false
    }
  }

  totalGetter = () => {
    let total = 0;
    if (this.state.data) {
      this.state.data[0].data.forEach(item => {
        total += Number(item.y)
      })
      return total;
    }
  }

  render() {
    console.log(this.state.data)
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
        {this.state.dataPresent && <div className={styles.cardcontainer}>
          {(this.state.monthly) ? (
            <Card
              
              header="Current Monthly Bills"
              description={`For the month of March 2020 your current monthly bills are £${this.state.monthly}`}
            />
          ) :
          (
            <Card
            
            header="Current Monthly Bills"
            description={`You do not currently have any monthly bills.`}
          />
          )
          }

          {(this.state.yearly) ? (
            <Card
              
              header="Current Yearly Bills"
              description={`For the month of Year 2020 your current Yearly bills are £${this.state.yearly}`}
            />
          )
          :
          (
            <Card
              
              header="Current Yearly Bills"
              description={`You do not currently have any yearly bills.`}
            />
          )
          }
            <Card  color='black' header='Total Monthly Spends - Feb' description={this.totalGetter()}/>
            <Card  color='black' header='Amount Over/Under Budget - Feb' description={3000 - this.totalGetter()} />

        </div>}
      </section>
    );
  }
}
