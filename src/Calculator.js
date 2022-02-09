import React, {Component} from 'react';
import CalcForm from "./CalcForm"
import SubtractForm from "./SubtractForm"
import EditBudgetForm from "./EditBudgetForm"

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetAmount: JSON.parse(window.localStorage.getItem("budgetAmount") || null),  
            editBudgetMode: false,          
            totalSpent: JSON.parse(window.localStorage.getItem("totalSpent") || null)
        }
        this.enterBudget = this.enterBudget.bind(this)
        this.calculateTotalSpent = this.calculateTotalSpent.bind(this)
        this.deductFromTotalSpent = this.deductFromTotalSpent.bind(this) 
        this.toggleEditBudget = this.toggleEditBudget.bind(this) 
        this.updateBudgetAmount = this.updateBudgetAmount.bind(this)
        this.removeBudgetAmount = this.removeBudgetAmount.bind(this)
        this.removeTotalSpent = this.removeTotalSpent.bind(this)     
    }
    enterBudget(amt) {   
        this.setState(
            {budgetAmount: amt},
            () => window.localStorage.setItem("budgetAmount", JSON.stringify(this.state.budgetAmount))
        )          
    }
    calculateTotalSpent(qty, amt) {
        const amount = qty * amt
        this.setState(st => ({totalSpent: st.totalSpent + amount}),
            () => window.localStorage.setItem("totalSpent", JSON.stringify(this.state.totalSpent))
        )        
    }
    deductFromTotalSpent(amt) {        
        this.setState(st => ({totalSpent: st.totalSpent - amt}))
    }
    toggleEditBudget() {
        this.setState({
            editBudgetMode: !this.state.editBudgetMode
        })
    }
    updateBudgetAmount(amt) {
        this.setState(
            {budgetAmount: amt, editBudgetMode: false},
            () => window.localStorage.setItem("budgetAmount", JSON.stringify(this.state.budgetAmount))
        )
    }
    removeBudgetAmount() {
        this.setState({
            budgetAmount: null
        }, 
        () =>  window.localStorage.removeItem("budgetAmount"))  
    }
    removeTotalSpent() {
        this.setState({
            totalSpent: null
        }, 
        () =>  window.localStorage.removeItem("totalSpent"))       
    }    
    
    render() {                     
        const budgetToDecimal = parseFloat(this.state.budgetAmount).toFixed(2)  
        const spentToDecimal = parseFloat(this.state.totalSpent).toFixed(2) 
        let displayBudget;
        if (this.state.editBudgetMode) {
            displayBudget = <EditBudgetForm editBudget={this.updateBudgetAmount}/>
        } else {
            displayBudget = (
                <div className="Calculator-edit-container">
                    <p>Total Shopping Budget: ${this.state.budgetAmount === null ? "0.00" : budgetToDecimal}</p>
                    <div className="Calculator-edit-buttons">
                        <button onClick={this.toggleEditBudget}><i className="far fa-edit edit"/></button> 
                        <button onClick={this.removeBudgetAmount}><i className="fas fa-trash-alt trash"/></button>                          
                    </div>
                </div> 
            )
        }
        let overBudgetMessage;
        const overBudgetAmount = parseFloat(this.state.budgetAmount - this.state.totalSpent).toFixed(2)
        if ((this.state.totalSpent > this.state.budgetAmount) && (this.state.budgetAmount > 0)) {
            overBudgetMessage = <p className="Calculator-over-budget-message">You are over budget by $  {overBudgetAmount}</p>
        }
                
        return (
            <div className="Calculator-container">
                {displayBudget}
                {overBudgetMessage}
                <div className="Calculator-input-container">  
                    <div className="Calculator-amount-spent-container">
                        <p>Amount Spent: ${this.state.totalSpent === null ? "0.00" : spentToDecimal}</p>
                        <button onClick={this.removeTotalSpent}><i className="fas fa-minus-circle"></i></button>
                    </div>                          
                    <div className="Calculator-operations-container">
                        <CalcForm calculate={this.calculateTotalSpent}/>
                        <SubtractForm subtract={this.deductFromTotalSpent}/>                        
                    </div>
                    
                </div> 
            </div>
        )
    }        
}

export default Calculator;



