import React, {Component} from 'react';

class Product extends Component {
  constructor(props) {
    super(props); 
    //default state for edit button and name of an individual product
    this.state = {editMode: false, itemName: this.props.newProd, itemConfirmed: this.props.itemDone}
    //binds for methods in Product Component
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editToggle = this.editToggle.bind(this) 
    this.handleRemove = this.handleRemove.bind(this) 
    this.handleCompleted = this.handleCompleted.bind(this)
        
  } 
  //calls editItemName method in ShoppingList component to update product name
  handleUpdate(evt) {
    evt.preventDefault()
    //passing in the current product id and name
    this.props.edit(this.props.id, this.state.itemName)
    //resetting state of editMode back to default
    this.setState({editMode: false})    
  }
  //changes state of itemName to the value of user input
  handleChange(evt) {    
    this.setState({
      [evt.target.name]: evt.target.value
    })      
  }
  //changes editMode state when edit button for product is clicked 
  editToggle() {
    this.setState({editMode: !this.state.editMode})
  }
  //calls remove method in ShoppingList Component and passes in current product id
  handleRemove() {
    this.props.remove(this.props.id)    
  }
  handleCompleted() {    
    this.props.completed(this.props.id)      
  }

  render() { 
    //variable that can be assigned to whichever current state dictates
    let displayProduct;
    //if variable is in edit mode, render form to edit product name 
    if (this.state.editMode) {
      displayProduct = (   
        <div className="Product-edit-form-container">
          <form onSubmit={this.handleUpdate}>
            <input 
                name="itemName" 
                //use "maxUserInput" helper function to set min/max length of user input
                value={this.state.itemName} 
                onChange={this.handleChange}
                type="text" 
                autoComplete="off"
                maxLength="13"/>
            <button>Save</button>
          </form> 
        </div>                      
      )
    } else {
    //if variable not in edit mode, render product name, checkbox and buttons
      displayProduct = (       
        <div className="Product-item-list-container ">        
          <div className="Product-items-checkbox">
            <label>
            <input          
            type="checkbox"
            name="itemConfirmed"
            value={this.props.itemDone}
            checked={this.props.itemDone}
            onChange={this.handleCompleted}/>
            <span></span>           
            </label>
          </div>

        <div className="Product-items">
          <li className={this.props.itemDone ? "cross-off" : "hide-line"}>{this.props.newProd}</li>       
        </div>

        <div className="Product-edit-remove-btns">
          <button onClick={this.editToggle} disabled={this.props.itemDone}><i className="far fa-edit edit"/></button>
          <button onClick={this.handleRemove}><i className="fas fa-trash-alt trash"/></button> 
        </div>
      </div>   
      )
    }     
    //return whichever mode is current 
    return displayProduct        
  }
}

export default Product;