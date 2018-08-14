import React from 'react'
import DispatchAPI from '../../api/dispatch'


class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      products: [],
      catalogueView: true
    }
  }
  componentDidMount() {
    DispatchAPI.store.get(this.props.id)
    .then ((response)=> {
      this.setState({
        products: response.results
      })
    })
  }

  getAbsoluteURL(imageURL) {
    let URL = window.location.origin
    return URL.concat(imageURL)
  }

  renderProduct(data) {
    console.log(data)
    const productStyle = {
      backgroundImage: 'url(' + this.getAbsoluteURL(data.image_url) + ')',
    }
    return (
      <div className='c-product__catalogue-container'>
        <div 
          className='c-product__catalogue-content' 
          style={productStyle}>
          {data.description}
          {data.price}
          {data.quantity}
        </div>
      </div>
    )
  }

  renderProductView() {
    const product = this.state.products[this.state.selected]
    return (
      <div className='c-store-product-wrapper__full'>
        <div className='c-product-image' style={{backgroundImage: 'url(' + this.getAbsoluteURL(product.image_url)}} />
        <div className='c-product__description'>
          {data.description}
        </div>
        <div className='c-product__price'>
          {data.price}
        </div>
        <div className='c-product__quantity'>
          {data.quantity}
        </div>
      </div>
    )
  }

  renderCatalogueView() {
    return (
      this.state.products.map((data) => {
        return this.renderProduct(data)
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
