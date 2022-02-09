import React, {Component} from 'react';       

class EditBudgetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: null
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
        this.props.editBudget(this.state.budgetAmount)
        this.setState({
            budgetAmount: null
        })
    }

    render() {
        return (
            <div className="EditBudgetForm-container">
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="number" 
                    placeholder="amount"
                    step="any"                   
                    name="budgetAmount" 
                    value={this.state.budgetAmount}
                    onChange={this.handleChange}/>
                    <button>save</button>
                </form>
            </div>
        )
    }
}

export default EditBudgetForm;