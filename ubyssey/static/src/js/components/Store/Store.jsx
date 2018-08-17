import React from 'react'
import DispatchAPI from '../../api/dispatch'

import { Switch, Route, Link } from 'react-router-dom'
import { Catalogue, Product, Cart} from './'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
    }
  }

  componentDidMount() {
    this.fetchProductData()

    simpleCart.bind( "afterAdd" , function( item ){
      console.log( item.get("id") + " was added to the cart!" );
    });
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
            <Route exact path='/' render={(props) => (
              <div>
                <Catalogue {...props} products={products} /> 
              </div>
            )} />
            <Route path='/product/:value' render={(props) => ( 
              <div>
                <Product {...props} data={products[Number(props.match.params.value)]} /> 
              </div>
            )} />
            <Route path='/cart' render={ () => ( 
              <div>
                <Link to='/' className='c-button-outline c-button--small'>Continute Shopping </ Link>
                <Cart /> 
              </div>  
            )} />
          </Switch>
        }
      </div>
    )
  }
}

export default Store
