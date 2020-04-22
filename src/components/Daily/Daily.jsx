import React, { Component } from "react";
import { connect } from "react-redux";
import {
    dataRetreiver,
    dataRemover,
    dataSubmit,
    errorHandling,
    dataFilter,
    dataRestore,
    dataReset,
} from "../../actions/dataRetreiverActions";
import "./Daily.css";
import {
    Button,
    Form,
    Divider,
    Table,
    Grid,
    Header,
    Message,
    Icon,
    Dropdown,
    Transition,
    Responsive,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Daily extends Component {
    state = {
        formData: {
            name: "",
            amount: "",
            date: new Date(),
            type: "daily",
            uid: this.props.user.uid,
        },
        reset: false,
        filterDate: new Date(),
    };

    async componentDidMount() {
        await this.props.dataReset();
        await this.props.dataRetreiver("spendings", this.props.user.uid);
        this.setState({ reset: true });
    }

    handleChange = (date) => {
        this.setState({
            formData: {
                ...this.state.formData,
                date: date,
            },
        });
    };

    handleChangeFilter = (date) => {
        this.setState(
            {
                filterDate: date,
            },
            this.dateFilter(date)
        );
    };

    handleChangeAmount = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value,
            },
        });
    };

    dateFilter = (date) => {
        this.props.dataFilter(date);
    };

    dataRestore = () => {
        this.props.dataRestore();
    };

    submitButton = () => {
        if (!this.state.formData.name || this.state.formData.amount < 0) {
            this.props.errorHandling(true);
        } else {
            this.props.dataSubmit(
                "spendings",
                this.state.formData,
                this.props.user.uid
            );
        }
    };

    dataRemover = (value) => {
        this.props.dataRemover("spendings", value, this.props.user.uid);
    };

    dateReturner = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    dataPresent = () => {
        if (this.props.spendings.filteredspends.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    render() {
        return (
            <section>
                <Grid padded>
                    <Grid.Row>
                        <Header dividing size="huge" as="h1">
                            Daily Spendings
                        </Header>
                    </Grid.Row>
                </Grid>
                <Form loading={this.props.spendings.loading}>
                    <Form.Field>
                        <label>Name *</label>
                        <input
                            name="name"
                            placeholder="Enter the name of the spend"
                            value={this.state.formData.name}
                            onChange={this.handleChangeAmount}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount *</label>
                        <input
                            name="amount"
                            type="number"
                            placeholder="£"
                            value={this.state.formData.amount}
                            onChange={this.handleChangeAmount}
                        />
                    </Form.Field>
                    <Form.Field
                        label="Date"
                        control={DatePicker}
                        selected={this.state.formData.date}
                        dateFormat="d/M/yyyy"
                        onChange={this.handleChange}
                    />
                    <Button type="submit" onClick={this.submitButton}>
                        Submit
                    </Button>
                </Form>
                <Message hidden={!this.props.spendings.error} color="red">
                    <Message.Header>Error</Message.Header>
                    <p>Please fill in all the fields properly.</p>
                </Message>
                <Divider section horizontal>
                    Daily Spends
                </Divider>
                {this.dataPresent() && this.state.reset && (
                    <>
                        <Responsive
                            as={Table}
                            color="green"
                            singleLine
                            striped
                            selectable
                            unstackable
                            minWidth={560}
                        >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <Dropdown
                                            text="Filter Date"
                                            icon="filter"
                                            floating
                                            labeled
                                            button
                                            className="icon"
                                        >
                                            <Dropdown.Menu>
                                                <Dropdown.Header content="Date Filter" />
                                                <Dropdown.Item>
                                                    <Form
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Form.Field
                                                            control={DatePicker}
                                                            selected={
                                                                this.state
                                                                    .filterDate
                                                            }
                                                            dateFormat="d/M/yyyy"
                                                            onChange={
                                                                this
                                                                    .handleChangeFilter
                                                            }
                                                        />
                                                    </Form>
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item
                                                    onClick={this.dataRestore}
                                                >
                                                    All
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    Current Month
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">
                                        Remove Item
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Transition.Group
                                as={Table.Body}
                                animation="fade up"
                                duration={500}
                            >
                                {this.props.spendings.filteredspends.map(
                                    (spend, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                {this.dateReturner(
                                                    spend.date.toDate()
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {spend.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                £{spend.amount}
                                            </Table.Cell>
                                            <Table.Cell textAlign="center">
                                                <Icon
                                                    onClick={() =>
                                                        this.dataRemover(
                                                            spend.spendID
                                                        )
                                                    }
                                                    link
                                                    name="remove"
                                                    size="large"
                                                    color="red"
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )}
                            </Transition.Group>
                        </Responsive>
                        <Responsive maxWidth={560}>
                            <Form fluid>
                                <Form.Field
                                    label="Filter by a certain date, currently showing for all spends:"
                                    control={DatePicker}
                                    selected={this.state.filterDate}
                                    dateFormat="d/M/yyyy"
                                    onChange={this.handleChangeFilter}
                                />
                            </Form>
                            <Responsive
                                as={Table}
                                color="green"
                                singleLine
                                size="small"
                                striped
                                selectable
                                unstackable
                                maxWidth={560}
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Amount
                                        </Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">
                                            Remove Item
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Transition.Group
                                    as={Table.Body}
                                    animation="fade up"
                                    duration={200}
                                >
                                    {this.props.spendings.filteredspends.map(
                                        (spend, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    {spend.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    £{spend.amount}
                                                </Table.Cell>
                                                <Table.Cell textAlign="center">
                                                    <Icon
                                                        onClick={() =>
                                                            this.dataRemover(
                                                                spend.spendID
                                                            )
                                                        }
                                                        link
                                                        name="remove"
                                                        size="large"
                                                        color="red"
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    )}
                                </Transition.Group>
                            </Responsive>
                        </Responsive>
                    </>
                )}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        spendings: state.spendings,
    };
};

export default connect(mapStateToProps, {
    dataRetreiver,
    dataRemover,
    dataSubmit,
    errorHandling,
    dataFilter,
    dataRestore,
    dataReset,
})(Daily);
