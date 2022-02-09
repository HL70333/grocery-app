import React, {Component} from 'react';

class SubtractForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deductAmount: ""                  
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(evt) {    
        this.setState({
          [evt.target.name]: evt.target.value
        })        
    } 
    handleSubmit(evt) {
        evt.preventDefault()
        this.props.subtract(this.state.deductAmount)
        this.setState({deductAmount: ""})
    }   
    
    render() {
        //MAKE FORM FOR INPUTS?
    return (
        <div className="SubtractForm-container">
            <form onSubmit={this.handleSubmit}>
                <input 
                type="number" 
                step="any"
                placeholder="amount"
                name="deductAmount" 
                value={this.state.deductAmount}
                onChange={this.handleChange}/>
                <div className="SubtractForm-button">
                    <button>subtract</button>
                </div>            
            </form>
        </div>
        
    )}        
}

export default SubtractForm;