import React, {Component} from 'react';       

class AlertMessage extends Component {
    //constructor to set the state of change and no change mode back to false
    constructor(props) {
        super(props);
        this.state = {
            changeAlertMode: false,
            noChangeAlertMode: false            
        }
        //binds for methods
        this.handleChangeAlert = this.handleChangeAlert.bind(this)
        this.handleNoChangeAlert = this.handleNoChangeAlert.bind(this)
    }  
    //method passes false to CategoryList component when close button is clicked - if user change
    handleChangeAlert() {    
        this.props.closeMessage(this.state.changeAlertMode)
    }
    //method passes false to CategoryList component when close button is clicked - if no user change
    handleNoChangeAlert() {
        this.props.closeMessage(this.state.noChangeAlertMode)
    }
    render() {  
        //variable that can be assigned to whichever current state dictates
        let displayAlert; 
        //if change was made is true, "displayAlert" will render changes saved message     
        if (this.props.alertForChange) {        
            displayAlert =(
                <div className="AlertMessage-container-change">                
                    <button onClick={this.handleChangeAlert}><i className="fas fa-times close"></i></button>                                 
                    <p className="AlertMessage-text">{this.props.message}</p>                                                                                 
                </div> 
            )
        //else if no change was made, "displayAlert" will render no changes made message
        } else if (this.props.alertForNoChange) {
            displayAlert = (
                <div className="AlertMessage-container-no-change">                
                    <button onClick={this.handleNoChangeAlert}><i className="fas fa-times close"></i></button>                                 
                    <p className="AlertMessage-text">{this.props.message}</p>                                                                                 
                </div> 
            )
        }   
        return displayAlert
    }
}

export default AlertMessage;