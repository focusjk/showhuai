import React, { Component } from 'react'
import { Header, Menu } from 'semantic-ui-react'

export default class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu pointing secondary vertical style={{ background: "pink", paddingTop: "2vh", margin: "0" }}>
                <Header as='h4' style={{ marginLeft: '16px' }}>Hi! Name</Header>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='favorite'
                    active={activeItem === 'favorite'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='invoice'
                    active={activeItem === 'invoice'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='review'
                    active={activeItem === 'review'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='log out'
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}
