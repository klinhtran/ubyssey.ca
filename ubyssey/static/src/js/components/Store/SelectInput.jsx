import React from 'react'

class SelectInput extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selected: this.props.data[0],
      isOpen: false
    }
  }

  update(selected) {
    this.setState({
      selected: selected
    })
  }

  render() {
    return (
      <div className='c-product-select'>
        <h3>{this.props.title}</h3>
        <div 
          className='c-product-select__current'
          onClick={() => {console.log('clicked'); this.setState(prevState => ({isOpen: !prevState.isOpen}))}}>
          {this.state.selected}
          { this.state.isOpen && 
            <div className='c-product-select__dropdown'>
              {this.props.data.map((option) => {
                // note: must use item_size to work with the shopping cart as per simplecartjs documentation
                const isSelected = this.state.selected === option ? 'item_size' : ''
                return (
                  <span 
                    className={'c-product-select__option ' + isSelected}
                    value={option}
                    onClick={() => {this.update(option)}} >
                    {option}
                  </span>
                )
              })}
            </div>
          }
        </div>


      </div>
    )
  }
}

export default SelectInput