import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Card, Image, Icon, Search, Grid, Input, Form, Segment, Container, Message } from 'semantic-ui-react'
import ProductItem from './ProductItem'
import Modal from './Modal'
import axios from 'axios';
class Profile extends React.Component {

    state = { form: {}, loading: false, isAdmin: false, open: false, message: '' }
    async componentDidMount() {
        const ID = this.props.ID;
        // const User = await axios.get(url + '/userTODO')
        const User = {
            ID: 1,
            Username: 'focus',
            Phone_number: '0812345678',
            Email: 'jirapahat@gmail.com',
            Firstname: 'Jiraphat',
            Lastname: 'Khupanit',
            Zipcode: '234234',
            Address_number: '342424',
            Province: 'bangkok',
            Street: '123213'
        }
        // const User = {
        //     ID: 1,
        //     Username: 'focus',
        //     Phone_number: '0812345678',
        //     Email: 'jirapahat@gmail.com',
        //     Firstname: 'Jiraphat',
        //     Lastname: 'Khupanit',
        //     SSN: '1234567654321',
        //     Position: 'Manager'
        // }
        const isAdmin = !!User.SSN
        this.setState({ form: User, isAdmin })
    }
    // handleChange = (field, value) => this.setState({ form: { ...this.state.form, [field]: value } })
    handleChange = (e, { name, value }) => this.setState({ form: { ...this.state.form, [name]: value }, message: '' })
    handleSave = () => {
        const { form } = this.state
        console.log(this.state.form)
        this.setState({ loading: true })
        // TODO: API
        // const newUser = await axios.post(url + '/user', {form})
        const success = true
        if (success) {
            this.setState({ message: 'Successfully save your profile' })
            this.props.handleEditUser(this.state.form)
        } else {
            this.setState({ message: 'Fail to save your profile' })
        }
        this.setState({ loading: false, open: false })
    }
    render() {


        const { form, loading, isAdmin, open, message } = this.state

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItem: "center", margin: "5vh 40vh" }}>
                <Segment.Group>
                    <Form onSubmit={this.handleRegister} success loading={loading}>
                        <Segment attached='bottom' color='teal' tertiary >
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    control={Input}
                                    label='First name'
                                    placeholder='First name'
                                    name="Firstname"
                                    onChange={this.handleChange}
                                    value={form.Firstname}
                                />
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    name="Lastname"
                                    onChange={this.handleChange}
                                    value={form.Lastname}
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
                                    value={form.Phone_number}
                                />
                                <Form.Field
                                    required
                                    width={10}
                                    control={Input}
                                    label='Email'
                                    placeholder='Email'
                                    name="Email"
                                    onChange={this.handleChange}
                                    value={form.Email}
                                />
                            </Form.Group>
                            {!isAdmin &&
                                <Fragment>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            required
                                            control={Input}
                                            label='Address number'
                                            placeholder='Address number'
                                            name="Address_number"
                                            onChange={this.handleChange}
                                            value={form.Address_number}
                                        />
                                        <Form.Field
                                            required
                                            control={Input}
                                            label='Street'
                                            placeholder='Street'
                                            name='Street'
                                            onChange={this.handleChange}
                                            value={form.Street}
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
                                            value={form.Province}
                                        />
                                        <Form.Field
                                            required
                                            control={Input}
                                            label='Zip code'
                                            placeholder='Zip code'
                                            name='Zipcode'
                                            onChange={this.handleChange}
                                            value={form.Zipcode}
                                        />
                                    </Form.Group>
                                </Fragment>
                            }
                            {isAdmin &&
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        disabled
                                        control={Input}
                                        label='SSN'
                                        placeholder='SSN'
                                        name="SSN"
                                        onChange={this.handleChange}
                                        value={form.SSN}
                                    />
                                    <Form.Field
                                        disabled
                                        control={Input}
                                        label='Position'
                                        placeholder='Position'
                                        name='Position'
                                        onChange={this.handleChange}
                                        value={form.Position}
                                    />
                                </Form.Group>
                            }
                            <Form.Group widths='equal'>
                                <Form.Field
                                    required
                                    control={Input}
                                    label='Username'
                                    placeholder={form.Username}
                                    name='Username'
                                    onChange={this.handleChange}
                                // value={form.Username}s
                                />
                                <Form.Field
                                    required
                                    control={Input}
                                    type='password'
                                    label='Password'
                                    placeholder='Password'
                                    name='Password'
                                    onChange={this.handleChange}
                                    value={form.Password}
                                />
                            </Form.Group>
                            <Container textAlign='center'>
                                <Form.Field
                                    content="Submit"
                                    control={Button}
                                    size='large'
                                    color='teal'
                                    onClick={() => this.setState({ open: true })}
                                >
                                    Save
                                </Form.Field>
                                <Modal
                                    open={open}
                                    onCancel={() => this.setState({ open: false })}
                                    onConfirm={this.handleSave} />
                            </Container>
                            {message &&
                                <Container textAlign='right'>
                                    {message}
                                </Container>
                            }
                        </Segment>
                    </Form>
                </Segment.Group>
            </div>
        )


    }
}


export default Profile;