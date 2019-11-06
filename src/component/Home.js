import React from 'react';
import { Button, Card, Image, Icon, Search, Dropdown } from 'semantic-ui-react'
import ProductItem from './ProductItem'
class Home extends React.Component {

  state = { isLoading: false, results: [], value: '' }
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      // if (this.state.value.length < 1) return this.setState(initialState)

      // const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      // const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: []
      })
    }, 300)
  }


  render() {
    const filteredProduct = [
      {
        id: 1,
        name: 'Project Report - April',
        detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        price: '100',
        isFavorite: true,
        isInCart: false
      },
      {
        id: 2,
        name: 'Project Report - April',
        detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        price: '100',
        isFavorite: true,
        isInCart: false
      },
      {
        id: 3,
        name: 'Project Report - April',
        detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        price: '100',
        isFavorite: false,
        isInCart: true
      },
      {
        id: 4,
        name: 'Project Report - April',
        detail: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        price: '100',
        isFavorite: false,
        isInCart: true
      }
    ]
    const { isLoading, results, value } = this.state;
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column", margin: "2%", width: "100%" }}>
        <div style={{ margin: "50px 0 50px 0 ", display: "flex", alignItems: "center" }}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            placeholder='Name'
            // onSearchChange={}
            results={results}
            value={value}
            style={{ marginRight: "10px ", display: "flex" }}
          />
          <Dropdown placeholder='Type' search selection options={filteredProduct.map(item => ({ value: item.name, text: item.id }))} />
          {/* <Button circular icon='cart' /> */}
          <Icon circular inverted color="blue" size='big' name='shopping cart' style={{ marginLeft: "10px", borderRadius: "100%" }} />
        </div>
        <Card.Group style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          {
            filteredProduct.map(item => (<ProductItem {...item} />))
          }
        </Card.Group>
      </div>
    );

  }
}


export default Home;