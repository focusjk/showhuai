import React from 'react';
import { Button, Card, Image, Icon, Search, Dropdown, Input } from 'semantic-ui-react'
import ProductItem from './ProductItem'
import axios from 'axios';
import { url } from '../constant'
class Home extends React.Component {

  state = {
    loading: false,
    results: [],
    searchWord: '',
    searchType: null,
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
  queryData = (keyword, type) => {
    this.setState({ loading: true })
    console.log(keyword, type)
    // TODO
    // const queryList = await axios.get(url + '/product', {params: {type: value, keyword: searchWord }})
    // this.setState({productList: queryList})
    this.setState({ loading: false })
  }

  handleSelectType = (e, { value, text }) => {
    const { searchWord } = this.state
    this.queryData(searchWord, value)
    this.setState({ searchType: value ? value : null })
  }
  handleSearch = (e, { value }) => {
    this.setState({ searchWord: value })
  }

  handleOnSearch = () => {
    const { searchWord, searchType } = this.state
    this.queryData(searchWord, searchType)
  }

  handleAddToCart = (Product_ID, Amount) => { }

  render() {
    const { loading, searchType, searchWord, productList, typeProductList } = this.state;
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ margin: "50px 0 50px 0 ", display: "flex", alignItems: "center" }}>
          <Input
            icon={<Icon key="searchIcon" name='search' color="teal" inverted circular link onClick={this.handleOnSearch} />}
            placeholder='Search...'
            style={{ marginRight: "10px " }}
            onChange={this.handleSearch}
            loading={loading}
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
            value={searchType}
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