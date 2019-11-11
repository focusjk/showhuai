import React, { Fragment } from 'react';
import { Button, Card, Image, Icon, Search, Modal, Dropdown } from 'semantic-ui-react'
import CartItem from './CartItem'
class Cart extends React.Component {

    state = {
        list: [],
        Total_price: 0,
        open: false,
        promotionList: [],
        promotion: { Name: "", ID: null },
        supplierList: [],
        supplier: { Name: "", ID: null }
    }
    componentDidMount() {
        //TODO: GET product in cart
        //mock data
        this.setState({
            list: [
                {
                    ID: 1,
                    Name: 'Project Report - April',
                    Detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                    Price: 100,
                    Amount: 1
                },
                {
                    ID: 2,
                    Name: 'Project Report - April',
                    Detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                    Price: 100,
                    Amount: 2
                }
            ],
            promotionList: [{ ID: 1, Name: "DDDDD", Discount: 100, Detail: "AAAAAAAA" }, { ID: 2, Name: "DDDDD", Discount: 100, Detail: "AAAAAAAA" }],
            supplierList: [{ ID: 1, Name: "DDDDD", Email: "AAAAAAAA" }, { ID: 2, Name: "DDDDD", Email: "AAAAAAAA" }]
        })
        //----------------
    }
    handleChangeAmount = (Product_ID, index, value) => {
        const newList = this.state.list;
        newList[index].Amount = value
        this.setState({ list: newList })
    }

    handleSaveAmount = (Product_ID, index) => {
        // TODO : API
        console.log("hiii")
    }

    handleBuy = () => {
        //Open modal
        // delete from cart
        this.setState({ open: false })

    }
    handleSelect = (e, { value, text, name }) => {
        // TODO: query
        console.log('name', name)
        this.setState({ [name]: { ID: value ? value : null, Name: text } })
    }

    render() {
        const { list, Total_price, open, promotionList, promotion, supplierList, supplier } = this.state;
        const { user } = this.props
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "5vh" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", alignItems: "center" }}>
                    Total price: {Total_price} Baht
                    <Modal
                        open={open}
                        size="tiny"
                        trigger={
                            <Button
                                content='Buy'
                                color="teal"
                                style={{ marginLeft: "10px" }}
                                onClick={() => { this.setState({ open: true }) }}
                            />
                        }
                        header={
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px", flexWrap: "wrap" }}>
                                <h2 style={{ margin: "0 10px 0 0" }}>Promotion</h2>
                                <Dropdown
                                    key="Type"
                                    placeholder='Promotion'
                                    clearable
                                    selection
                                    name='promotion'
                                    options={promotionList.map(item => ({ key: item.ID, value: item.ID, text: item.Name + ' : ' + item.Detail + ' : ' + item.Discount }))}
                                    onChange={this.handleSelect}
                                    value={promotion.Name}
                                />
                                {user.isAdmin &&
                                    <Fragment style={{ margin: "20px 10px 0 0" }}>
                                        <h2 >Supplier</h2>
                                        <Dropdown
                                            key="Type"
                                            placeholder='Supplier'
                                            clearable
                                            selection
                                            name='supplier'
                                            options={supplierList.map(item => ({ key: item.ID, value: item.ID, text: item.Name }))}
                                            onChange={this.handleSelect}
                                            value={supplier.Name}
                                        />
                                    </Fragment>
                                }
                            </div>
                        }
                        actions={
                            < div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
                                <Button onClick={() => this.setState({ open: false })}>
                                    Cancel
                                </Button>
                                <Button color="teal" onClick={this.handleBuy}>
                                    Purchase
                                </Button>
                            </div>
                        }
                    />

                </div>
                <Card.Group style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
                    {
                        list.map((item, index) => (
                            <CartItem
                                {...item}
                                index={index}
                                onChange={this.handleChangeAmount}
                                onSave={this.handleSaveAmount}
                            />))
                    }
                </Card.Group>
            </div>
        );
    }
}


export default Cart;