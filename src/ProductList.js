import React, {Component} from 'react';
import Product from "./Product"
import NewProductForm from "./NewProductForm"

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []            
        }
        this.addItem = this.addItem.bind(this)            
    }
    addItem(item) {       
        this.setState({
            items: [...this.state.items, item]
        })
        
    }
  
   

  render() {      
      const newItem = this.state.items.map(p => {             
        return (
            <Product 
                key={p.id}
                id={p.id}
                newProd={p.itemName}                  
            />
        ) 
    })      
          
  return (
    <div>
        <NewProductForm create={this.addItem} item={this.state.items} />                    
        {newItem}    
      
    </div>
  )}
}

export default ProductList;