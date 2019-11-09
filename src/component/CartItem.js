import React from 'react';
import { Button, Card, Image, Icon, Search, Label, Input } from 'semantic-ui-react'

class CartItem extends React.Component {
    onChange = (e, { value }) => this.props.onChange(this.props.ID, this.props.index, value)
    render() {
        const { ID, Name, Detail, Price, Amount, index } = this.props
        return (
            <Card key={ID} style={{ padding: "10px" }}>
                <Card.Header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                    {Name}
                    <Label tag  >{Price + " Baht"}</Label>
                </Card.Header>
                <Card.Content description={Detail} />
                <div style={{ display: "flex", justifyContent: "flex-end", textAlign: "right", alignItems: "center" }}>
                    Amount
                    <Input
                        value={Amount}
                        type="number"
                        onChange={this.onChange}
                        style={{ width: "70px", margin: "0 10px" }}
                    />
                    <Icon key="check" name="check" color="teal" inverted circular link onClick={() => this.props.onSave(this.props.ID, this.props.index)} />
                </div>
            </Card>
        )
    }
}

export default CartItem