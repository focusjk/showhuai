import React from 'react';
import { Button, Card, Image, Icon, Search } from 'semantic-ui-react'

export default class ProductItem extends React.Component {
    render() {
        const { id, name, detail, price, isFavorite, isInCart } = this.props
        return (
            <Card key={id} style={{ padding: "10px" }}>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{price + " Baht"}</Card.Meta>
                <Card.Description style={{ marginBottom: "10px" }}>
                    {detail}
                </Card.Description>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Icon color={isInCart ? 'blue' : 'grey'} size='large' name='add to cart' style={{ marginRight: "5px" }} />
                    <Icon color={isFavorite ? 'red' : 'grey'} size='large' name='heart' />
                </div>
            </Card>)
    }
}