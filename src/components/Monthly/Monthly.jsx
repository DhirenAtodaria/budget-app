import React, { Component } from 'react';
import styles from './Monthly.module.scss';
import { Button, Form, Divider, Table, Grid, Header, Message, Icon, Transition } from 'semantic-ui-react'
import { firestore } from '../../firebase';

export default class Monthly extends Component {
    state = {
        spends : [],
        loading : false,
        error: false,
        formData : {
            name: "",
            amount: null,
            type : "monthly",
            uid: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user && this.props.user !== null) {
            this.setState({ formData: {...this.state.formData, uid: this.props.user.uid} }, this.dataRetriever())
        }
    }

    componentDidMount() {
        if (this.props.user){
            this.setState({ formData: {...this.state.formData, uid: this.props.user.uid} })
        }
        this.dataRetriever();
    }

    handleChangeAmount = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name] : event.target.value
            }
        })
    }

    dataRetriever = () => {
        if (this.props.user) {
            firestore
                .collection("monthly")
                .where("uid", "==", this.props.user.uid)
                .get()
                .then(query => {
                    const spends = query.docs.map(doc => {
                        return Object.assign(doc.data(), { spendID : doc.id})
                    }) 
                    this.setState( {spends : spends.reverse()} )        
                })
                .then(() => {
                    this.setState({loading: false})
                })
        }
            
    }

    dataRemover = (value) => {
        firestore
            .collection("monthly")
            .doc(value)
            .delete()
            .then(() => {this.dataRetriever()})
    }

    submitButton = () => {
        if (!this.state.formData.name || this.state.formData.amount < 0) {
            this.setState({error : true})
        } else {
            this.setState({loading: true})
            firestore
                .collection("monthly")
                .add(this.state.formData)
                .then(() => {
                    this.setState({error : false})
                    this.dataRetriever()
                })
        }
    }

    dataPresent = () => {
        if (this.state.spends.length === 0) {
            return false
        } else {
            return true
        }
    }

    render() {
        console.log(this.state.formData.uid)
        return (
            <section className={styles.container}>
                <Grid padded>
                    <Grid.Row>
                        <Header dividing size="huge" as="h1">
                        Recurring Monthly Spendings
                        <Header style={{opacity : 0.7, margin: "10px 0px", width: "100%"}}  as='h2'>This is where you enter your recurring  monthly bills.</Header>
                        </Header>
                        
                    </Grid.Row>
                </Grid>
                <Form loading={this.state.loading}>
                    <Form.Field>
                        <label>Name</label>
                        <input name="name" placeholder='Enter the name of the monthly cost' value={this.state.formData.name} onChange={this.handleChangeAmount}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <input name="amount" type='number' step="0.01" placeholder='£' value={this.state.formData.amount} onChange={this.handleChangeAmount} />
                    </Form.Field>
                    {/* <Form.Field label="Date" control={DatePicker} selected={this.state.formData.date} onChange={this.handleChange}/> */}
                    <Button type='submit' onClick={this.submitButton}>Submit</Button>
                </Form>
                <Message hidden={!this.state.error} color="red">
                    <Message.Header>Error</Message.Header>
                    <p>
                        Please fill in all the fields properly.
                    </p>
                </Message>
                <Divider section horizontal>Monthly Spends</Divider>
                {this.dataPresent() &&
                <Table color="green"  singleLine striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Remove Item</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Transition.Group as={Table.Body} animation="fade up" duration={2000}>
                            {this.state.spends.map((spend, index) => (
                              <Table.Row key={index}>
                                    <Table.Cell>Monthly</Table.Cell>
                                    <Table.Cell>{spend.name}</Table.Cell>
                                    <Table.Cell>£{spend.amount}</Table.Cell>
                                    <Table.Cell textAlign="center"><Icon onClick={() => this.dataRemover(spend.spendID)} link name="remove" size="large" color="red" /></Table.Cell>
                              </Table.Row>
                            ))}
                    </Transition.Group>
                </Table>
            }
            </section>
        )
    }
}