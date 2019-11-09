import React, { Component, Fragment } from 'react'
import { Header, Menu, Segment, Container, Input, Form, Button, Checkbox } from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
export default class Navbar extends Component {
    state = { activeItem: 'home', Username: "", Password: "", isAdmin: false }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleChange = (e, { name, value }) => {
        if (name == "isAdmin") {
            this.setState({ isAdmin: !this.state.isAdmin })
        } else {
            this.setState({ [name]: value })
        }
    }

    render() {
        const { activeItem, Username, Password, isAdmin } = this.state
        const { user } = this.props

        return (
            <Segment inverted style={{ borderRadius: 0, margin: "0", color: "white" }}>
                <Menu inverted pointing secondary >
                    {!!user &&
                        <Fragment>
                            <Link to="/home">
                                <Menu.Item
                                    name='home'
                                    active={activeItem === 'home'}
                                    onClick={this.handleItemClick}
                                />
                            </Link>
                            <Link to="/cart">
                                <Menu.Item
                                    name='cart'
                                    active={activeItem === 'cart'}
                                    onClick={this.handleItemClick}
                                />
                            </Link>
                            <Link to="/invoice">
                                <Menu.Item
                                    name='invoice'
                                    active={activeItem === 'invoice'}
                                    onClick={this.handleItemClick}
                                />
                            </Link>
                            <Link to="/review">
                                <Menu.Item
                                    name='review'
                                    active={activeItem === 'review'}
                                    onClick={this.handleItemClick}
                                />
                            </Link>
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    Hi! {user.Firstname + "  " + user.Lastname}
                                </Menu.Item>
                                <Link to="/login" >
                                    <Menu.Item
                                        name='logout'
                                        active={activeItem === 'logout'}
                                        onClick={this.props.handleLogout}
                                    >
                                        Logout
                            </Menu.Item>
                                </Link>
                            </Menu.Menu>
                        </Fragment>
                    }
                    {!user &&
                        <Fragment>
                            <Menu.Menu position='right'>
                                <Form
                                    inverted
                                    size="tiny"
                                    onSubmit={() => this.props.handleLogin({ Username, Password, isAdmin })}
                                >
                                    <Form.Group>
                                        <Form.Input
                                            placeholder='Username'
                                            name='Username'
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            type="password"
                                            placeholder='Password'
                                            name='Password'
                                            onChange={this.handleChange}
                                        />
                                        <Form.Checkbox
                                            name="isAdmin"
                                            label="admin"
                                            style={{ marginTop: "8px" }}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Button color="teal" content='Submit'>
                                            Login
                                        </Form.Button>
                                    </Form.Group>
                                </Form>
                            </Menu.Menu>
                        </Fragment>}
                </Menu>
            </Segment>
        )
    }
}
