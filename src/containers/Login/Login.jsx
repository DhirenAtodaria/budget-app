import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import styles from './Login.module.scss';

class Login extends Component {
  state = {
    signUpClicked : false
  }

  handleChange = () => {
    this.setState({signUpClicked : !this.state.signUpClicked})
  }



  render() {
    return (
      <section className={styles.container}>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='#21295C' textAlign='center'>
            <h1 style={{color: "#21295C", fontSize: "48px", fontWeight: "bolder"}}>Oznom</h1> Log-in to your account
          </Header>
          {!this.state.signUpClicked ?
            (
            <>
              <Form error={this.props.error2} size='large'>
                <Segment stacked>
                  <Form.Input error={this.props.errorMessage3} fluid icon='user' iconPosition='left' placeholder='E-mail address' name="email" value={this.props.loginFormData.email} onChange={this.props.handleDetailsLogin}/>
                  <Form.Input
                    error={this.props.errorMessage4}
                    name="password"
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.props.loginFormData.password} onChange={this.props.handleDetailsLogin}
                  />
                  <Message
                    error={true}
                    header='Action Forbidden'
                    content={this.props.content2}
                  />
                  <Button onClick={this.props.signIn} secondary fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              New to us?  
              <Button onClick={this.handleChange}secondary size='tiny'>
                Sign Up
              </Button>
              </Message>
            </>
            )
            :
            (
              <>
              <Form error={this.props.error} size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' name="name" value={this.props.signUpFormData.name} onChange={this.props.handleDetails} />
                  <Form.Input error={this.props.errorMessage1} fluid icon='envelope' iconPosition='left' placeholder='E-mail address' name="email" value={this.props.signUpFormData.email} onChange={this.props.handleDetails}  />
                  <Form.Input
                    error={this.props.errorMessage2} 
                    name="password"
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.props.signUpFormData.password} onChange={this.props.handleDetails}
                  />
                  <Form.Input fluid icon='money bill alternate' type='number' iconPosition='left' placeholder='Monthly Total Budget' name="budget" value={this.props.signUpFormData.budget} onChange={this.props.handleDetails}/>
                  <Message
                    error={true}
                    header='Action Forbidden'
                    content={this.props.content}
                  />
                  <Button onClick={this.props.signUp} secondary fluid size='large'>
                    Sign Up
                  </Button>
                </Segment>
              </Form>
              <Message style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                Already have an account?     
                <Button onClick={this.handleChange}secondary size='tiny'>
                  Login
                </Button>
              </Message>
            </>
            )
          }
          
        </Grid.Column>
      </Grid>
      </section>
    )
  }
}

export default Login
