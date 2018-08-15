import React from 'react'
import DispatchAPI from '../../api/dispatch'

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      products: [],
      catalogueView: true,
      showCart: false
    }
  }
  componentDidMount() {
    DispatchAPI.store.get(this.props.id)
    .then ((response)=> {
      this.setState({
        products: response.results
      })
    })

    // simpleCart.bind( 'ready' , function(){
    //   console.log( "simpleCart total: " + simpleCart.toCurrency( simpleCart.total() ) ); 
    // });
    console.log(simpleCart)
  }

  getAbsoluteURL(imageURL) {
    let URL = window.location.origin
    return URL.concat(imageURL)
  }

  toggleView(index) {
    this.setState(prevState => ({
      catalogueView: !prevState.catalogueView,
      selected: index
    }))
  }

  addToCart(data) {
    simpleCart.add({ 
      name: data.name,
      price: data.price,
      size: data.size || null,
      quantity: data.quantity
    });
  }

  renderProduct(product, index) {
    const productStyle = {
      backgroundImage: 'url(' + this.getAbsoluteURL(product.image_url) + ')',
    }
    return (
      <div 
        key={index}
        onClick={() => this.toggleView(index)}
        className='c-product__catalogue-wrapper'>
        <div className='c-product__catalogue-container'>
          <div 
            className='c-product__catalogue-content' 
            style={productStyle}>
            <span>{product.title}</span>
            <span>{product.price}</span>
          </div>
        </div>
      </div>
    )
  }

  renderProductView(data) {
    const product = this.state.products[this.state.selected]
    return (
      <div className='c-store-product-wrapper__full'>
        <div 
          onClick={()=> this.toggleView(null)}
          className='c-button c-button--small'>
          Go Back
        </ div>
        <div className="simpleCart_shelfItem">
          <h2 className="item_name"> Awesome T-shirt </h2>
          <input type="text" value="1" className="item_Quantity" />
          <span className="item_price">$35.99</span>
          <a className="item_add" href="javascript:;"> Add to Cart </a>
        </div>
        {/* <div className='c-product-image' style={{backgroundImage: 'url(' + this.getAbsoluteURL(product.image_url)}} />
        <div className='c-product__description'>
          {product.description}
        </div>
        <div className='c-product__price'>
          {product.price}
        </div>
        <div className='c-product__quantity'>
          Stock: {product.quantity}
        </div>
        <div className='c-button c-button--small'
          onClick={()=>this.addToCart(product)}>Add to Cart</div> */}
        <div 
          onClick={()=>{this.setState({showCart: true})}}
          className='c-button c-button--small'>View Cart</div>
        {this.state.showCart && <div className="simpleCart_items"></div>}
      </div>
    )
  }

  renderCatalogueView() {
    return (
      this.state.products.map((data, index) => {
        return this.renderProduct(data, index)
      })
    )
  }

  render() {
    return (
      <div className='c-store-wrapper'>
        {this.state.catalogueView ? this.renderCatalogueView() : this.renderProductView()}
      </div>
    )
  }
}

export default Store
