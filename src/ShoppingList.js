import React, {Component} from 'react'; 
import { v4 as uuidv4 } from 'uuid' 
import Product from "./Product"
import Calculator from "./Calculator";
import CategoryList from "./CategoryList"
import AlertMessage from "./AlertMessage"


class ShoppingList extends Component {  
    //array each item is added to  
    constructor(props) {
        super(props);
        this.state = {                                                         
            items: JSON.parse(window.localStorage.getItem("items") || "[]"), 
            categoryName: "",            
            itemName: "",            
            searchCtgy: false,            
            optionsMode: false,            
            noChangeAlertMode: false                                                                                   
        }
        //binds for methods        
        this.addItem = this.addItem.bind(this)
        this.editItemName = this.editItemName.bind(this)  
        this.removeItem = this.removeItem.bind(this)
        this.handleRemoveAll = this.handleRemoveAll.bind(this) 
        this.toggleItemAcquired = this.toggleItemAcquired.bind(this)
        this.toggleCtgy = this.toggleCtgy.bind(this)          
        this.dismissNoChangeAlert = this.dismissNoChangeAlert.bind(this) 
        this.toggleCtgyOptions = this.toggleCtgyOptions.bind(this)         
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this)                                  
    }  
 
    //changes state of "items" array to include users input from form     
    addItem(item) {        
        this.setState({
            items: [...this.state.items, item]
        },
        () => window.localStorage.setItem("items", JSON.stringify(this.state.items, item))
        )             
    }
    //receives current id and edited item name from "Product" component and changes state to update name
    editItemName(id, prodName) {
        const newName = this.state.items.map(item => {
            if (id === item.id) {
                return {...item, itemName: prodName}
            }
            return item            
        })
        this.setState({items: newName},
        () => window.localStorage.setItem("items", JSON.stringify(newName))
        )
    }
    //recieves current id from "Product" component and filters out item from list
    removeItem(id) {
        this.setState({
            items: this.state.items.filter(item => item.id !== id)
        }, 
        () => window.localStorage.setItem("items", JSON.stringify(this.state.items))
        )        
    }  
    //clears array of items by resetting values to empty
    handleRemoveAll() {   
        //filters "items" array and removes only items in specified category     
        if (this.state.searchCtgy) {
            this.setState({
                items: this.state.items.filter(i => i.categoryName !== this.state.categoryName)
            },
            () => window.localStorage.setItem("items", JSON.stringify(this.state.items))
            )
        //else if no category is specified, all items removed
        } else if (!this.state.searchCtgy) {
            this.setState({
                items: [], 
                categoryName: "",         
                itemName: ""           
            },
            () => window.localStorage.setItem("items", JSON.stringify(this.state.items))
            )
        }        
    }  
    //receives id from "Product" component and toggles checkbox element to cross out item
    toggleItemAcquired(id) {
        const confirmed = this.state.items.map(item => {
            if (id === item.id) {
                return {...item, itemConfirmed: !item.itemConfirmed}
            }
            return item            
        })
        this.setState({items: confirmed},
        () => window.localStorage.setItem("items", JSON.stringify(confirmed))
        )        
    }     
    //changes state of searchCtgy - toggles between item list and searching by catgy
    toggleCtgy() {
        //if categoryName is empty or on "Select Category", then "noChangeAlertMode" is true        
        if (this.state.categoryName === "" || this.state.categoryName === "-- Select Category --") {
            this.setState({noChangeAlertMode: !this.state.noChangeAlertMode})
        //else "searchCtgy" is true
        } else {
            this.setState({
                searchCtgy: !this.state.searchCtgy                          
            })
        }                               
    }     
    //method to change state of "noChangeAlertMode" back to false to close the alert box   
    dismissNoChangeAlert(mode) {
        this.setState({noChangeAlertMode: mode})
    } 
    //when toggled true, ctgy options menu displays
    toggleCtgyOptions() {
        this.setState({optionsMode: !this.state.optionsMode})
    }  
    //method changes state to current user value from whichever element calls it
    handleChange(evt) {    
        this.setState({
          [evt.target.name]: evt.target.value
        })        
    }  
    //submits form and changes "items" array state to add new values entered by user  
    handleSubmit(evt) {
        evt.preventDefault()        
        let newItem = {...this.state, id: uuidv4(), itemConfirmed: false} 
        this.addItem(newItem)            
        this.setState({                             
            itemName: ""            
        })         
    } 
    
    render() {  
        //DISPLAY NEW ITEM
        //variable that can be assigned to whichever current state dictates      
        let newItem;
        //checks length of "items" array - if > 0, display items
        if (this.state.items.length > 0) {
            //creates search filter by filtering "items" array and displays if user input matches item in array
            const searchList = this.state.items.filter(i => {
                return i.itemName.toLowerCase().includes(this.state.itemName.toLowerCase())
            }) 
            //maps over "searchList" variable and displays items from array    
            newItem = searchList.map(p => {  
                let checkName;   
                //checks itemName isn't blank                
                if (p.itemName.length > 0) {
                    checkName = (                        
                        <Product 
                        id={p.id}
                        key={p.id}                                     
                        newProd={p.itemName}   
                        prodCategory={p.categoryName}
                        itemDone={p.itemConfirmed}                           
                        remove={this.removeItem}
                        edit={this.editItemName} 
                        completed={this.toggleItemAcquired} />                                             
                    )
                }    
                return checkName;        
            }) 
        } else {
            //if "items" array length < 0, display message
            newItem = <p>no items have been added</p>            
        } 

        //DISPLAY ITEMS BY CATEGORIES
        //variable that can be assigned to whichever current state dictates 
        let ctgyItemSearch;   
        //filters "items" array - returns if item's categoryName matches categoryName in "items" array       
        const getItems = this.state.items.filter(i => {
            return i.categoryName.toLowerCase().includes(this.state.categoryName.toLowerCase()) 
        })
        //checks if "getItems" array has items, length > 0
        if (getItems.length > 0) {
        ctgyItemSearch = (
            //maps over "getItems" and displays any items with same categoryName
            getItems.map(p => {
                let checkName;                      
                    if (p.itemName.length > 0) {
                        checkName = (
                            <Product 
                            id={p.id}
                            key={p.id}                                     
                            newProd={p.itemName}   
                            prodCategory={p.categoryName}
                            itemDone={p.itemConfirmed}                           
                            remove={this.removeItem}
                            edit={this.editItemName} 
                            completed={this.toggleItemAcquired} />
                        )                            
                    }    
                    return checkName;
            })
        )} else {
            //if no items in "getItems" array, length < 0, then display message
            ctgyItemSearch = <p>no items have been added</p>            
        } 
        const categoryDropDownComponent = (
            <div                                        
            name="categoryName" 
            onChange={this.handleChange}    
            onClick={this.newCategoryToggle}>
                <CategoryList showMenu={this.state.optionsMode}/>
            </div> 
        )
        
        //HOW LIST SHOULD BE RENDERED TO BROWSER
        //variable that can be assigned to whichever current state dictates
        let listDisplay;
        //if state of "optionsMode" true, render just button and "CategoryList" component to browser
        if (this.state.optionsMode) {
            listDisplay = (
                <div className="ShoppingList-ctgy-back-btn-container bars">  
                    <div className="left">
                        <div className="ShoppingList-ctgy-back-btn">
                            {/* changes state of "optionsMode" */}                                             
                            <button onClick={this.toggleCtgyOptions}><i className="far fa-times-circle"/></button>
                        </div>  
                        {/* "CategoryList" component */}                             
                        {categoryDropDownComponent}
                    </div>                               
                </div>
                )        
        } else {
            //if state of "optionsMode" false, render "CategoryList" and form
            listDisplay = (                
                <div className="ShoppingList-container">  
                    <div>                        
                         <Calculator />                    
                    </div>
                    <div className="ShoppingList-catgy-drop-down-container">
                            {/* display button to toggle ctgy options menu and "CategoryList" component */}
                            <button onClick={this.toggleCtgyOptions}><i className="fas fa-bars"/></button>
                            {categoryDropDownComponent}                                         
                    </div>
                    <div className="ShoppingList-item-form-container">
                        {/* display input field and button to add new items to shopping list */}                  
                        <form onSubmit={this.handleSubmit}>                                                                 
                            <input
                            type="text"
                            name="itemName"
                            value={this.state.itemName}
                            onChange={this.handleChange}                   
                            placeholder="search or add item"
                            autoComplete="off" 
                            />                                
                            <button disabled={this.state.itemName === ""}><i className="fas fa-plus-circle"/></button>                        
                        </form>  
                    </div>             
                    <div className={!this.state.searchCtgy ? "ShoppingList-item-search-btn" : "ShoppingList-ctgy-search-btn"}>
                        {/* toggles between text of button - either list by category or items */}
                        <button onClick={this.toggleCtgy}>{!this.state.searchCtgy ? "List by Category" : "List by Item"}</button>
                    </div>
                    {/* if "noChangeAlertMode" true, then render "AlertMessage" component for no category selected */}
                    <div>{this.state.noChangeAlertMode && <AlertMessage 
                                                            message={"Please select a category"}  
                                                            alertForNoChange={this.state.noChangeAlertMode}                                      
                                                            closeMessage={this.dismissNoChangeAlert}/>} </div>
                    <div className="ShoppingList-remove-all-items-btn">
                        <button onClick={this.handleRemoveAll}>Remove All Items</button>
                    </div>
                    <div className="ShoppingList-content">
                        {/* toggles between displaying list by items or category names */}                                       
                        {this.state.searchCtgy && <p className="ShoppingList-ctgy-name">{this.state.categoryName}</p>}                        
                        {this.state.searchCtgy ? ctgyItemSearch : newItem}    
                    </div>                                                                               
                </div>
            )}            
        return listDisplay 
    }
}
        
export default ShoppingList;