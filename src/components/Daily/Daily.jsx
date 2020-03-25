import React, { Component } from 'react';
import styles from './Daily.module.scss';
import { Button, Form, Divider, Table, Grid, Header, Message, Icon, Dropdown, Input } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from '../../firebase';


export default class Daily extends Component {
    state = {
        spends : [],
        loading : false,
        error: false,
        formData : {
            name: "",
            amount: "",
            date: new Date(),
            type : "daily"
        },
        filterDate: new Date()
    }

    componentDidMount() {
        this.dataRetriever();
    }

    handleChange = date => {
        console.log(date)
        this.setState({
            formData: {
                ...this.state.formData,
                date: date
            }
        });
    };

    handleChangeFilter = date => {
        this.setState({
            filterDate: date
        })
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
        firestore
            .collection("spendings")
            .get()
            .then(query => {
                const spends = query.docs.map(doc => {
                    return Object.assign(doc.data(), { spendID : doc.id})
                }) 
                spends.sort((a,b) => b.date - a.date)
                this.setState( {spends : spends.reverse()} )        
            })
            .then(() => {
                this.setState({loading: false})
            })
            
    }

    submitButton = () => {
        if (!this.state.formData.name || this.state.formData.amount < 0) {
            this.setState({error : true})
        } else {
            this.setState({loading: true})
            firestore
                .collection("spendings")
                .add(this.state.formData)
                .then(() => {
                    this.setState({error : false})
                    this.dataRetriever()
                })
        }
    }

    dataRemover = (value) => {
        firestore
            .collection("spendings")
            .doc(value)
            .delete()
            .then(() => {this.dataRetriever()})
    }

    dateReturner = (date) => {
        let month = date.getMonth() + 1
        let day = date.getDate()
        let year = date.getFullYear()

        return `${day}/${month}/${year}`
    }

    render() {
        return (
            <section className={styles.container}>
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
                        <input name="name" placeholder='Enter the name of the spend' value={this.state.formData.name} onChange={this.handleChangeAmount}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Amount *</label>
                        <input name="amount" type='number' placeholder='£' value={this.state.formData.amount} onChange={this.handleChangeAmount} />
                    </Form.Field>
                    <Form.Field label="Date" control={DatePicker} selected={this.state.formData.date} onChange={this.handleChange}/>
                    <Button type='submit' onClick={this.submitButton}>Submit</Button>
                </Form>
                <Message hidden={!this.state.error} color="red">
                    <Message.Header>Error</Message.Header>
                    <p>
                        Please fill in all the fields properly.
                    </p>
                </Message>
                <Divider section horizontal>Daily Spends</Divider>
                <Table color="green" singleLine striped selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Dropdown
                                    text='Filter Date'
                                    icon='filter'
                                    floating
                                    labeled
                                    button
                                    className='icon'
                                >
                                    <Dropdown.Menu>
                                        <Form onClick={e => e.stopPropagation()}>
                                            <Form.Field control={DatePicker} selected={this.state.filterDate} onChange={this.handleChangeFilter}/>
                                        </Form>
                                    </Dropdown.Menu>
                                </Dropdown>
                                
                            </Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Remove Item</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {this.state.spends.map((spend, index) => (  
                              <Table.Row key={index}>
                                    <Table.Cell>{this.dateReturner(spend.date.toDate())}</Table.Cell>
                                    <Table.Cell>{spend.name}</Table.Cell>
                                    <Table.Cell>£{spend.amount}</Table.Cell>
                                    <Table.Cell textAlign="center"><Icon onClick={() => this.dataRemover(spend.spendID)} link name="remove" size="large" color="red" /></Table.Cell>
                              </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </section>
        )
    }
}