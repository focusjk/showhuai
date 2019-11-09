import React from 'react';
import { Button, Card, Image, Icon, Search, Label, Modal, Input } from 'semantic-ui-react'

class ProductItem extends React.Component {
    state = { open: false, cart_amount: 0 }
    onClose = () => this.setState({ open: false })
    onOpen = () => this.setState({ open: true })
    onAdd = () => {
        this.props.handleAddToCart(this.props.ID, this.state.cart_amount)
        this.onClose()
    }
    onChange = (e, { value }) => this.setState({ cart_amount: value })
    render() {
        const { ID, Name, Detail, Price, Amount } = this.props
        const { open, cart_amount } = this.state
        return (
            <Card key={ID} style={{ padding: "10px" }} >
                <Card.Header style={{ padding: "10px" }}>{Name} </Card.Header>
                <Card.Content description={Detail} />
                <div style={{ display: "flex", justifyContent: "flex-end", alignContent: "center" }}>
                    <Label tag  >{Price + " Baht"}</Label>
                    <Modal
                        open={open}
                        size="mini"
                        trigger={<Icon
                            // disabled={Amount <= 0}
                            color={Amount > 0 ? 'teal' : 'grey'}
                            size='large'
                            name='add to cart'
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={this.onOpen}
                        />}
                        header="Amount "
                        content={
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Input
                                    value={cart_amount}
                                    type="number"
                                    onChange={this.onChange}
                                    style={{ width: "120px", margin: "20px 0" }}
                                />
                            </div>
                        }
                        actions={
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <Button onClick={this.onClose}>
                                    Cancel
                                </Button>
                                <Button color="teal" onClick={this.onAdd}>
                                    Add cart
                                </Button>
                            </div>
                        }
                    />
                </div>
            </Card>)
    }
}
export default ProductItem;