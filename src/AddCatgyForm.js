import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid' 
import {toTitleCase} from "./helperFunctions"


class AddCatgyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            categoryName: ""
        }
        //binds for methods
        this.handleChange = this.handleChange.bind(this)        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //changes state of "categoryName" to current value from user input
    handleChange(evt) {
        this.setState({
            //use helper function "toTitleCase" so user input is changed to title case
            [evt.target.name]: toTitleCase(evt.target.value)
        })
    } 
    //passes state to "addCatgyName" method in "CategoryList" component to update "categories" array   
    handleSubmit(evt) {
        evt.preventDefault()       
        this.props.addCatgy({...this.state, id: uuidv4()})
        this.setState({
            categoryName: ""
        })
    }
render() {  
//renders input field and button in browser       
return (     
    <div className="AddCatgyForm-container">
        <form onSubmit={this.handleSubmit}>
            <input 
            type="text"
            placeholder="add category name"
            autoComplete="off"
            name="categoryName"
            value={this.state.categoryName}
            onChange={this.handleChange}
            maxLength="13"/>
            <button>save</button>           
        </form>   
    </div>                 
    )}
}

export default AddCatgyForm;