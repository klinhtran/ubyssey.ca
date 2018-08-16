import React from 'react'
import DispatchAPI from '../../api/dispatch'

import { Switch, Route } from 'react-router-dom'
import { Catalogue, Product, Cart} from './'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null
    }
  }

  componentDidMount() {
    this.fetchProductData()
  }

  fetchProductData() {
    simpleCart.init()

    DispatchAPI.store.get(this.props.id)
    .then ((response)=> {
      this.setState({
        products: response.results
      })
    })
  }

  componentDidUpdate() {
    console.log('update')
    simpleCart.update()
  }

  render(){
    const products = this.state.products ? this.state.products : this.fetchProductData()
    return (
      <div className='c-store-wrapper'>
        { products &&
          <Switch>
            <Route exact path='/' render={(props) => ( <Catalogue {...props} products={products} /> )} />
            <Route path='/product/:value' render={(props) => ( <Product {...props} data={products[Number(props.match.params.value)]} /> )} />
            <Route path='/cart/:value' render={ (props) => ( <Cart lastProduct={props.match.params.value}/> )} />
          </Switch>
        }
      </div>
    )
  }
}

export default Store
