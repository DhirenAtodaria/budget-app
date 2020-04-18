import React, { Component } from "react";
import styles from "./StatisticsPage.module.scss";
import Graph from "./Graph";
import { firestore } from "../../firebase";
import { Card, Loader, Responsive, Statistic, Icon } from "semantic-ui-react";

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
      this.componentDidMount()
    }
  }

  componentDidMount() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59);
    const currentFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59);

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
                let object2 = {};
                let dateArray = daily.filter(item => item.date === currentDate);
                let amount = Math.round((this.state.monthly / 30) + (this.state.yearly / 365));
                let amount2 = 0
                dateArray.forEach(item => (amount += Number(item.amount)));
                dateArray.forEach(item => (amount2 += Number(item.amount)));
                object["x"] = currentDate;
                object["y"] = amount;
                object2["x"] = currentDate;
                object2["y"] = amount2
                month.splice(month.indexOf(currentMonthObject), 1, object);
                month2.splice(month2.indexOf(currentMonthObject2), 1, object2);
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
          firestore
            .collection("spendings")
            .where("date", ">=", currentFirstDay)
            .where("date", "<=", currentDay)
            .where("uid", "==", this.props.user.uid)
            .get()
            .then(query => {
              let currentMonth = this.dateObjectRetreiverCurrentMonth();
              const daily = query.docs.map(doc => doc.data());
              daily.sort((a, b) => b.date - a.date).reverse();
              daily.forEach(item => {
                item.date = this.dateReturner(item.date.toDate());
              });
              let index = 0;
              while (index < daily.length) {
                let currentDate = daily[index].date;
                let currentMonthObject = currentMonth.find(
                  item => item.x === currentDate
                );
                let object = {};
                let dateArray = daily.filter(item => item.date === currentDate);
                let amount = Math.round((this.state.monthly / 30) + (this.state.yearly / 365));
                dateArray.forEach(item => (amount += Number(item.amount)));
                object["x"] = currentDate;
                object["y"] = amount;
                currentMonth.splice(currentMonth.indexOf(currentMonthObject), 1, object);
                index += dateArray.length;
              }
              this.setState({
                currentData: [
                  {
                    id: "Daily",
                    color: "hsl(290, 70%, 50%)",
                    data: currentMonth
                  }
                ]})
                console.log(this.state.currentData)
            })
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

  dateObjectRetreiverCurrentMonth = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59);
    let currentMonth = [];
    while (firstDay.getDate() <= currentDate.getDate()) {
      let dateObject = {};
      dateObject["x"] = this.dateReturner(new Date(firstDay));
      dateObject["y"] = Math.round(
        (this.state.monthly / 30) + (this.state.yearly / 365)
      );
      currentMonth.push(dateObject);
      firstDay.setDate(firstDay.getDate() + 1);
    }
    return currentMonth;
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
    if (this.state.data && this.state.data2 && this.state.currentData) {
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
      return Math.round(total);
    }
  }

  render() {
    return (
      <>
      <Responsive as={"section"} className={styles.container} minWidth={768}>
          <Loader active={this.state.activeLoader} />
        
        {this.state.dataPresent && <div className={styles.topHeader}>
         <Card fluid>
          <Card.Content style={{fontSize: "18px"}} header='Overview' />
          <Card.Content>
          <Statistic.Group widths="three">
            <Statistic size="tiny">
              <Statistic.Value>
                <Icon fitted name="balance scale" /> £{this.totalGetter()}
              </Statistic.Value>
              <Statistic.Label><br />Total Monthly Spends</Statistic.Label>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Value>
                <Icon name="calculator" fitted /> £{3000-this.totalGetter()}
              </Statistic.Value>
              <Statistic.Label><br /> Remaining Monthly Budget</Statistic.Label>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Value>
                <Icon name="book" fitted /> £{this.state.monthly}
              </Statistic.Value>
              <Statistic.Label><br />Total Monthly Bills</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          </Card.Content>
          <Card.Content></Card.Content>
        </Card>
        </div>}

        <div className={styles.graphyee}>
          <div className={styles.graphyee1}>
            <Card fluid>
              <Card.Content style={{fontSize: "18px"}} header="Current Month's Spending Trends" />
              <Card.Content>
                {this.allDataPresent() && <div className={styles.box}>
                  <Graph scheme={{ scheme: "category10" }} data={this.state.currentData} tickValues="every 3 days" curve="catmullRom"/>
                </div>
                }
              </Card.Content>
              <Card.Content></Card.Content>
            </Card>
          </div>
          <div className={styles.graphyee2}>
          <Card fluid>
            <Card.Content style={{fontSize: "18px"}} header="Previous Month's Spending Trends" />
            <Card.Content>
              {this.allDataPresent() && <div className={styles.box}>
                <Graph scheme={{ scheme: "category10" }} data={this.state.data} tickValues="every 6 days" curve="basis" />
              </div>
              }
            </Card.Content>
            <Card.Content></Card.Content>
          </Card>
          </div>
        </div>
      </Responsive>
      <Responsive as={"section"} className={styles.container} maxWidth={768}>
          <Loader active={this.state.activeLoader} />
          <div className={styles.graph2}>
          {this.allDataPresent() && (
            <div className={styles.graphcontainer2}>
              <h4 style={{ opacity: 0.7, textAlign: "center" }}>
              Current Month's Spending Trend
              </h4>
              <Graph scheme={{ scheme: "category10" }} data={this.state.currentData} tickValues="every 6 days" curve="catmullRom"/>
            </div>
          )}
          {this.allDataPresent() && (
          <div className={styles.graphcontainer2}>
            <h4 style={{ opacity: 0.7, textAlign: "center" }}>
              Previous Month's Spending Trends
            </h4>
            <Graph scheme={{ scheme: "category10" }} data={this.state.data} tickValues="every 6 days" curve="basis"/>
          </div>
          )}
          {this.allDataPresent() && (
          <div className={styles.graphcontainer2}>
            <h4 style={{ opacity: 0.7, textAlign: "center" }}>
              Previous Month's Spending Trends Excluding Yearly/Monthly Bills
            </h4>
            <Graph scheme={{ scheme: "nivo" }} data={this.state.data2} tickValues="every 6 days" curve="basis"/>
          </div>
          )}
        </div>
      </Responsive>
      </>
    );
  }
}
