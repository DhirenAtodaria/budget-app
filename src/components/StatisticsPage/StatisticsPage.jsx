import React, { Component } from "react";
import { connect } from "react-redux";
import { currentMonthsDataRetriever } from "../../actions/dashboardDataActions";
import styles from "./StatisticsPage.module.scss";
import Graph from "./Graph";
import { Card, Loader, Responsive, Statistic, Icon } from "semantic-ui-react";

class StatisticsPage extends Component {
    componentDidMount() {
        this.props.currentMonthsDataRetriever(
            this.props.user.uid,
            this.props.activeLoader
        );
    }

    totalGetter = () => {
        let total = 0;
        if (this.props.currentData) {
            this.props.currentData[0].data.forEach((item) => {
                total += Number(item.y);
            });
            return Math.round(total);
        }
    };

    render() {
        return (
            <>
                <Responsive
                    as={"section"}
                    className={styles.container}
                    minWidth={768}
                >
                    <Loader active={this.props.activeLoader} />

                    {!this.props.activeLoader && (
                        <>
                            <div className={styles.topHeader}>
                                <Card fluid>
                                    <Card.Content
                                        style={{ fontSize: "18px" }}
                                        header="Overview"
                                    />
                                    <Card.Content>
                                        <Statistic.Group widths="three">
                                            <Statistic size="tiny">
                                                <Statistic.Value>
                                                    <Icon
                                                        fitted
                                                        name="balance scale"
                                                    />{" "}
                                                    £{this.totalGetter()}
                                                </Statistic.Value>
                                                <Statistic.Label>
                                                    <br />
                                                    Total Monthly Spends
                                                </Statistic.Label>
                                            </Statistic>
                                            <Statistic size="tiny">
                                                <Statistic.Value>
                                                    <Icon
                                                        name="calculator"
                                                        fitted
                                                    />{" "}
                                                    £{3000 - this.totalGetter()}
                                                </Statistic.Value>
                                                <Statistic.Label>
                                                    <br /> Remaining Monthly
                                                    Budget
                                                </Statistic.Label>
                                            </Statistic>
                                            <Statistic size="tiny">
                                                <Statistic.Value>
                                                    <Icon name="book" fitted />{" "}
                                                    £
                                                    {this.props.monthlyTotal +
                                                        Math.round(
                                                            this.props
                                                                .yearlyTotal /
                                                                12
                                                        )}
                                                </Statistic.Value>
                                                <Statistic.Label>
                                                    <br />
                                                    Total Bills for the Month
                                                </Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                    </Card.Content>
                                    <Card.Content></Card.Content>
                                </Card>
                            </div>

                            <div className={styles.graphyee}>
                                <div className={styles.graphyee1}>
                                    <Card fluid>
                                        <Card.Content
                                            style={{ fontSize: "18px" }}
                                            header="Current Month's Spending Trends"
                                        />
                                        <Card.Content>
                                            <div className={styles.box}>
                                                <Graph
                                                    scheme={{
                                                        scheme: "category10",
                                                    }}
                                                    data={
                                                        this.props.currentData
                                                    }
                                                    tickValues="every 3 days"
                                                    curve="catmullRom"
                                                />
                                            </div>
                                        </Card.Content>
                                        <Card.Content></Card.Content>
                                    </Card>
                                </div>
                                <div className={styles.graphyee2}>
                                    <Card fluid>
                                        <Card.Content
                                            style={{ fontSize: "18px" }}
                                            header="Previous Month's Spending Trends"
                                        />
                                        <Card.Content>
                                            <div className={styles.box}>
                                                <Graph
                                                    scheme={{
                                                        scheme: "category10",
                                                    }}
                                                    data={
                                                        this.props.prevMonthData
                                                    }
                                                    tickValues="every 6 days"
                                                    curve="basis"
                                                />
                                            </div>
                                        </Card.Content>
                                        <Card.Content></Card.Content>
                                    </Card>
                                </div>
                            </div>
                        </>
                    )}
                </Responsive>
                <Responsive
                    as={"section"}
                    className={styles.container}
                    maxWidth={768}
                >
                    <Loader active={this.props.activeLoader} />
                    <div className={styles.graph2}>
                        {!this.props.activeLoader && (
                            <div className={styles.graphcontainer2}>
                                <h4
                                    style={{
                                        opacity: 0.7,
                                        textAlign: "center",
                                    }}
                                >
                                    Current Month's Spending Trend
                                </h4>
                                <Graph
                                    scheme={{ scheme: "category10" }}
                                    data={this.props.currentData}
                                    tickValues="every 6 days"
                                    curve="catmullRom"
                                />
                            </div>
                        )}
                        {!this.props.activeLoader && (
                            <div className={styles.graphcontainer2}>
                                <h4
                                    style={{
                                        opacity: 0.7,
                                        textAlign: "center",
                                    }}
                                >
                                    Previous Month's Spending Trends
                                </h4>
                                <Graph
                                    scheme={{ scheme: "category10" }}
                                    data={this.props.prevMonthData}
                                    tickValues="every 6 days"
                                    curve="basis"
                                />
                            </div>
                        )}
                        {!this.props.activeLoader && (
                            <div className={styles.graphcontainer2}>
                                <h4
                                    style={{
                                        opacity: 0.7,
                                        textAlign: "center",
                                    }}
                                >
                                    Previous Month's Spending Trends Excluding
                                    Yearly/Monthly Bills
                                </h4>
                                <Graph
                                    scheme={{ scheme: "nivo" }}
                                    data={this.props.prevMonthDataExclBills}
                                    tickValues="every 6 days"
                                    curve="basis"
                                />
                            </div>
                        )}
                    </div>
                </Responsive>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        monthlyTotal: state.dashboardData.monthlyTotal,
        yearlyTotal: state.dashboardData.yearlyTotal,
        activeLoader: state.dashboardData.activeLoader,
        currentData: state.dashboardData.currentData,
        prevMonthData: state.dashboardData.prevMonthData,
        prevMonthDataExclBills: state.dashboardData.prevMonthDataExclBills,
    };
};

export default connect(mapStateToProps, { currentMonthsDataRetriever })(
    StatisticsPage
);
