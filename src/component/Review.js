import React from 'react';
import { Button, Card, Image, Icon, Search, Table, Label, Rating, Message, TextArea, Form } from 'semantic-ui-react'
import ProductItem from './ProductItem'
import axios from 'axios';
import { url } from '../constant'
class Review extends React.Component {

    state = { list: [], value: '', open: true }
    async componentDidMount() {
        const { ID } = this.props.user
        const result = await axios.get(url + '/review', { params: { userId: ID } })
        const { data } = result
        console.log(data)
        const list = data
        const editedList = list.map(i => ({ ...i, saved: !!i.Review_ID, message: null }))
        this.setState({ list: editedList })
    }

    handleOnSubmit = async index => {
        const list = this.state.list;
        const { Member_ID, Invoice_ID, Product_ID, rating, Detail } = list[index]
        const newRating = rating ? rating : 1
        const result = await axios.post(url + '/review', { Member_ID, Invoice_ID, Product_ID, Rating: newRating, Detail })
        const { success } = result.data
        console.log(result)
        const editedList = list
        if (success) {
            editedList[index] = { ...editedList[index], saved: true, rating: newRating }
        } else {
            editedList[index] = { ...editedList[index], message: 'fail to save' }
        }
        this.setState({ list: editedList })
    }
    handleRate = (e, { rating, maxRating, index }) => {
        const list = this.state.list;
        list[index] = { ...list[index], rating, message: null }
        this.setState({ list })
    }
    handleComment = (e, { index, value }) => {
        const list = this.state.list;
        list[index] = { ...list[index], Detail: value ? value : null, message: null }
        this.setState({ list })
        console.log(this.state.list)
    }
    render() {
        const { list, value } = this.state;
        return (
            <div className="App" style={{ display: "flex", flexDirection: "column", marginTop: "5vh" }}>
                <Card.Group style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {
                        list.map(({ Product_Name, Price, Product_Detail, rating, Detail, saved, message, Invoice_ID }, index) => (
                            <Card style={{ padding: "10px" }}>
                                <Card.Header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                                    {Product_Name}
                                    <Label tag  >{Price + " Baht"}</Label>
                                </Card.Header>
                                <Card.Content description={<div><div>Invoice id : {Invoice_ID}</div><div>{Product_Detail}</div></div>} />
                                <Card.Content extra>
                                    {saved &&
                                        <div>
                                            <Rating disabled maxRating={5} defaultRating={rating} icon='star' size='large' />
                                            <Message>
                                                <p>
                                                    {Detail}
                                                </p>
                                            </Message>
                                        </div>}
                                    {!saved &&
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", marginBottom: '10px' }}>
                                                <Rating maxRating={5} defaultRating={1} icon='star' size='large' index={index} onRate={this.handleRate} />
                                                <Button color="teal" content="Submit" size="mini" index={index} onClick={() => this.handleOnSubmit(index)} />
                                            </div>
                                            <Form>
                                                <TextArea placeholder='Comment' index={index} onChange={this.handleComment} />
                                            </Form>
                                            {message && <div color="black">{message}</div>}
                                        </div>
                                    }
                                </Card.Content>
                            </Card>
                        ))
                    }
                </Card.Group>
            </div>
        );

    }
}


export default Review;