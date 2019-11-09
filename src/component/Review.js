import React from 'react';
import { Button, Card, Image, Icon, Search, Table, Label, Rating, Message, TextArea, Form } from 'semantic-ui-react'
import ProductItem from './ProductItem'
class Review extends React.Component {

    state = { isLoading: false, list: [], value: '' }
    componentDidMount() {
        //TODO: GET list of product ที่เคย review หรือ review ได้
        // mock data
        this.setState({
            list: [
                {
                    id: 1,
                    name: 'Project Report - April',
                    detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                    price: '100',
                    review: {
                        rating: 3,
                        comment: "dsfjkhsd"
                    }
                },
                {
                    id: 2,
                    name: 'Project Report - April',
                    detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                    price: '100',
                    number: 3,
                    review: null
                },
                {
                    id: 3,
                    name: 'Project Report - April',
                    detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                    price: '100',
                    number: 3,
                    review: null
                },
                {
                    id: 4,
                    name: 'Project Report - April',
                    detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
                    price: '100',
                    number: 3,
                    review: null
                }
            ]
        })
        //---------------------------------------------------
    }

    handleOnSubmit = index => {
        //TODO 
    }
    handleRate = (e, { rating, maxRating, index }) => {
        //TODO
        console.log({ rating, maxRating, index })
    }
    handleComment = (e, { rating, maxRating }) => {
        //TODO  not sure
    }
    render() {
        const colors = [
            'red',
            'orange',
            'yellow',
            'black'
        ]
        const { isLoading, list, value } = this.state;
        return (
            <div className="App" style={{ display: "flex", flexDirection: "column", marginTop: "5vh" }}>
                <Card.Group style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {
                        list.map(({ id, name, price, detail, number, review }, index) => (
                            <Card key={id} style={{ padding: "10px" }}>
                                <Card.Header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                                    {name}
                                    <Label tag  >{price + " Baht"}</Label>
                                </Card.Header>
                                <Card.Content description={detail} />
                                <Card.Content extra>
                                    {!!review &&
                                        <div>
                                            <Rating disabled maxRating={5} defaultRating={review.rating} icon='star' size='large' />
                                            <Message>
                                                <p>
                                                    {review.comment}
                                                </p>
                                            </Message>

                                        </div>}
                                    {!review &&
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", marginBottom: '10px' }}>
                                                <Rating maxRating={5} defaultRating={0} icon='star' size='large' index={index} onRate={this.handleRate} />
                                                <Button color="teal" content="Submit" size="mini" index={index} onClick={() => this.handleOnSubmit(index)} />
                                            </div>
                                            <Form>
                                                <TextArea placeholder='Comment' index={index} onChange={this.handleComment} />
                                            </Form>
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