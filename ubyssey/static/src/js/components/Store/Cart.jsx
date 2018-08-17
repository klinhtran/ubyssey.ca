import React from 'react'
import { Link } from 'react-router-dom'

class Cart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    simpleCart.init()
  }
  componentDidUpdate() {
    simpleCart.update()
  }

  render () {
    const cartVisible = this.props.cartVisible ? 'open' : 'closed'
    return (
      <div className={'c-cart-wrapper ' + cartVisible}>
        <div className='flex-row j-start'>
          <i className="fa fa-times c-cart-close" onClick={() => {this.props.hideCart()}}></i>
        </div>
        <div className='flex-row j-center'>
          <h1 className='c-cart-title'>Your Cart</h1>
        </div>
        <div className='flex-row'>
          <div className="simpleCart_items" ></div>
          
        </div>
        <div className='flex-column a-center j-end'>
          <div className='flex-row j-space-between full-width a-center c-cart-buttons'>
            <Link to='/' className='c-cart-button' onClick={() => {this.props.hideCart()}}>Continue Shopping </Link>
            <a href="javascript:;" className='simpleCart_empty c-cart-button' ><i className="fa fa-trash"></i> Empty Cart</a>
          </div>
          <a className="simpleCart_checkout c-button-dark c-button-small" href="javascript:;" >Checkout</a>
        </div>
      </div>
    )
  }
}

export default Cart