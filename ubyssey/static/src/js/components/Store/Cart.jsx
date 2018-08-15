import React from 'react'
import { Link } from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    simpleCart.init()
  }
  componentDidUpdate() {
    simpleCart.update()
  }
  render () {
    return (
      <div className='c-cart-wrapper'>
        <Link 
          to={'/product/' + String(this.props.lastProduct)}
          className='c-button c-button--small'>
          Go Back </ Link>
        <div className="simpleCart_items" />
        <a href="javascript:;" className="simpleCart_empty">Empty Cart</a>
        <a className="simpleCart_checkout c-button-outline c-button-small" href="javascript:;" >Checkout</a>
        <Link 
          to='/'
          className='c-button c-button--small'>
          Continue Shopping </Link>
      </div>
    )
  }
}

export default Cart