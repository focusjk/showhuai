import React from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Card, Image, Icon, Search, Grid, Input, Form, Segment, Container, Message } from 'semantic-ui-react'
import ProductItem from './ProductItem'
import Modal from './Modal'
class Login extends React.Component {

    state = { form: {} }
    // handleChange = (field, value) => this.setState({ form: { ...this.state.form, [field]: value } })
    handleChange = (e, { name, value }) => this.setState({ form: { ...this.state.form, [name]: value } })
    handleRegister = () => {
        console.log(this.state.form)
        this.setState({ loading: true })
        // API
        const success = true
        if (success) {
            // return <Redirect to='/target' />
            //  message success
        } else {
            //  message error
        }
        this.setState({ loading: false })
    }
    render() {


        const { form, loading } = this.state

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItem: "center", margin: "5vh 40vh" }}>
                <Segment.Group>
                    <Form onSubmit={this.handleRegister} loading={loading} success>
                        <Segment attached='bottom' color='teal' tertiary >
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    control={Input}
                                    label='First name'
                                    placeholder='First name'
                                    name="Firstname"
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    name="Lastname"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    width={6}
                                    control={Input}
                                    label='Phone number'
                                    placeholder='Phone number'
                                    name="Phone_number"
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    required
                                    width={10}
                                    control={Input}
                                    label='Email'
                                    placeholder='Email'
                                    name="Email"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Address number'
                                    placeholder='Address number'
                                    name="Address_number"
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Street'
                                    placeholder='Street'
                                    name='Street'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Province'
                                    placeholder='Province'
                                    name='Province'
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Zip code'
                                    placeholder='Zip code'
                                    name='Zipcode'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Username'
                                    placeholder='Username'
                                    name='Username'
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Password'
                                    placeholder='Password'
                                    name='Password'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Container textAlign='center'>
                                <Form.Field
                                    content="Submit"
                                    control={Button}
                                    size='large'
                                    color='teal'
                                    onClick={this.handleRegister}
                                >
                                    Register
                                </Form.Field>
                            </Container>
                        </Segment>
                    </Form>
                </Segment.Group>
            </div>
        )


    }
}


export default Login;
