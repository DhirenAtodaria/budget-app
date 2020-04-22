import React, { Component } from "react";
import { connect } from "react-redux";
import {
    dataRetreiver,
    dataRemover,
    dataSubmit,
    dataReset,
    errorHandling,
} from "../../actions/dataRetreiverActions";
import styles from "./Monthly.module.scss";
import {
    Button,
    Form,
    Divider,
    Table,
    Grid,
    Header,
    Message,
    Icon,
    Transition,
} from "semantic-ui-react";

class Monthly extends Component {
    state = {
        reset: false,
        formData: {
            name: "",
            amount: null,
            type: "monthly",
            uid: this.props.user.uid,
        },
    };

    async componentDidMount() {
        await this.props.dataReset();
        await this.props.dataRetreiver("monthly", this.props.user.uid);
        this.setState({ reset: true });
    }

    handleChangeAmount = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value,
            },
        });
    };

    dataRemover = (value) => {
        this.props.dataRemover("monthly", value, this.props.user.uid);
    };

    submitButton = () => {
        if (!this.state.formData.name || this.state.formData.amount < 0) {
            this.props.errorHandling(true);
        } else {
            this.props.dataSubmit(
                "monthly",
                this.state.formData,
                this.props.user.uid
            );
        }
    };

    dataPresent = () => {
        if (this.props.spendings.spends.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    render() {
        return (
            <section className={styles.container}>
                <Grid padded>
                    <Grid.Row>
                        <Header dividing size="huge" as="h1">
                            Recurring Monthly Spendings
                            <Header
                                style={{
                                    opacity: 0.7,
                                    margin: "10px 0px",
                                    width: "100%",
                                }}
                                as="h2"
                            >
                                This is where you enter your recurring monthly
                                bills.
                            </Header>
                        </Header>
                    </Grid.Row>
                </Grid>
                <Form loading={this.props.spendings.loading}>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            name="name"
                            placeholder="Enter the name of the monthly cost"
                            value={this.state.formData.name}
                            onChange={this.handleChangeAmount}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <input
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="£"
                            value={this.state.formData.amount}
                            onChange={this.handleChangeAmount}
                        />
                    </Form.Field>
                    <Button type="submit" onClick={this.submitButton}>
                        Submit
                    </Button>
                </Form>
                <Message hidden={!this.props.spendings.error} color="red">
                    <Message.Header>Error</Message.Header>
                    <p>Please fill in all the fields properly.</p>
                </Message>
                <Divider section horizontal>
                    Monthly Spends
                </Divider>
                {this.dataPresent() && this.state.reset && (
                    <Table
                        color="green"
                        singleLine
                        striped
                        selectable
                        unstackable
                    >
                        <Table.Header>
                            <Table.Row>
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
                            duration={200}
                        >
                            {this.props.spendings.filteredspends.map(
                                (spend, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{spend.name}</Table.Cell>
                                        <Table.Cell>£{spend.amount}</Table.Cell>
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
                    </Table>
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
    dataReset,
    errorHandling,
})(Monthly);
