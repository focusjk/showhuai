import React, { Fragment } from 'react';
import { Button, Card, Image, Icon, Search, Table, List, Grid, Divider } from 'semantic-ui-react'
import ProductItem from './ProductItem'
class Invoice extends React.Component {

    state = { isLoading: false, invoiceList: [], value: '' }
    componentDidMount() {
        this.setState({
            invoiceList: [
                {
                    ID: 1,
                    Total_price: 100.65,
                    Recorded_time: "122321434",
                    Type: "export",
                    Sending_round: {
                        ID: 1,
                        // Arrive_time: "12345",
                        Depart_time: "12345",
                        // Car_License_plate: "123456",
                        // Messenger_SSN: 23,
                    },
                    Promotion: {
                        ID: 1,
                        // Start_date: "12345",
                        // Expired_date: "1234",
                        Discount: 123.23,
                        Detail: "23456",
                        // Admin_id: 23
                    },
                    Transaction: [
                        {
                            Amount: 10,
                            Product: {
                                ID: 1,
                                Name: "23324",
                                Price: 132.123,
                                Amount: 100,
                                Detail: "24325435",
                            }
                        },
                        {
                            Amount: 10,
                            Product: {
                                ID: 2,
                                Name: "23324",
                                Price: 132.123,
                                Amount: 100,
                                Detail: "24325435",
                            }
                        },
                    ]
                },
                {
                    ID: 2,
                    Total_price: 100.65,
                    Recorded_time: "122321434",
                    Type: "import",
                    Supplier: {
                        ID: 1,
                        Name: "2453",
                        Email: "35445"
                    },
                    Transaction: [
                        {
                            Amount: 10,
                            Product: {
                                ID: 1,
                                Name: "23324",
                                Price: 132.123,
                                Amount: 100,
                                Detail: "24325435",
                            }
                        },
                        {
                            Amount: 10,
                            Product: {
                                ID: 2,
                                Name: "23324",
                                Price: 132.123,
                                Amount: 100,
                                Detail: "24325435",
                            }
                        },
                    ]
                },
            ]
        })
        //------------------------
    }

    render() {
        const tableHeaderList = ["ID", "Name", "Price", "Amount (baht)", "Total price"]
        const { isLoading, invoiceList, value } = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "column", margin: "5vh 40vh" }}>
                <Grid centered>
                    {
                        invoiceList.map(({ ID, Total_price, Recorded_time, Type, Sending_round, Promotion, Supplier, Transaction }, index) => (
                            <Fragment>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <List>
                                            <List.Item as='li'>Invoice ID: {ID}</List.Item>
                                            <List.Item as='li'>Total price: {Total_price}</List.Item>
                                            <List.Item as='li'>Purchase Date: {Recorded_time}</List.Item>
                                            {Sending_round &&
                                                <List.Item as='li'>
                                                    Sending round
                                                <List.List as='ul' style={{ margin: 0 }}>
                                                        <List.Item as='li'>ID : {Sending_round.ID} </List.Item>
                                                        <List.Item as='li'>Depart time : {Sending_round.Depart_time}</List.Item>
                                                    </List.List>
                                                </List.Item>
                                            }
                                            {Promotion &&
                                                <List.Item as='li'>
                                                    Promotion
                                                <List.List as='ul' style={{ margin: 0 }}>
                                                        <List.Item as='li'>ID : {Promotion.ID} </List.Item>
                                                        <List.Item as='li'>Discount : {Promotion.Discount}</List.Item>
                                                        <List.Item as='li'>Detail : {Promotion.Detail}</List.Item>
                                                    </List.List>
                                                </List.Item>
                                            }
                                            {Supplier &&
                                                <List.Item as='li'>
                                                    Supplier
                                                <List.List as='ul' style={{ margin: 0 }}>
                                                        <List.Item as='li'>Discount : {Supplier.Name}</List.Item>
                                                        <List.Item as='li'>Detail : {Supplier.Email}</List.Item>
                                                    </List.List>
                                                </List.Item>
                                            }
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <Table color="teal" key={ID} style={{ margin: 0, flexGrow: 2 }}>
                                            <Table.Header>
                                                <Table.Row>
                                                    {tableHeaderList.map(i => (<Table.HeaderCell>{i}</Table.HeaderCell>))}
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {Transaction.map(({ Amount, Product: { ID, Name, Price } }) => (
                                                    <Table.Row>
                                                        <Table.Cell>{ID}</Table.Cell>
                                                        <Table.Cell>{Name}</Table.Cell>
                                                        <Table.Cell>{Price}</Table.Cell>
                                                        <Table.Cell>{Amount}</Table.Cell>
                                                        <Table.Cell>{Price * Amount}</Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </Fragment>
                        ))}
                </Grid>
            </div>
        );

    }
}


export default Invoice;