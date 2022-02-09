import React, {Component} from 'react';

class CalcForm extends Component {   
    constructor (props) {
        super(props);
        this.state = {
            quantity: "",
            price: ""
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
        this.props.calculate(this.state.quantity === "" ? 1 : this.state.quantity, this.state.price)
        this.setState({ quantity: "", price: ""})
    }
    render() {               
    return (
        <div className="CalcForm-container">
        <form onSubmit={this.handleSubmit}>
            <div className="CalcForm-input-container">
                <input 
                type="number"
                placeholder="quantity"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}/>
                
                <input 
                type="number"
                step="any"
                placeholder="price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}/>   
            </div>
                   
            <div className="CalcForm-button">
                <button>calculate</button>
            </div>
            
        </form>
        </div>
        
    )}
        
}

export default CalcForm;