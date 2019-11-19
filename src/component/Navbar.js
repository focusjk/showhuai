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
        this.props.removeError()
    }
    handleLogout = () => {
        this.setState({ activeItem: 'home', Username: "", Password: "", isAdmin: false })
        this.props.handleLogout()
    }

    render() {
        const { activeItem, Username, Password, isAdmin } = this.state
        const { user, error } = this.props

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
                            {!isAdmin &&
                                <Link to="/review">
                                    <Menu.Item
                                        name='review'
                                        active={activeItem === 'review'}
                                        onClick={this.handleItemClick}
                                    />
                                </Link>
                            }
                            {isAdmin &&
                                <Fragment>
                                    <Link to="/sending">
                                        <Menu.Item
                                            name='sending'
                                            active={activeItem === 'sending'}
                                            onClick={this.handleItemClick}
                                        />
                                    </Link>
                                    <Link to="/managing">
                                        <Menu.Item
                                            name='managing'
                                            active={activeItem === 'managing'}
                                            onClick={this.handleItemClick}
                                        />
                                    </Link>
                                    <Link to="/promotion">
                                        <Menu.Item
                                            name='promotion'
                                            active={activeItem === 'promotion'}
                                            onClick={this.handleItemClick}
                                        />
                                    </Link>
                                </Fragment>
                            }
                            <Menu.Menu position='right'>
                                <Link to="/profile">
                                    <Menu.Item
                                        name='profile'
                                        active={activeItem === 'profile'}
                                        onClick={this.handleItemClick}
                                    >
                                        Hi! {user.Firstname + "  " + user.Lastname}
                                    </Menu.Item>
                                </Link>
                                <Link to="/login" >
                                    <Menu.Item
                                        name='logout'
                                        active={activeItem === 'logout'}
                                        onClick={this.handleLogout}
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
                                            error={error}
                                            placeholder='Username'
                                            name='Username'
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            error={error}
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
