import React, { Component } from "react";
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
  Responsive
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from "../../firebase";

export default class Daily extends Component {
  state = {
    spends: [],
    filteredspends: [],
    loading: false,
    error: false,
    formData: {
      name: "",
      amount: "",
      date: new Date(),
      type: "daily",
      uid: null
    },
    filterDate: new Date(),
    active: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user && this.props.user !== null) {
      this.setState(
        { formData: { ...this.state.formData, uid: this.props.user.uid } },
        this.dataRetriever()
      );
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.setState({
        formData: { ...this.state.formData, uid: this.props.user.uid }
      });
    }
    this.dataRetriever();
  }

  handleChange = (date) => {
    this.setState({
      formData: {
        ...this.state.formData,
        date: date
      }
    });
  };

  handleChangeFilter = date => {
    this.setState(
      {
        filterDate: date
      },
      this.dateFilter(date)
    );
  };

  dateFilter = date => {
    let filteredspends = this.state.spends.filter(
      item => this.dateReturner(item.date.toDate()) === this.dateReturner(date)
    );
    this.setState({ filteredspends });
  };

  dataRestore = () => {
    this.setState({ filteredspends: this.state.spends });
  };

  handleChangeAmount = event => {
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });
  };

  dataRetriever = () => {
    if (this.props.user) {
      firestore
        .collection("spendings")
        .where("uid", "==", this.props.user.uid)
        .get()
        .then(query => {
          const spends = query.docs.map(doc => {
            return Object.assign(doc.data(), { spendID: doc.id });
          });
          spends.sort((a, b) => b.date - a.date);
          this.setState({
            spends: spends.reverse(),
            filteredspends: spends.reverse()
          });
        })
        .then(() => {
          this.setState({ loading: false, active: true });
        });
    }
  };

  submitButton = () => {
    if (!this.state.formData.name || this.state.formData.amount < 0) {
      this.setState({ error: true });
    } else {
      this.setState({ loading: true });
      firestore
        .collection("spendings")
        .add(this.state.formData)
        .then(() => {
          this.setState({ error: false });
          this.dataRetriever();
        });
    }
  };

  dataRemover = value => {
    firestore
      .collection("spendings")
      .doc(value)
      .delete()
      .then(() => {
        this.dataRetriever();
      });
  };

  dateReturner = date => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  dataPresent = () => {
    if (this.state.filteredspends.length === 0) {
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
        <Form loading={this.state.loading}>
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
        <Message hidden={!this.state.error} color="red">
          <Message.Header>Error</Message.Header>
          <p>Please fill in all the fields properly.</p>
        </Message>
        <Divider section horizontal>
          Daily Spends
        </Divider>
        {this.state.active && (
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
                          <Form onClick={e => e.stopPropagation()}>
                            <Form.Field
                              control={DatePicker}
                              selected={this.state.filterDate}
                              dateFormat="d/M/yyyy"
                              onChange={this.handleChangeFilter}
                            />
                          </Form>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={this.dataRestore}>
                          All
                        </Dropdown.Item>
                        <Dropdown.Item>Current Month</Dropdown.Item>
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
                duration={200}
              >
                {this.state.filteredspends.map((spend, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {this.dateReturner(spend.date.toDate())}
                    </Table.Cell>
                    <Table.Cell>{spend.name}</Table.Cell>
                    <Table.Cell>£{spend.amount}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Icon
                        onClick={() => this.dataRemover(spend.spendID)}
                        link
                        name="remove"
                        size="large"
                        color="red"
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
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
                  {this.state.filteredspends.map((spend, index) => (
                    <Table.Row key={index}>
                      {/* <Table.Cell>{this.dateReturner(spend.date.toDate())}</Table.Cell> */}
                      <Table.Cell>{spend.name}</Table.Cell>
                      <Table.Cell>£{spend.amount}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Icon
                          onClick={() => this.dataRemover(spend.spendID)}
                          link
                          name="remove"
                          size="large"
                          color="red"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Transition.Group>
              </Responsive>
            </Responsive>
          </>
        )}
      </section>
    );
  }
}
