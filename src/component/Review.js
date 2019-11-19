import React from 'react';
import { Button, Card, Image, Icon, Search, Table, Label, Rating, Message, TextArea, Form } from 'semantic-ui-react'
import ProductItem from './ProductItem'
import axios from 'axios';
class Review extends React.Component {

    state = { list: [], value: '', open: true }
    componentDidMount() {
        //TODO: GET list of product ที่เคย review หรือ review ได้
        // const list = await axios.get(url + '/')
        // mock data
        const list = [
            {
                id: 1,
                name: 'Project Report - April',
                detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                price: '100',
                rating: 3,
                comment: "dsfjkhsd"
            },
            {
                id: 2,
                name: 'Project Report - April',
                detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                price: '100',
                number: 3,
                rating: null,
                comment: null
            },
            {
                id: 3,
                name: 'Project Report - April',
                detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                price: '100',
                number: 3,
                rating: null,
                comment: null
            },
            {
                id: 4,
                name: 'Project Report - April',
                detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                price: '100',
                number: 3,
                rating: null,
                comment: null
            }
        ]
        const editedList = list.map(i => ({ ...i, saved: !!i.rating, message: null }))
        this.setState({ list: editedList })
    }

    handleOnSubmit = index => {
        const list = this.state.list;
        const { saved, rating, ...detail } = list[index]
        const newRating = rating ? rating : 1
        // TODO
        // const success = await axios.post(url + '/', {...detail, rating: newRating})
        const success = true
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
        list[index] = { ...list[index], comment: value ? value : null, message: null }
        this.setState({ list })
        console.log(this.state.list)
    }
    render() {
        const { list, value } = this.state;
        return (
            <div className="App" style={{ display: "flex", flexDirection: "column", marginTop: "5vh" }}>
                <Card.Group style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {
                        list.map(({ id, name, price, detail, number, rating, comment, saved, message }, index) => (
                            <Card key={id} style={{ padding: "10px" }}>
                                <Card.Header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                                    {name}
                                    <Label tag  >{price + " Baht"}</Label>
                                </Card.Header>
                                <Card.Content description={detail} />
                                <Card.Content extra>
                                    {saved &&
                                        <div>
                                            <Rating disabled maxRating={5} defaultRating={rating} icon='star' size='large' />
                                            <Message>
                                                <p>
                                                    {comment}
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