import React, { Component } from 'react';
import styles from './StatisticsPage.module.scss'
import Graph from './Graph';
import { firestore } from '../../firebase';
import { Card } from 'semantic-ui-react';


export default class StatisticsPage extends Component {
    state = {
        data : undefined
    }

    dateReturner = (date) => {
        let month = date.getMonth() + 1
        let day = date.getDate()
        let year = date.getFullYear()

        return `${day}/${month}/${year}`
    }


    componentDidMount() {
        firestore
            .collection("spendings")
            .get()
            .then(query => {
                let datavalues = [];
                const daily = query.docs.map(doc => doc.data());
                daily.sort((a,b) => b.date - a.date).reverse()
                daily.forEach(item => {
                    item.date = this.dateReturner(item.date.toDate())
                });
                let index = 0;
                while ( index < daily.length ) {
                    let currentDate = daily[index].date
                    let object = {}
                    let dateArray = daily.filter(item => item.date === currentDate)
                    let amount = 0;
                    dateArray.forEach(item => amount += Number(item.amount))
                    object['x'] = currentDate
                    object['y'] = amount
                    datavalues.push(object)
                    index += dateArray.length
                }

                this.setState({ 
                    data: [{
                        id : "Daily",
                        color: "hsl(290, 70%, 50%)",
                        data: datavalues
                    }]
                })
            })
           
    }

    render() {
        console.log(this.state)
        return(
            <section className={styles.container}>
                <div className={styles.graph}>
                    <h2>Daily Spendings Trends</h2>
                    {this.state.data && <Graph data={this.state.data} />}
                </div>
                <div>
                    <Card
                        header='Current Monthly Spend'
                        description='For the month of March 2020 your current monthly spends are £500'
                    />
                </div>
            </section>
        )
    }
}