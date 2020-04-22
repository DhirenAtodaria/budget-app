import React, { Component } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { signIn, signUp } from "../../actions/authActions";
import styles from "./Login.module.scss";

class Login extends Component {
    state = {
        signUpClicked: false,
        credentials: {
            email: "",
            password: "",
            name: "",
            budget: 0,
        },
    };

    handleChange = () => {
        this.setState({ signUpClicked: !this.state.signUpClicked });
    };

    handleDetails = (event) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value,
            },
        });
    };

    handleDetailsLogin = (event) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value,
            },
        });
    };

    login = () => {
        this.props.signIn(this.state.credentials);
    };

    signUp = () => {
        this.props.signUp(this.state.credentials);
    };

    render() {
        return (
            <section className={styles.container}>
                <Grid
                    textAlign="center"
                    style={{ height: "100vh" }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="#21295C" textAlign="center">
                            <h1
                                style={{
                                    color: "#21295C",
                                    fontSize: "48px",
                                    fontWeight: "bolder",
                                }}
                            >
                                Oznom
                            </h1>{" "}
                            Log-in to your account
                        </Header>
                        {!this.state.signUpClicked ? (
                            <>
                                <Form
                                    error={this.props.errors.error2}
                                    size="large"
                                >
                                    <Segment stacked>
                                        <Form.Input
                                            error={
                                                this.props.errors.errorMessage3
                                            }
                                            fluid
                                            icon="user"
                                            iconPosition="left"
                                            placeholder="E-mail address"
                                            name="email"
                                            value={this.state.credentials.email}
                                            onChange={this.handleDetailsLogin}
                                        />
                                        <Form.Input
                                            error={
                                                this.props.errors.errorMessage4
                                            }
                                            name="password"
                                            fluid
                                            icon="lock"
                                            iconPosition="left"
                                            placeholder="Password"
                                            type="password"
                                            value={
                                                this.state.credentials.password
                                            }
                                            onChange={this.handleDetailsLogin}
                                        />
                                        <Message
                                            error={true}
                                            header="Action Forbidden"
                                            content={this.props.errors.content2}
                                        />
                                        <Button
                                            onClick={this.login}
                                            secondary
                                            fluid
                                            size="large"
                                        >
                                            Login
                                        </Button>
                                    </Segment>
                                </Form>
                                <Message
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    New to us?
                                    <Button
                                        onClick={this.handleChange}
                                        secondary
                                        size="tiny"
                                    >
                                        Sign Up
                                    </Button>
                                </Message>
                            </>
                        ) : (
                            <>
                                <Form
                                    error={this.props.errors.error}
                                    size="large"
                                >
                                    <Segment stacked>
                                        <Form.Input
                                            fluid
                                            icon="user"
                                            iconPosition="left"
                                            placeholder="Name"
                                            name="name"
                                            value={this.state.credentials.name}
                                            onChange={this.handleDetails}
                                        />
                                        <Form.Input
                                            error={
                                                this.props.errors.errorMessage1
                                            }
                                            fluid
                                            icon="envelope"
                                            iconPosition="left"
                                            placeholder="E-mail address"
                                            name="email"
                                            value={this.state.credentials.email}
                                            onChange={this.handleDetails}
                                        />
                                        <Form.Input
                                            error={
                                                this.props.errors.errorMessage2
                                            }
                                            name="password"
                                            fluid
                                            icon="lock"
                                            iconPosition="left"
                                            placeholder="Password"
                                            type="password"
                                            value={
                                                this.state.credentials.password
                                            }
                                            onChange={this.handleDetails}
                                        />
                                        <Form.Input
                                            fluid
                                            icon="money bill alternate"
                                            type="number"
                                            iconPosition="left"
                                            placeholder="Monthly Total Budget"
                                            name="budget"
                                            value={
                                                this.state.credentials.budget
                                            }
                                            onChange={this.handleDetails}
                                        />
                                        <Message
                                            content={this.props.errors.content}
                                        />
                                        <Button
                                            onClick={this.signUp}
                                            secondary
                                            fluid
                                            size="large"
                                        >
                                            Sign Up
                                        </Button>
                                    </Segment>
                                </Form>
                                <Message
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    Already have an account?
                                    <Button
                                        onClick={this.handleChange}
                                        secondary
                                        size="tiny"
                                    >
                                        Login
                                    </Button>
                                </Message>
                            </>
                        )}
                    </Grid.Column>
                </Grid>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.auth.user,
        errors: state.auth.errors,
    };
};

export default connect(mapStateToProps, { signIn, signUp })(Login);
