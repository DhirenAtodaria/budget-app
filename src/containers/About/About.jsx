import React from 'react';
import { Grid, Header, Container, List } from 'semantic-ui-react'


function About() {
    return (
        <section>
            <Grid padded>
                <Grid.Row>
                    <Header dividing size="huge" as="h1">
                    About/Help
                    </Header>
                </Grid.Row>
            </Grid>
            <Container text>
                <p>
                <h3 style={{textDecoration: "underline"}}>Info</h3>
                Oznom is a money budgeting app. Upon account creation, the user specifies a monthly budget. The monthly budget is used to calculate the spending habits and in addition, provide detailed information/graphs of how your spending has trended to over the last month. The app has a few key features:
                <List style={{marginTop: "10px"}} bulleted>
                    <List.Item>
                        Spending Tracker
                        <List.List>
                            
                        <List.Item>Allows the user to add first their recurring monthly/yearly bills. This includes payments such as subscriptions or other utility bills. In-addition, you can enter any one off spending you may contract. </List.Item>


                        </List.List>
                    </List.Item>
                    <List.Item>
                        Detailed Dashboard
                        <List.List>
                            
                            <List.Item>Allows visualisation of the previous months spending trends. Including a breakdown on how much you've spent/saved from your monthly budget.</List.Item>


                        </List.List>
                    </List.Item> 
                </List>
                </p>
                <p><h3 style={{textDecoration: "underline"}}>Getting Started</h3>
                In order to use the app, the first step is to input your monthly/yearly bills using the 'monthly'/'yearly' navigation links. Upon doing so, the app will automatically create a graph showing your current trends. Once this is done, you can begin to add your spendings and it will populate the graph with your daily spendings.
                </p>

                <p>
                This app was built by Dhiren Atodaria, using React, Nivo.rocks(d3) and Firebase for the backend. It was built upon Semantic-UI framework.
                </p>
            </Container>
        </section>
        )
}

export default About;