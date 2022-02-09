import React, {Component} from 'react';


class EditCatgyForm extends Component {
    constructor(props) {
        super(props);
        //state set to original catgy so name displays for user to edit
        this.state ={
            categoryName: this.props.nameToEdit                        
        }
        //binds methods
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }  
    //changes state to current value of user input
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value            
        })
    } 
    //passes id and current "categoryName" value to "updateCtgyName" method in "ShoppingList" component
    handleSubmit(evt) {        
        evt.preventDefault()
        this.props.nameEdit(this.props.ctgyId, this.state.categoryName)         
    }
    //renders input field and button to browser     
    render() { 
    return (      
        <div className="EditCatgyForm-container">
            <form onSubmit={this.handleSubmit}>
                <input 
                type="text"
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

export default EditCatgyForm;

