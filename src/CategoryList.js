import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid' 
import {sortAlpha, getCatgyId, defaultCtgyNames} from "./helperFunctions"
import Option from "./Option"
import AddCatgyForm from "./AddCatgyForm"
import EditCatgyForm from "./EditCatgyForm"
import AlertMessage from "./AlertMessage"  

class CategoryList extends Component {           
    constructor(props) {
        super(props);
        //array that stores food categories
        this.state = { 
            categories: this.getCategories(),   
            categoryName: "",            
            createMode: false,
            editMode: false,
            changeAlertMode: false,
            noChangeAlertMode: false                                                              
        }
        //binds for each method    
        this.getCategories = this.getCategories.bind(this)           
        this.toggleCreate = this.toggleCreate.bind(this)              
        this.addCatgyName = this.addCatgyName.bind(this) 
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)           
        this.updateCtgyName = this.updateCtgyName.bind(this)         
        this.dismissChangeAlert = this.dismissChangeAlert.bind(this)  
        this.dismissNoChangeAlert = this.dismissNoChangeAlert.bind(this)       
        this.handleRemove = this.handleRemove.bind(this)
        this.removeCatgyName = this.removeCatgyName.bind(this)
    } 
    getCategories() {        
        const listOfCategories = window.localStorage.getItem("categories")
        if (listOfCategories === null) {
           return [
                {categoryName: "Beverages", id: uuidv4()}, 
                {categoryName: "Canned Foods / Soups", id: uuidv4()},
                {categoryName: "Baked Goods", id: uuidv4()},
                {categoryName: "Condiments", id: uuidv4()},
                {categoryName: "Spices / Baking", id: uuidv4()},
                {categoryName: "Cookies / Candy", id: uuidv4()},
                {categoryName: "Snacks / Chips / Crackers", id: uuidv4()},
                {categoryName: "Dairy / Eggs / Cheese", id: uuidv4()},
                {categoryName: "Frozen Foods", id: uuidv4()},
                {categoryName: "Fruits", id: uuidv4()},
                {categoryName: "Vegetables", id: uuidv4()},
                {categoryName: "Grains / Pasta", id: uuidv4()},
                {categoryName: "Meat", id: uuidv4()},
                {categoryName: "Seafood", id: uuidv4()},
                {categoryName: "Sauces / Oils", id: uuidv4()}
             ]
        } else {
            const savedCategories = JSON.parse(listOfCategories)
            return sortAlpha(savedCategories)
        }
    }       
    //when toggled true, "AddCatgyForm" component displays
    toggleCreate() {
        this.setState({createMode: !this.state.createMode})
    }     
    //method changes state of "categories" array to add new category from "AddCatgyForm"
    addCatgyName(newCtgy) {  
        //if user doesnt type anything, "noChangeAlertMode" is true - triggers message      
        if (newCtgy.categoryName.length <= 0) {
            this.setState({noChangeAlertMode: !this.state.noChangeAlertMode})
        //else add what user typed to "categories" array
        } else {              
            this.setState({
                categories: [...this.state.categories, newCtgy],
                createMode: false,
                changeAlertMode: !this.state.changeAlertMode                                        
            },
            () => window.localStorage.setItem("categories", JSON.stringify(this.state.categories))
            )
        }       
    }    
    //when toggled true, "EditCatgyForm" component displays  
    toggleEdit() {
        this.setState({editMode: !this.state.editMode})
    }
    //method updates current value of state for any inputs that call it
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value                       
        })
    } 
    /* method compares id passed from "EditCatgyForm" to id in "categories" array -
    if match, update categoryName to current value passed and update state with
    new name. return editMode to false after update */      
    updateCtgyName (id, editedName){ 
        //checks if user made changes. if not "noChangeAlertMode" state changes to true 
        if (editedName === this.state.categoryName || editedName.length <= 0) {
            this.setState({noChangeAlertMode: !this.state.noChangeAlertMode})
        } else {
            const newName = this.state.categories.map(name => {
                if (id === name.id) {                    
                    return {...name, categoryName: editedName}
                }
                return name          
            })        
            this.setState({
                categoryName: "",
                categories: newName, 
                editMode: false, 
                //changes state of "changeAlertMode" to true if user did make change
                changeAlertMode: !this.state.changeAlertMode},
                () => window.localStorage.setItem("categories", JSON.stringify(newName))
                )            
        }             
    } 
    //method to change state of "changeAlertMode" back to false to close the alert box   
    dismissChangeAlert(mode) {
        this.setState({changeAlertMode: mode})
    } 
     //method to change state of "noChangeAlertMode" back to false to close the alert box   
    dismissNoChangeAlert(mode) {
        this.setState({noChangeAlertMode: mode})
    }
    //method passes current categoryName to helper function "getCatgyId" to isolate id
    //passes id to "removeCatgyName" method
    handleRemove() {
        const nameId = getCatgyId(this.state.categories, this.state.categoryName)
        this.removeCatgyName(nameId)
    }
    //uses id to filter "categories" array and return array without that category
    removeCatgyName(id) {
        this.setState({
            categories: this.state.categories.filter(name => name.id !== id),
            categoryName: ""
        },
        () => window.localStorage.setItem("categories", JSON.stringify(this.state.categories))            
        ) 
    }
        
    render() {                 
        //CREATE DROP DOWN BOX:
        //pass items from "categories" array to helper function "sortAlpha" to alphabatize items   
        const listCtgyOptions = sortAlpha(this.state.categories)
        //map over alphabatized array to create options in drop down
        const catgyOption = listCtgyOptions.map(c => {   
            return (
                <Option 
                key={c.id}  
                id={c.id}   
                value={c.categoryName}       
                label={c.categoryName}/> 
            )           
        }) 
        //contains drop down box - select element displays options from "catgyOption" variable
        const ctgyDropDownList = (            
                <select                                           
                name="categoryName"
                value={this.state.categoryName}
                //reflects changes to categoryName state
                onChange={this.handleChange}>
                    {/* default values not to be removed */}
                    <option defaultValue>-- Select Category --</option>   
                    <option defaultValue>- none -</option>      
                    {catgyOption}             
                </select>             
        )
            

        //HOW DROP DOWN AND OPTIONS MENU SHOULD DISPLAY:     
        //contains the full menu - the drop down and buttons to create, edit or remove a category        
        const displayOptionMenu = (
            <div className="CategoryList-options-container"> 
                <div className="CategoryList-create-ctgy-button">
                    {/* changes state of "createMode" */}  
                    <button onClick={this.toggleCreate}>Create Category</button>
                </div>                
                <div>
                    {ctgyDropDownList} 
                    {/* changes state of editMode / disable edit button if ctgy not selected */}          
                    <button onClick={this.toggleEdit} disabled={this.state.categoryName === ""}><i className="far fa-edit edit"/></button>                 
                    {/* calls "handleRemove" to remove option from "categories" array */}
                    <button onClick={this.handleRemove}><i className="fas fa-trash-alt trash"/></button> 
                </div>
                {/* if "changeAlertMode" true - triggers a message from "AlertMessage" component */}  
                {this.state.changeAlertMode && <AlertMessage 
                    message={"Your changes have been made"}
                    alertForChange={this.state.changeAlertMode}
                    closeMessage={this.dismissChangeAlert}/>} 
            </div>
        ) 
        //contains "AddCatgyForm" component so user can add new category to "categories" array    
        const displayAddCtgy = (
            <div>                          
                <AddCatgyForm addCatgy={this.addCatgyName}/>
                {/* if "noChangeAlertMode" true - triggers a message from "AlertMessage" component */}  
                {this.state.noChangeAlertMode && <AlertMessage 
                                                message={"No changes were made"}  
                                                alertForNoChange={this.state.noChangeAlertMode}                                      
                                                closeMessage={this.dismissNoChangeAlert}/>} 
            </div>        
        )
        //contains "EditCatgyForm" component so user can edit categoryName in "categories" array
        const displayEditCtgy = ( 
            <div className="CategoryList-edit-form">                  
                <EditCatgyForm
                    nameToEdit={this.state.categoryName} 
                    //use "getCatgyId" helper function to isolate id of each option element            
                    ctgyId={getCatgyId(this.state.categories, this.state.categoryName)}      
                    nameEdit={this.updateCtgyName}/>
                {/* if "noChangeAlertMode" true - triggers a message from "AlertMessage" component */}                        
                {this.state.noChangeAlertMode && <AlertMessage 
                                        message={"No changes were made"}  
                                        alertForNoChange={this.state.noChangeAlertMode}                                      
                                        closeMessage={this.dismissNoChangeAlert}/>}                                
            </div>          
        ) 
        

        //HOW ELEMENTS SHOULD BE RENDERED IN BROWSER
        let menuDisplay;
            //if user creates new category - only menu header and "AddCatgyForm" component should display
            if (this.state.createMode) {
            menuDisplay = displayAddCtgy
            //if user edits category -everything, but "AddCatgyForm" displays
            //use helper function "defaultCtgyNames" to prevent the defaultValues from being edited
            } else if (this.state.editMode && !defaultCtgyNames(this.state.categoryName)) {                        
                menuDisplay = displayEditCtgy    
            //if not in menu, just display the drop down box        
            } else if (!this.props.showMenu) {
                menuDisplay = ctgyDropDownList
            //if in menu mode, but not creating or editing category, display full menu
            } else {            
                menuDisplay = displayOptionMenu    
            }        

    return menuDisplay        
    }
}

export default CategoryList;



