import React from 'react'
import DispatchAPI from '../../api/dispatch'

import { Switch, Route, Link } from 'react-router-dom'
import { Catalogue, Product, Cart} from './'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
      cartVisible: false,
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
    this.bindViewCart()

    DispatchAPI.store.get(this.props.id)
    .then ((response)=> {
      this.setState({
        products: response.results
      })
    })
  }

  bindViewCart() {
    document.getElementById("ubyssey-store-view-cart").addEventListener("click", () => {
    this.showCart()
    });
  }

  componentDidUpdate() {
    simpleCart.update()
  }

  showCart() {
    this.setState({
      cartVisible: true
    })
  }

  hideCart() {
    this.setState({
      cartVisible: false
    })
  }
  
  render(){
    const products = this.state.products ? this.state.products : this.fetchProductData()
    return (
      <div className='c-store-wrapper'>
        { products &&
          <Switch >
            <Route exact path='/' render={(props) => (
              <div className='full-height' >
                <Catalogue {...props} products={products} /> 
                <Cart cartVisible={this.state.cartVisible} hideCart={() => this.hideCart()} />
              </div>
            )} />
            <Route path='/product/:value' render={(props) => ( 
              <div className='full-height'>
                <Product 
                  {...props} 
                  data={products[Number(props.match.params.value)]}
                  showCart={() => this.showCart()} /> 
                <Cart 
                  cartVisible={this.state.cartVisible} 
                  hideCart={() => this.hideCart()} 
                   />
              </div>
            )} />
          </Switch>
        }
      </div>
    )
  }
}

export default Store
