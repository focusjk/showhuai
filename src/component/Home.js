import React from 'react';
import { Button, Card, Image, Icon, Search, Dropdown, Input } from 'semantic-ui-react'
import ProductItem from './ProductItem'
import axios from 'axios';
import { url } from '../constant'
class Home extends React.Component {

  state = {
    isLoading: false,
    results: [],
    searchWord: '',
    searchType: {},
    productList: [],
    typeProductList: []
  }
  async componentDidMount() {
    const productResult = await axios.get(url + '/product')
    const productList = productResult.data
    //TODO : GET Type of product
    this.setState({
      typeProductList: [
        { ID: 1, Name: "focus", Detail: "sdlfnjsdhfkj" },
        { ID: 2, Name: "fogdcus", Detail: "sdlfnjsdhfkj" }]
    })
    //--------------------------
    this.setState({ productList: productList })
  }
  handleSelectType = (e, { value, text }) => {
    // TODO: query
    this.setState({ searchType: { ID: value ? value : null, Name: text } })
  }
  handleSearch = (e, { value }) => {
    this.setState({ searchWord: value })
  }

  handleOnSearch = () => {
    console.log(this.state.searchWord)
    this.setState({ isLoading: true })
    // TODO : query
    this.setState({ isLoading: false })
  }

  handleAddToCart = (Product_ID, Amount) => {
    //TODO
  }

  render() {
    const { isLoading, searchType, searchWord, productList, typeProductList } = this.state;
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ margin: "50px 0 50px 0 ", display: "flex", alignItems: "center" }}>
          <Input
            icon={<Icon key="searchIcon" name='search' color="teal" inverted circular link onClick={this.handleOnSearch} />}
            placeholder='Search...'
            style={{ marginRight: "10px " }}
            onChange={this.handleSearch}
            loading={isLoading}
            value={searchWord}
            key="searchInput"
          />
          <Dropdown
            key="Type"
            placeholder='Type'
            clearable
            selection
            options={typeProductList.map(item => ({ key: item.ID, value: item.ID, text: item.Name }))}
            onChange={this.handleSelectType}
            value={searchType.Name}
          />
        </div>
        <Card.Group style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
          {
            productList.map(item => (<ProductItem {...item} handleAddToCart={this.handleAddToCart} />))
          }
        </Card.Group>
      </div>
    );

  }
}


export default Home;